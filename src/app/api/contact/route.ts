import { NextResponse } from "next/server";
import { appendEnquiryToSheet, GoogleSheetsConfigurationError } from "@/lib/google-sheets";

const allowedEnquiries = new Set(["Personal finance", "Business finance", "MSME finance", "Partnership", "General enquiry"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const payload: unknown = await request.json();
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    body = payload as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) return NextResponse.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const mobile = typeof body.mobile === "string" ? body.mobile.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const enquiry = typeof body.enquiry === "string" ? body.enquiry : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const phoneDigits = mobile.replace(/\D/g, "");

  if (!name || name.length > 120 || phoneDigits.length < 7 || phoneDigits.length > 15 || mobile.length > 30 || message.length < 3 || message.length > 3000 || !allowedEnquiries.has(enquiry)) {
    return NextResponse.json({ error: "Please check the required fields." }, { status: 400 });
  }
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await appendEnquiryToSheet("Contact Enquiries", [new Date().toISOString(), name, mobile, email, enquiry, message]);
  } catch (error) {
    if (error instanceof GoogleSheetsConfigurationError) {
      return NextResponse.json({ error: "Set KGS_SHEETS_WEB_APP_URL and KGS_SHEETS_WEBHOOK_SECRET in .env.local, then restart the app." }, { status: 503 });
    }
    console.error("Contact enquiry could not be saved to Google Sheets.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
