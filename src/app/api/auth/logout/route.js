// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import RefreshToken from '@/lib/models/RefreshToken';

// export async function POST(request) {
//   try {
//     // Extract authToken from Cookie header
//     const cookies = request.headers.get('cookie');
//     const authToken = cookies
//       ?.split('; ')
//       .find(row => row.startsWith('authToken='))
//       ?.split('=')[1];

//     if (!authToken) {
//       return NextResponse.json({ message: 'No token provided' }, { status: 401 });
//     }

//     // Verify token to get userId
//     let userId;
//     try {
//       const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
//       userId = decoded.userId;
//     } catch (error) {
//       return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
//     }

//     // Delete refresh token from MongoDB
//     await RefreshToken.deleteOne({ userId });

//     // Clear authToken and refreshToken cookies
//     const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
//     response.cookies.set('authToken', '', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       expires: new Date(0),
//     });
//     response.cookies.set('refreshToken', '', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       expires: new Date(0),
//     });

//     return response;
//   } catch (error) {
//     console.error('Logout error:', error);
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//   }
// }

// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import RefreshToken from '@/lib/models/RefreshToken';

// function clearCookie(response, name) {
//   response.cookies.set(name, '', {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'strict',
//     path: '/',             // MUST match login
//     expires: new Date(0),  // forces removal
//   });
// }

// export async function POST(request) {
//   try {
//     // Extract authToken
//     const cookies = request.headers.get('cookie');
//     const authToken = cookies
//       ?.split('; ')
//       .find(row => row.startsWith('authToken='))
//       ?.split('=')[1];

//     if (!authToken) {
//       const res = NextResponse.json({ message: 'No token provided' }, { status: 401 });
//       clearCookie(res, 'authToken');
//       clearCookie(res, 'refreshToken');
//       return res;
//     }

//     // Verify token
//     let userId;
//     try {
//       const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
//       userId = decoded.userId;
//     } catch (error) {
//       const res = NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
//       clearCookie(res, 'authToken');
//       clearCookie(res, 'refreshToken');
//       return res;
//     }

//     // Delete refresh token from DB
//     await RefreshToken.deleteOne({ userId });

//     // Clear both cookies
//     const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
//     clearCookie(response, 'authToken');
//     clearCookie(response, 'refreshToken');

//     return response;
//   } catch (error) {
//     console.error('Logout error:', error);
//     const res = NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     clearCookie(res, 'authToken');
//     clearCookie(res, 'refreshToken');
//     return res;
//   }
// }


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
