// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '@/lib/models/User';
// import { dbConnect } from '@/lib/dbCon';

// export async function POST(request) {
//   await dbConnect();
//   const { email, password } = await request.json();

//   // Validate request body
//   if (!email || !password) {
//     return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
//   }

//   try {
//     // Find user by email, including password field
//     const user = await User.findOne({ email }).select('+password');
//     if (!user) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//     }

//     // Check if user is verified
//     if (!user.isVerified) {
//       return NextResponse.json({ message: 'Please verify your email before logging in' }, { status: 403 });
//     }

//     // Check if user is active
//     if (!user.isActive) {
//       return NextResponse.json({ message: 'Account is deactivated' }, { status: 403 });
//     }

//     // Verify password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user._id, email: user.email, fullName: user.fullName },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Return token and user info (excluding password)
//     return NextResponse.json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         isVerified: user.isVerified,
//         createdAt: user.createdAt,
//       },
//     }, { status: 200 });
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json({ message: 'Server error' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbConnect } from '@/lib/dbCon';
import User from '@/lib/models/User';
import RefreshToken from '@/lib/models/RefreshToken';

export async function POST(request) {
  await dbConnect();
  const { email, password } = await request.json();

  // Validate request body
  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Find user by email, including password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email before logging in' }, { status: 403 });
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json({ message: 'Account is deactivated' }, { status: 403 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT access token (short-lived)
    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, fullName: user.fullName, type: 'access' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Generate JWT refresh token (long-lived)
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email, type: 'refresh' },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Hash refresh token for storage
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    // Store refresh token in database
    await RefreshToken.create({
      userId: user._id,
      token: hashedRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Set tokens in HTTP-only cookies
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    }, { status: 200 });

    response.cookies.set('authToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}