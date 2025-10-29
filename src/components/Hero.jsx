import Button from "./Button";
import Container from "./Container";

export default function Hero({ title, sub, primaryHref = "/services", secondaryHref = "/contact", dark = true, children }) {
  return (
    <div className={`${dark ? "text-white" : "text-[var(--charcoal)]"}`} style={{ background: dark ? "linear-gradient(180deg,#02294d,#032848 60%)" : "var(--bg)" }}>
      <Container>
        <div className="grid grid-cols-1 gap-6 py-10 md:grid-cols-2 md:py-16">
          <div>
            <div className="kicker mb-3">Pretoria East • Precision Engineering</div>
            <h1 className="h1">{title}</h1>
            {sub && <p className="mt-3 max-w-prose opacity-90">{sub}</p>}
            <div className="mt-6 flex gap-3">
              <Button href={primaryHref}>Explore Services</Button>
              <Button href={secondaryHref} variant="ghost">Get in Touch</Button>
            </div>
          </div>
          <div className="panel grid min-h-[200px] place-items-center rounded-2xl text-[#bfe9ff]">
            {children || "[ Short looping video / CAD simulation ]"}
          </div>
        </div>
      </Container>
    </div>
  );
}
