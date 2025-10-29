import Hero from "../../components/Hero";
import Section from "../../components/Section";
import Container from "../../components/Container";
import Card from "../../components/Card";
import { SITE } from "../../lib/site";
import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Get in Touch" };

export default function ContactPage() {
  return (
    <>
      <Hero 
        title="Get in Touch" 
        sub="We look forward to discussing your moulding and tooling requirements."
    >
        <img src="/images/contact-banner.png" alt="Services at Moulding Technicians" className="rounded-2xl object-cover w-full h-full"/>
      </Hero>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Client form lives in its own component */}
            <ContactForm />

            <div className="space-y-4">
              <Card className="rounded-2xl p-6">
                <strong>Company Details</strong><br />
                {SITE.brand}<br />
                {SITE.addressLine}<br />
                Phone: {SITE.phone}<br />
                Email: {SITE.email}<br />
                Website: {SITE.url.replace(/^https?:\/\//, "")}<br />
                Social: @Moulding-Technicians
              </Card>
              <div className="panel grid min-h-[220px] place-items-center rounded-2xl text-[#7a8b96]">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.224892366051!2d28.0990656!3d-25.630660499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfd08f12cf2087%3A0x506ce2665e4efcee!2s3%20Van%20Eden%20Cres%2C%20Rosslyn%2C%20Akasia%2C%200200!5e0!3m2!1sen!2sza!4v1761485012354!5m2!1sen!2sza"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
