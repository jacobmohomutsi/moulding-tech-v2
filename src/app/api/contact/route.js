// app/api/contact/route.js
import Brevo from "@getbrevo/brevo";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------- Validation ----------------------------- */
const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().transform(v => v?.trim() || ""),
  company: z.string().max(120).optional().transform(v => v?.trim() || ""),
  message: z.string().min(10).max(5000),
  _hp: z.string().optional(),          // honeypot (should be empty)
  _openedAt: z.number().optional(),    // ms timestamp when form was opened
  recaptchaToken: z.string().optional()
});

/* ----------------------------- Rate Limit ----------------------------- */
// Simple in-memory sliding window (good for dev/small sites)
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQS = 8;       // 8 requests/minute/IP
const hits = new Map();   // ip -> [timestamps]
function inMemoryRateLimit(ip) {
  const now = Date.now();
  const arr = hits.get(ip) || [];
  const recent = arr.filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length <= MAX_REQS;
}

// Optional: Upstash Redis (uncomment if you want cloud rate-limiting)
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
//   ? new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN })
//   : null;
// const upstashLimiter = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "1 m") }) : null;

/* ------------------------------- Helpers ------------------------------ */
const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
           .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function retry(fn, { tries = 2, baseMs = 350 } = {}) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { return await fn(); } catch (e) { last = e; await sleep(baseMs * (i + 1)); }
  }
  throw last;
}

async function verifyRecaptcha(token) {
  const secret = process.env.RECAPTCHA_SECRET?.trim();
  if (!secret || !token) return { ok: true, skipped: true };
  const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token })
  });
  const out = await r.json().catch(() => ({}));
  return { ok: !!out.success, score: out.score, action: out.action, out };
}

/* -------------------------------- Route ------------------------------- */
export async function POST(req) {
  const requestId = crypto.randomUUID();
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
         || req.headers.get("x-real-ip")
         || "unknown";

  try {
    // Body + validation
    const raw = await req.text();
    let data;
    try {
      data = ContactSchema.parse(JSON.parse(raw || "{}"));
    } catch (e) {
      console.error(`[${requestId}] Zod validation fail:`, e?.errors || String(e));
      return Response.json({ message: "Please check your inputs.", requestId }, { status: 400 });
    }

    // Honeypot + time-to-submit (bots submit instantly)
    if (data._hp && data._hp.trim() !== "") {
      console.warn(`[${requestId}] Honeypot triggered for IP ${ip}`);
      return Response.json({ message: "OK", requestId }); // pretend success
    }
    if (data._openedAt && Date.now() - Number(data._openedAt) < 1500) {
      console.warn(`[${requestId}] Too-fast submit (${Date.now() - data._openedAt}ms) from ${ip}`);
      return Response.json({ message: "OK", requestId }); // pretend success
    }

    // Rate limit
    // if (upstashLimiter) {
    //   const { success, limit, remaining, reset } = await upstashLimiter.limit(`contact:${ip}`);
    //   if (!success) return Response.json({ message: "Too many requests. Try again soon.", requestId }, { status: 429 });
    // } else {
    if (!inMemoryRateLimit(ip)) {
      return Response.json({ message: "Too many requests. Try again soon.", requestId }, { status: 429 });
    }
    // }

    // Optional reCAPTCHA verify
    if (data.recaptchaToken) {
      const rc = await verifyRecaptcha(data.recaptchaToken);
      if (!rc.ok) {
        console.warn(`[${requestId}] reCAPTCHA failure`, rc);
        return Response.json({ message: "Verification failed.", requestId }, { status: 400 });
      }
    }

    const apiKey = process.env.BREVO_API_KEY?.trim();
    const toEmail = process.env.CONTACT_TO?.trim();
    const fromEmail = process.env.CONTACT_FROM?.trim();
    const tplId = Number(process.env.BREVO_TEMPLATE_ID || 0);
    const autoTplId = Number(process.env.BREVO_AUTOREPLY_TEMPLATE_ID || 0);

    if (!apiKey || !toEmail || !fromEmail) {
      console.error(`[${requestId}] Missing env vars:`, { hasApiKey: !!apiKey, toEmail, fromEmail });
      return Response.json({ message: "Server configuration error.", requestId }, { status: 500 });
    }

    const { name, email, phone, company, message } = data;

    /* --------------- Brevo init --------------- */
    const api = new Brevo.TransactionalEmailsApi();
    api.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);

    /* --------------- Prepare payloads --------------- */
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      ${phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : ""}
      ${company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;">${esc(message)}</p>
      <hr/>
      <p style="color:#777">Request ID: ${requestId}</p>
    `;

    // Admin notification (to you)
    const adminEmail = new Brevo.SendSmtpEmail();
    adminEmail.sender = { email: fromEmail, name: "Website" };
    adminEmail.to = [{ email: toEmail, name: "Team" }];
    adminEmail.replyTo = { email, name }; // so you can just reply
    adminEmail.subject = `New contact from ${name}`;
    if (tplId > 0) {
      adminEmail.templateId = tplId;
      adminEmail.params = { name, email, phone, company, message, requestId };
    } else {
      adminEmail.htmlContent = html;
      adminEmail.textContent =
        `New Contact\nName: ${name}\nEmail: ${email}\n` +
        (phone ? `Phone: ${phone}\n` : "") +
        (company ? `Company: ${company}\n` : "") +
        `\nMessage:\n${message}\n\nRequest ID: ${requestId}\n`;
    }

    // Auto-reply (to user) — optional if you set BREVO_AUTOREPLY_TEMPLATE_ID
    const autoReply = new Brevo.SendSmtpEmail();
    autoReply.sender = { email: fromEmail, name: "Website" };
    autoReply.to = [{ email, name }];
    autoReply.subject = `Thanks, ${name} — we got your message`;
    if (autoTplId > 0) {
      autoReply.templateId = autoTplId;
      autoReply.params = { name, requestId };
    } else {
      autoReply.htmlContent = `<p>Hi ${esc(name)},</p><p>Thanks for reaching out. We received your message and will reply soon.</p><p>Ref: ${requestId}</p>`;
      autoReply.textContent = `Hi ${name},\n\nThanks for reaching out. We received your message and will reply soon.\n\nRef: ${requestId}\n`;
    }

    /* --------------- Send with retry --------------- */
    const sendAdmin = () => api.sendTransacEmail(adminEmail);
    const sendUser  = () => api.sendTransacEmail(autoReply);

    let adminResult, userResult;
    try {
      adminResult = await retry(sendAdmin, { tries: 2, baseMs: 400 });
      console.log(`[${requestId}] Admin email OK`, adminResult?.messageId || adminResult);
    } catch (e) {
      const status = e?.response?.status;
      const body = e?.response?.text || e?.message || String(e);
      console.error(`[${requestId}] Admin email FAIL`, status, body);
      // We still proceed to tell user success to avoid leaking provider errors.
    }

    try {
      userResult = await retry(sendUser, { tries: 2, baseMs: 400 });
      console.log(`[${requestId}] Auto-reply OK`, userResult?.messageId || userResult);
    } catch (e) {
      const status = e?.response?.status;
      const body = e?.response?.text || e?.message || String(e);
      console.error(`[${requestId}] Auto-reply FAIL`, status, body);
    }

    return Response.json({ message: "Thanks! Your message has been sent.", requestId }, { status: 200 });
  } catch (err) {
    console.error(`[${requestId}] Unhandled error:`, err);
    return Response.json({ message: "Internal server error.", requestId }, { status: 500 });
  }
}
