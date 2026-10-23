import { Interior } from "../components/page-chrome";
import { FinanceForm } from "../components/finance-form";

export const metadata = { title: "Ask about finance | Krishi Global Solutions", description: "Send KGS an initial finance enquiry and learn about possible next steps. An enquiry does not guarantee approval." };

export default function ApplyPage() {
  return <Interior eyebrow="ASK ABOUT FINANCE" title={<>Tell us what<br /><em>you’re looking for.</em></>} intro="Share a few details about the finance you need. KGS will review your message and contact you about possible next steps. Sending this form does not mean you have been approved for a loan.">
    <section className="interior-section apply-panel"><div className="apply-callout"><span>WHAT HAPPENS NEXT?</span><h2>We’ll help you understand the next steps.</h2><p>Tell us a little about yourself and what you need. Our team will contact you using the details you provide. Please do not include identity or bank details in this form.</p><div className="apply-steps"><div><span>01</span><p>Tell us what you need.</p></div><div><span>02</span><p>We’ll review your message.</p></div><div><span>03</span><p>We’ll contact you to discuss next steps.</p></div></div></div><FinanceForm /></section>
  </Interior>;
}
