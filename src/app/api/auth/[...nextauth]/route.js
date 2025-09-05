import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { dbConnect } from '@/lib/dbCon';
import User from '@/lib/models/User';
import RefreshToken from '@/lib/models/RefreshToken';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      let dbUser = await User.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          fullName: user.name || profile.name,
          googleId: account.providerAccountId,
          userImg: user.image || profile.picture || null,
          isVerified: true,
          isActive: true,
          password: null,
        });
      } else if (account.provider === 'google' && !dbUser.googleId) {
        dbUser.googleId = account.providerAccountId;
        if (!dbUser.userImg) dbUser.userImg = user.image || profile.picture || null;
        await dbUser.save();
      }

      if (!dbUser.isActive) {
        throw new Error('Account is deactivated');
      }

      user.id = dbUser._id.toString();
      return true;
    },

    async jwt({ token, user }) {
      // Runs on login
      if (user) {
        // Generate access token
        const accessToken = jwt.sign(
          { userId: user.id, email: user.email, fullName: user.name, type: 'access' },
          process.env.JWT_SECRET,
          { expiresIn: '15m' }
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
          { userId: user.id, email: user.email, type: 'refresh' },
          process.env.JWT_REFRESH_SECRET,
          { expiresIn: '7d' }
        );

        // Save hashed refresh token in DB
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await RefreshToken.create({
          userId: user.id,
          token: hashedRefreshToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        // 👉 Set cookies manually (same as login route)
        const cookieStore = cookies();
        cookieStore.set('authToken', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60,
          path: '/',
        });
        cookieStore.set('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60,
          path: '/',
        });

        // Store in NextAuth token payload as well
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        token.userId = user.id;
        token.email = user.email;
        token.fullName = user.name;
        token.userImg = user.image || null;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId;
      session.user.email = token.email;
      session.user.fullName = token.fullName;
      session.user.userImg = token.userImg;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { authOptions };
export { handler as GET, handler as POST };
