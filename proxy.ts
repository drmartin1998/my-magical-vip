import { auth0 } from "./lib/auth0";
import { NextResponse, NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = new URL(request.url);
  
  // Let Auth0 middleware handle /auth/* routes
  if (url.pathname.startsWith('/auth/')) {
    return await auth0.middleware(request);
  }
  
  // Protect /admin routes
  if (url.pathname.startsWith('/admin')) {
    const session = await auth0.getSession(request);
    
    if (!session) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', url.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/(admin.*|auth/.*)']
};
