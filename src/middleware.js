import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Processing request for: ${pathname} at ${new Date().toISOString()}`); // Debug

  // Apply middleware to /admin and /api/admin routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    console.log(`[Middleware] Allowing non-admin route: ${pathname}`);
    return NextResponse.next();
  }

  try {
    // Extract authToken from cookies
    const cookies = request.headers.get('cookie');
    console.log(`[Middleware] Cookies received: ${cookies || 'None'}`); // Debug
    const authToken = cookies
      ?.split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (!authToken) {
      console.log('[Middleware] No authToken found, redirecting to /login');
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

    console.log(`[Middleware] Auth response status: ${authResponse.status}`); // Debug

    if (!authResponse.ok) {
      console.log('[Middleware] Auth check failed, redirecting to /login');
      return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
    }

    const authData = await authResponse.json();
    console.log(`[Middleware] Auth data: ${JSON.stringify(authData)}`); // Debug

    if (authData.message !== 'Authentication successful' || authData.user.role !== 'admin') {
      console.log('[Middleware] User is not admin or auth failed, redirecting to /unauthorized');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Propagate new cookies (e.g., from token refresh)
    const response = NextResponse.next();
    if (authResponse.headers.get('set-cookie')) {
      console.log('[Middleware] Propagating new cookies from auth check');
      response.headers.set('Set-Cookie', authResponse.headers.get('set-cookie'));
    }

    console.log(`[Middleware] Admin access granted for: ${pathname}`);
    return response;
  } catch (error) {
    console.error('[Middleware] Error:', error.message);
    return NextResponse.redirect(new URL('/login?redirect=' + pathname, request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};