import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  // Apply middleware to /admin and /api/admin routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  try {
    // Extract authToken from cookies
    const cookies = request.headers.get('cookie');
    const authToken = cookies
      ?.split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (!authToken) {
      return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
    }

    // Call /api/auth/check to verify token and get user details
    const authResponse = await fetch(`${request.nextUrl.origin}/api/auth/check`, {
      method: 'GET',
      headers: {
        Cookie: `authToken=${authToken}`,
      },
      credentials: 'include',
    });


    if (!authResponse.ok) {
      return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
    }

    const authData = await authResponse.json();

    if (authData.message !== 'Authentication successful' || authData.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Propagate new cookies (e.g., from token refresh)
    const response = NextResponse.next();
    if (authResponse.headers.get('set-cookie')) {
      response.headers.set('Set-Cookie', authResponse.headers.get('set-cookie'));
    }

    return response;
  } catch (error) {
    return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};