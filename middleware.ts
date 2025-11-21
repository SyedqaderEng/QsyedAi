import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = [
  '/editor',
  '/dashboard',
  '/security',
  '/account',
];

const authRoutes = ['/auth/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is authenticated via cookie
  // Note: For production, implement Firebase Admin SDK for server-side token verification
  const userCookie = request.cookies.get('user');
  const isAuthenticated = !!userCookie;

  // Validate token structure if present
  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie.value);
      // Basic validation - check for required fields
      if (!userData.uid || !userData.email) {
        // Invalid token structure - clear and redirect
        const response = NextResponse.redirect(new URL('/auth/login', request.url));
        response.cookies.delete('user');
        return response;
      }
    } catch (err) {
      // Invalid JSON - clear cookie and redirect
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('user');
      return response;
    }
  }

  // Redirect authenticated users away from auth pages
  if (authRoutes.some(route => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/editor/:path*',
    '/dashboard/:path*',
    '/security/:path*',
    '/account/:path*',
    '/auth/login',
    '/auth/signup',
  ],
};
