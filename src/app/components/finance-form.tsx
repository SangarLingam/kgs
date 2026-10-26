"use client";

import { FormEvent, useState } from "react";

export function FinanceForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/finance-enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const message = result && typeof result === "object" && "error" in result && typeof result.error === "string" ? result.error : "Unable to send finance enquiry.";
        throw new Error(message);
      }
      form.reset();
      setState("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send finance enquiry.");
      setState("error");
    }
  }
  return <form className="finance-form" onSubmit={submit}>
    <div className="form-section-title"><span>01</span> ABOUT YOU</div>
    <label>Full name *<input name="name" placeholder="Enter your name" required maxLength={120} autoComplete="name" /></label>
    <label>Phone number *<input name="mobile" type="tel" placeholder="Include your country code" required maxLength={30} autoComplete="tel" /></label>
    <label>Email address (optional)<input name="email" type="email" placeholder="you@example.com" maxLength={254} autoComplete="email" /></label>
    <label>City or town *<input name="city" placeholder="Where do you live or work?" required maxLength={100} autoComplete="address-level2" /></label>
    <div className="form-section-title"><span>02</span> WHAT DO YOU NEED?</div>
    <label>Which best describes you? *<select name="applicantType" required defaultValue=""><option value="" disabled>Select one</option><option value="Salaried">I work for a company</option><option value="Self-employed">I work for myself</option><option value="Business owner">I own a business</option><option value="Professional">I’m a professional</option><option>Other</option></select></label>
    <label>What kind of finance do you need? *<select name="financeType" required defaultValue=""><option value="" disabled>Select one</option><option value="Personal finance">Personal loan or finance</option><option value="Business loan">Business loan</option><option value="MSME finance">Small business finance</option><option value="Working capital">Money for day-to-day business costs</option><option value="Business expansion">Money to grow a business</option><option value="Other">Something else</option></select></label>
    <label>Business name (if applicable)<input name="businessName" placeholder="Enter your business name" maxLength={160} /></label>
    <label>How much money do you need? (₹) *<input name="amount" type="number" min="1" max="1000000000" placeholder="For example, 500000" required /></label>
    <label>When do you hope to pay it back? (optional)<input name="tenure" placeholder="For example, 24 months" maxLength={50} /></label>
    <label>What do you need the money for? *<textarea name="purpose" placeholder="A short explanation is enough" required maxLength={1000} rows={3} /></label>
    <label className="finance-consent"><input type="checkbox" name="consent" value="yes" required /> I confirm these details are correct and agree that KGS may contact me about this request. Sending this form does not guarantee a loan or money.</label>
    <label className="honeypot" aria-hidden="true">Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send finance request"}<span>→</span></button>
    <p className={`form-feedback${state === "sent" ? " success" : ""}`} role={state === "error" ? "alert" : "status"} aria-live={state === "error" ? "assertive" : "polite"}>{state === "sent" ? "Your finance enquiry has been submitted successfully. KGS will contact you using the details provided." : state === "error" ? errorMessage || "We couldn’t send your request. Please try again, or contact KGS directly." : "Do not enter Aadhaar, PAN, bank account details or other identity information here. KGS will explain a safe way to share documents if they are needed."}</p>
  </form>;
}
