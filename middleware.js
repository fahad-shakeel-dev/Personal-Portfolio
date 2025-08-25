import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbCon';
import User from '@/lib/models/User';
import RefreshToken from '@/lib/models/RefreshToken';

export async function authMiddleware(request) {
  await dbConnect();
  const authToken = request.cookies.get('authToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (!authToken) {
    return NextResponse.json({ message: 'No access token provided' }, { status: 401 });
  }

  try {
    // Verify access token
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    if (decoded.type !== 'access') {
      return NextResponse.json({ message: 'Invalid access token' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive || !user.isVerified) {
      return NextResponse.json({ message: 'Invalid token or user not found' }, { status: 401 });
    }

    // Attach user to request
    request.user = {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    };

    return NextResponse.next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' && refreshToken) {
      try {
        // Verify refresh token
        const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        if (decodedRefresh.type !== 'refresh') {
          return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
        }

        const storedToken = await RefreshToken.findOne({ userId: decodedRefresh.userId, expiresAt: { $gt: new Date() } });
        if (!storedToken) {
          return NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(refreshToken, storedToken.token);
        if (!isMatch) {
          return NextResponse.json({ message: 'Invalid refresh token' }, { status: 401 });
        }

        const user = await User.findById(decodedRefresh.userId);
        if (!user || !user.isActive || !user.isVerified) {
          return NextResponse.json({ message: 'User not found or account is inactive/unverified' }, { status: 403 });
        }

        // Generate new access token
        const newAccessToken = jwt.sign(
          { userId: user._id, email: user.email, fullName: user.fullName, type: 'access' },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );

        // Attach user to request
        request.user = {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        };

        const response = NextResponse.next();
        response.cookies.set('authToken', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60,
          path: '/',
        });

        return response;
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        return NextResponse.json({ message: 'Invalid or expired refresh token' }, { status: 401 });
      }
    }

    console.error('Token verification error:', error);
    return NextResponse.json({ message: 'Invalid or expired access token' }, { status: 401 });
  }
}