import { NextResponse } from 'next/server';
import RefreshToken from '@/lib/models/RefreshToken';
import jwt from 'jsonwebtoken';

function clearCookie(res, name) {
  res.cookies.set(name, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    expires: new Date(0), // instantly expire
  });
}

export async function POST(request) {
  try {
    const cookies = request.headers.get('cookie');
    const authToken = cookies
      ?.split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    let userId;
    if (authToken) {
      try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch {
        // ignore if token invalid
      }
    }

    if (userId) {
      await RefreshToken.deleteOne({ userId });
    }

    const res = NextResponse.json({ message: 'Logout successful' }, { status: 200 });

    // 🔥 clear every possible cookie
    const allCookies = [
      'authToken',
      'refreshToken',
      'next-auth.session-token',
      'next-auth.csrf-token',
      'next-auth.callback-url',
      '__Secure-next-auth.session-token',
      '__Host-next-auth.csrf-token',
      '__Secure-authToken',
    ];

    allCookies.forEach(name => clearCookie(res, name));

    return res;
  } catch (err) {
    console.error(err);
    const res = NextResponse.json({ message: 'Logout failed' }, { status: 500 });

    // still force clear
    ['authToken', 'refreshToken'].forEach(name => clearCookie(res, name));

    return res;
  }
}
