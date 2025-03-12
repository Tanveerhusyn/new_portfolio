import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const { pathname } = url

  // Redirect from /about/personal.ts to /about
  if (pathname.startsWith('/about/')) {
    url.pathname = '/about'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/about/:path*']
}
