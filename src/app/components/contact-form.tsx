"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Unable to send message");
      form.reset();
      setState("sent");
    } catch { setState("error"); }
  }
  return <form className={`contact-form${compact ? " contact-form-compact" : ""}`} onSubmit={submit}>
    <label>Your name *<input name="name" placeholder="Enter your name" required maxLength={120} autoComplete="name" /></label>
    <label>Phone number *<input name="mobile" type="tel" placeholder="Include your country code" required maxLength={30} autoComplete="tel" /></label>
    <label>Email address (optional)<input name="email" type="email" placeholder="you@example.com" maxLength={254} autoComplete="email" /></label>
    <label>What is your message about? *<select name="enquiry" required defaultValue=""><option value="" disabled>Select a topic</option><option value="Personal finance">Personal loan or finance</option><option value="Business finance">Finance for a business</option><option value="MSME finance">Finance for a small business</option><option value="Partnership">Working with KGS</option><option value="General enquiry">Something else</option></select></label>
    <label>Your message *<textarea name="message" rows={compact ? 2 : 3} placeholder="How can we help?" required minLength={3} maxLength={3000} /></label>
    <label className="honeypot" aria-hidden="true">Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}<span>→</span></button>
    <small role={state === "error" ? "alert" : "status"} aria-live={state === "error" ? "assertive" : "polite"}>{state === "sent" ? "Thank you. Your message has been sent to KGS." : state === "error" ? "We couldn’t send your message. Please try again, or contact KGS directly." : compact ? "KGS will use your details to reply to this message." : "By sending this form, you agree that KGS may contact you about your message. This form does not approve or arrange a loan."}</small>
  </form>;
}
