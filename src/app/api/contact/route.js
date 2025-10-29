export async function POST(request) {
  const data = await request.json();
  // Minimal validation
  const { name, email, phone, company, message } = data || {};
  if (!name || !email || !message) {
    return Response.json({ ok: false, message: "Missing required fields." }, { status: 400 });
  }

  // For now: log the enquiry (server console). You can plug in an email/SaaS later.
  console.log("[CONTACT] New enquiry:", { name, email, phone, company, message, at: new Date().toISOString() });

  return Response.json({ ok: true, message: "Thanks — we’ll get back to you shortly." });
}
