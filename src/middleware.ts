import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ملاحظة: لا نستخدم auth() هنا لأن middleware يعمل في Edge Runtime
  // وPrisma لا يعمل في Edge Runtime
  // الحماية تتم داخل كل API route باستخدام getAuthSession()

  // حماية صفحات Dashboard - فقط redirect بدون التحقق من session
  // التحقق الفعلي يتم في الصفحة نفسها
  const protectedPaths = [
    "/dashboard",
    "/add-expense",
    "/expenses",
    "/budgets",
    "/goals",
    "/occasions",
    "/settings",
    "/profile",
  ]

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    // نتحقق من وجود session token في cookies
    const authToken = request.cookies.get("authjs.session-token") || 
                     request.cookies.get("__Secure-authjs.session-token")
    
    if (!authToken) {
      const url = new URL("/signin", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
