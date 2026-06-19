import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Allow login page and static assets
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/logo') ||
    pathname.startsWith('/batik')
  ) {
    return;
  }

  // Protect all other /admin/* routes
  if (pathname.startsWith('/admin') && !req.auth) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
