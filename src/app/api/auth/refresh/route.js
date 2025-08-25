import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/dbCon';
import User from '@/lib/models/User';
import RefreshToken from '@/lib/models/RefreshToken';

export async function POST(request) {
  await dbConnect();
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'Refresh token is required' }, { status: 400 });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (decoded.type !== 'refresh') {
      return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    // Find stored refresh token
    const storedToken = await RefreshToken.findOne({ userId: decoded.userId, expiresAt: { $gt: new Date() } });
    if (!storedToken) {
      return NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 });
    }

    // Verify stored token
    const isMatch = await bcrypt.compare(refreshToken, storedToken.token);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive || !user.isVerified) {
      return NextResponse.json({ message: 'User not found or account is inactive/unverified' }, { status: 403 });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, fullName: user.fullName, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Set new access token in cookie
    const response = NextResponse.json({ message: 'Token refreshed' }, { status: 200 });
    response.cookies.set('authToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 });
  }
}