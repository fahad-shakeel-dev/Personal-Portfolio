import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '@/lib/models/User';
import { dbConnect } from '@/lib/dbCon';

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request) {
  await dbConnect();
  const { email } = await request.json();

  try {
    // Check if user exists and is unverified
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'No account found with this email.' }, { status: 404 });
    }
    if (user.isVerified) {
      return NextResponse.json({ message: 'Account is already verified. Please log in.' }, { status: 400 });
    }

    // Generate new verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update user's verification token and expiration
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}/api/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <h2>Welcome, ${user.fullName}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't request this email, please ignore it.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: 'Verification email resent successfully. Please check your inbox.',
    }, { status: 200 });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}