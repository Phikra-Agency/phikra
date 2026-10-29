import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// --- Rate limiting (in-memory, per IP) ---
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// Clean old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

// --- Schema with strict limits ---
const schema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().max(160).optional().nullable(),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().nullable(),
  serviceType: z.string().min(1).max(80),
  budget: z.string().max(80).optional().nullable(),
  deadline: z.string().min(1).max(80),
  message: z.string().min(10).max(5000),
  consent: z.literal(true),
  website: z.string().max(0).optional().nullable(), // honeypot
});

// --- XSS sanitization ---
function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // --- Rate limiting ---
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, errors: { _root: "Trop de demandes. Réessayez dans une minute." } },
        { status: 429 }
      );
    }

    // --- Body size limit (10KB max) ---
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10_000) {
      return NextResponse.json(
        { ok: false, errors: { _root: "Request too large" } },
        { status: 413 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, errors: { _root: "Invalid body" } },
        { status: 400 }
      );
    }

    // --- Honeypot ---
    if (body.website && String(body.website).trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // --- Validation ---
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string | undefined;
        if (key && !errors[key]) {
          errors[key] = issue.message;
        }
      }
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // --- Sanitize all text inputs ---
    const userAgent = req.headers.get("user-agent") || null;

    await db.contactSubmission.create({
      data: {
        name: sanitize(parsed.data.name),
        company: parsed.data.company ? sanitize(parsed.data.company) : null,
        email: sanitize(parsed.data.email),
        phone: parsed.data.phone ? sanitize(parsed.data.phone) : null,
        serviceType: sanitize(parsed.data.serviceType),
        budget: parsed.data.budget ? sanitize(parsed.data.budget) : null,
        deadline: sanitize(parsed.data.deadline),
        message: sanitize(parsed.data.message),
        consent: parsed.data.consent,
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _root: "Server error" } },
      { status: 500 }
    );
  }
}
