
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
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
  const { fullName, email, password, confirmPassword } = await request.json();

  // Validate passwords match
  if (password !== confirmPassword) {
    return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create new user with explicit role
    user = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      role: 'user', // Explicitly set role to 'user'
    });

    // Save user and ensure role is included
    await user.save();

    // Verify role is saved by fetching the user
    const savedUser = await User.findOne({ email }).select('role');
    if (!savedUser || savedUser.role !== 'user') {
      console.error('Role not saved correctly for user:', email);
      return NextResponse.json({ message: 'Failed to save user role' }, { status: 500 });
    }

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL}/api/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <h2>Welcome, ${fullName}!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationUrl}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: 'Registration successful. Please check your email to verify your account.',
    }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
