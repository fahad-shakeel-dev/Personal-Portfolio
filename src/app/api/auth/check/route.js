import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';

export async function GET(request) {
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

    try {
      // Verify token using jwt.verify
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Fetch user from MongoDB
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }



      // Return user details including role
      return NextResponse.json({
        message: 'Authentication successful',
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isVerified: user.isVerified,
          isActive: user.isActive,
          role: user.role,
        },
      }, { status: 200 });

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const refreshRes = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: { Cookie: cookies || '' },
        });

        if (refreshRes.ok) {
          // Extract new authToken from response headers
          const newCookies = refreshRes.headers.get('set-cookie');
          const newAuthToken = newCookies
            ?.split('; ')
            .find(row => row.startsWith('authToken='))
            ?.split('=')[1];

          if (!newAuthToken) {
            return NextResponse.json({ message: 'Failed to refresh token' }, { status: 401 });
          }

          // Verify new token
          const decoded = jwt.verify(newAuthToken, process.env.JWT_SECRET);
          const userId = decoded.userId;

          // Fetch user from MongoDB
          const user = await User.findById(userId).select('-password');
          if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
          }


          // Return user details including role with new token in response headers
          return NextResponse.json({
            message: 'Authentication successful',
            user: {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
              isVerified: user.isVerified,
              isActive: user.isActive,
              role: user.role,
            },
          }, {
            status: 200,
            headers: { 'Set-Cookie': newCookies },
          });

        } else {
          return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
      } else {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
      }
    }
  } catch (error) {
    console.error('[AuthCheck] Error:', error.message);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}