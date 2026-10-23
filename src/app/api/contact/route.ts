import { NextResponse } from "next/server";

const allowedEnquiries = new Set(["Personal finance", "Business finance", "MSME finance", "Partnership", "General enquiry"]);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.KGS_INBOX;
  const from = process.env.KGS_FROM_EMAIL;
  if (!apiKey || !inbox || !from) return NextResponse.json({ error: "Enquiry delivery is not configured." }, { status: 503 });
  let body: Record<string, unknown>;
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    body = payload as Record<string, unknown>;
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) return NextResponse.json({ ok: true });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const mobile = typeof body.mobile === "string" ? body.mobile.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const enquiry = typeof body.enquiry === "string" ? body.enquiry : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const phoneDigits = mobile.replace(/\D/g, "");
  if (!name || name.length > 120 || phoneDigits.length < 7 || phoneDigits.length > 15 || mobile.length > 30 || message.length < 3 || message.length > 3000 || !allowedEnquiries.has(enquiry)) return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  let delivery: Response;
  try {
    delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [inbox], subject: `KGS website enquiry - ${enquiry}`, reply_to: email || undefined, text: `Name: ${name}\nMobile: ${mobile}\nEmail: ${email || "Not provided"}\nEnquiry: ${enquiry}\n\nMessage:\n${message}` }),
      signal: AbortSignal.timeout(10000),
    });
  } catch { return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 }); }
  if (!delivery.ok) return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
