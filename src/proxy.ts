import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Security middleware — headers de sécurité sur toutes les routes.
 *
 * Headers appliqués :
 * - Content-Security-Policy : prévient XSS, injection de scripts
 * - X-Frame-Options : clickjacking (DENY)
 * - X-Content-Type-Options : MIME sniffing
 * - Referrer-Policy : contrôle du referrer
 * - X-DNS-Prefetch-Control : prévention DNS prefetch
 * - Strict-Transport-Security : force HTTPS
 * - Permissions-Policy : désactive APIs non utilisées
 */
export function proxy(_req: NextRequest) {
  const res = NextResponse.next();

  // Content-Security-Policy
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );

  // X-Frame-Options (anti clickjacking)
  res.headers.set("X-Frame-Options", "DENY");

  // X-Content-Type-Options (anti MIME sniffing)
  res.headers.set("X-Content-Type-Options", "nosniff");

  // Referrer-Policy
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // X-DNS-Prefetch-Control
  res.headers.set("X-DNS-Prefetch-Control", "off");

  // Strict-Transport-Security (force HTTPS)
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  // Permissions-Policy (désactive APIs non utilisées)
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
