// middleware.ts
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // ⭐ Jalankan next-intl routing dulu
  const response = handleI18nRouting(request);

  // ⭐ Tambahkan custom header untuk pathname setelah i18n routing selesai
  if (response.ok) {
    const url = new URL(request.url);

    // Set pathname ke response headers
    response.headers.set("x-pathname", url.pathname);
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
