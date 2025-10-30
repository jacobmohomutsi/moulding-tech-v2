// app/api/brevo-check/route.js
export const runtime = "nodejs";

export async function GET() {
  const key = process.env.BREVO_API_KEY?.trim();
  if (!key) return Response.json({ ok: false, reason: "Missing BREVO_API_KEY" }, { status: 500 });

  try {
    const r = await fetch("https://api.brevo.com/v3/account", {
      headers: { "api-key": key },
    });
    const text = await r.text();
    return Response.json({ status: r.status, body: text.slice(0, 200) + (text.length > 200 ? "..." : "") });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
