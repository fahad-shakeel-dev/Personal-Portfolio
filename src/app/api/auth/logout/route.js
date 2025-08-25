import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import RefreshToken from '@/lib/models/RefreshToken';

export async function POST(request) {
  try {
    // Extract authToken from Cookie header
    const cookies = request.headers.get('cookie');
    const authToken = cookies
      ?.split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (!authToken) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    // Verify token to get userId
    let userId;
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    }

    // Delete refresh token from MongoDB
    await RefreshToken.deleteOne({ userId });

    // Clear authToken and refreshToken cookies
    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.cookies.set('authToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    });
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}