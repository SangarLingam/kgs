import { ContactForm } from "../components/contact-form";
import { Interior } from "../components/page-chrome";

export const metadata = { title: "Contact KGS | Krishi Global Solutions", description: "Contact Krishi Global Solutions with a question, business enquiry or partnership request." };

export default function ContactPage() {
  return <Interior eyebrow="CONTACT KGS" title={<>How can we<br /><em>help you?</em></>} intro="Send us a question about our services, a business enquiry or a partnership. Fill in the form and KGS will contact you using the details you provide.">
    <section className="interior-section contact-page"><div><span className="section-label">HEAD OFFICE</span><address className="office-address">Krishi Global Solutions Pvt. Ltd.<br />Perundurai, Erode<br />Tamil Nadu, India</address><a className="under-link map-link" href="https://maps.google.com/?q=Perundurai%2C+Erode%2C+Tamil+Nadu%2C+India" target="_blank" rel="noreferrer">View area on Google Maps <span>↗</span></a><span className="section-label contact-purpose">WHAT SHOULD I USE THIS FORM FOR?</span><p>Use this form for general questions, business enquiries or partnerships. To ask about a personal or business loan, use the <a className="under-link" href="/apply">finance enquiry form</a>.</p></div><ContactForm /></section>
  </Interior>;
}
