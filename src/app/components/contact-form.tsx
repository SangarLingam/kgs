"use client";

import { FormEvent, useState } from "react";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const message = result && typeof result === "object" && "error" in result && typeof result.error === "string" ? result.error : "Unable to send message.";
        throw new Error(message);
      }
      form.reset();
      setState("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message.");
      setState("error");
    }
  }
  return <form className={`contact-form${compact ? " contact-form-compact" : ""}`} onSubmit={submit}>
    <label>Your name *<input name="name" placeholder="Enter your name" required maxLength={120} autoComplete="name" /></label>
    <label>Phone number *<input name="mobile" type="tel" placeholder="Include your country code" required maxLength={30} autoComplete="tel" /></label>
    <label>Email address (optional)<input name="email" type="email" placeholder="you@example.com" maxLength={254} autoComplete="email" /></label>
    <label>What is your message about? *<select name="enquiry" required defaultValue=""><option value="" disabled>Select a topic</option><option value="Personal finance">Personal loan or finance</option><option value="Business finance">Finance for a business</option><option value="MSME finance">Finance for a small business</option><option value="Partnership">Working with KGS</option><option value="General enquiry">Something else</option></select></label>
    <label>Your message *<textarea name="message" rows={compact ? 2 : 3} placeholder="How can we help?" required minLength={3} maxLength={3000} /></label>
    <label className="honeypot" aria-hidden="true">Leave this field empty<input name="companyWebsite" tabIndex={-1} autoComplete="off" /></label>
    <button className="button" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}<span>→</span></button>
    <p className={`form-feedback${state === "sent" ? " success" : ""}`} role={state === "error" ? "alert" : "status"} aria-live={state === "error" ? "assertive" : "polite"}>{state === "sent" ? "Your message has been submitted successfully. KGS will contact you using the details provided." : state === "error" ? errorMessage || "We couldn’t send your message. Please try again, or contact KGS directly." : compact ? "KGS will use your details to reply to this message." : "By sending this form, you agree that KGS may contact you about your message. This form does not approve or arrange a loan."}</p>
  </form>;
}
