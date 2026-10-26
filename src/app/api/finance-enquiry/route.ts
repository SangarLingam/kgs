import { NextResponse } from "next/server";
import { appendEnquiryToSheet, GoogleSheetsConfigurationError } from "@/lib/google-sheets";

const applicants = new Set(["Salaried", "Self-employed", "Business owner", "Professional", "Other"]);
const financeTypes = new Set(["Personal finance", "Business loan", "MSME finance", "Working capital", "Business expansion", "Other"]);

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
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    await appendEnquiryToSheet("Finance Enquiries", [
      new Date().toISOString(),
      name,
      mobile,
      email,
      city,
      applicantType,
      financeType,
      businessName,
      amount,
      tenure,
      purpose,
    ]);
  } catch (error) {
    if (error instanceof GoogleSheetsConfigurationError) {
      return NextResponse.json({ error: "Set KGS_SHEETS_WEB_APP_URL and KGS_SHEETS_WEBHOOK_SECRET in .env.local, then restart the app." }, { status: 503 });
    }
    console.error("Finance enquiry could not be saved to Google Sheets.", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Enquiry delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
