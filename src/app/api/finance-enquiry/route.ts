import { NextResponse } from "next/server";

const applicants = new Set(["Salaried", "Self-employed", "Business owner", "Professional", "Other"]);
const financeTypes = new Set(["Personal finance", "Business loan", "MSME finance", "Working capital", "Business expansion", "Other"]);

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
  const city = typeof body.city === "string" ? body.city.trim() : "";
  const applicantType = typeof body.applicantType === "string" ? body.applicantType : "";
  const financeType = typeof body.financeType === "string" ? body.financeType : "";
  const businessName = typeof body.businessName === "string" ? body.businessName.trim() : "";
  const amount = typeof body.amount === "string" ? Number(body.amount) : NaN;
  const tenure = typeof body.tenure === "string" ? body.tenure.trim() : "";
  const purpose = typeof body.purpose === "string" ? body.purpose.trim() : "";
  const phoneDigits = mobile.replace(/\D/g, "");
  if (!name || name.length > 120 || phoneDigits.length < 7 || phoneDigits.length > 15 || mobile.length > 30 || !city || city.length > 100 || businessName.length > 160 || tenure.length > 50 || !applicants.has(applicantType) || !financeTypes.has(financeType) || !Number.isSafeInteger(amount) || amount < 1 || amount > 1000000000 || !purpose || purpose.length > 1000 || body.consent !== "yes") {
    return NextResponse.json({ error: "Please check the required fields and consent." }, { status: 400 });
  }
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  const content = `Name: ${name}\nMobile: ${mobile}\nEmail: ${email || "Not provided"}\nCity: ${city}\nApplicant type: ${applicantType}\nFinance type: ${financeType}\nBusiness: ${businessName || "Not provided"}\nRequested amount (INR): ${amount}\nPreferred tenure: ${tenure || "Not provided"}\nPurpose: ${purpose}\nConsent: Provided`;
  let delivery: Response;
  try {
    delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [inbox], subject: `KGS finance enquiry - ${financeType}`, reply_to: email || undefined, text: content }),
      signal: AbortSignal.timeout(10000),
    });
  } catch { return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 }); }
  if (!delivery.ok) return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
