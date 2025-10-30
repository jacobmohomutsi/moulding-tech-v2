import Hero from "../components/Hero";
import Section from "../components/Section";
import Container from "../components/Container";
import ServiceCard from "../components/ServiceCard";
import ValueItem from "../components/ValueItem";
import Button from "../components/Button";
import KpiSection from "../components/KpiSection";
import LogoSlider from "@/components/LogoSlider";
import {
  Boxes, PackageSearch, DraftingCompass, Cube, Cpu, Code2,
  Wrench, Settings2, ShoppingCart, BadgeCheck, GraduationCap, BookOpenCheck
} from "lucide-react";



export default function HomePage() {
  const logos = [
    "/images/logos/logo7.png",
    "/images/logos/logo1.png",
    "/images/logos/logo2.png",
    "/images/logos/logo3.png",
    "/images/logos/logo4.png",
    "/images/logos/logo5.png",
    "/images/logos/logo6.png",
    "/images/logos/logo8.png",
    "/images/logos/logo9.png",
  ];
  return (
    <>
      <Hero
        title="Packaging the World, a Runner at a Time"
        sub="Tooling, moulding & stamping experts driving innovation through precision engineering."
      >
        <video src="/home-video.mp4" autoPlay loop muted className="w-full h-full rounded-2xl" />
      </Hero>
      <div className="mx-auto w-full py-10">
        <LogoSlider
          logos={logos}
          heightClass="h-10 sm:h-12 md:h-14"
          gapClass="gap-10 sm:gap-12 md:gap-14"
          speed={28}
        />
      </div>

      {/* About Preview */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="card rounded-2xl p-6">
              <div className="kicker mb-1">About Preview</div>
              <h3 className="h3 mb-2">Who We Are</h3>
              <p className="mb-3">
                Moulding Technicians PTY Ltd is a engineering company specialising in plastic moulding, tool design,
                SolidCAM software resellers, and technical training.
              </p>
              <p className="mb-4">
                We combine design insight, manufacturing discipline, and software integration to deliver complete tooling solutions—from
                concept sketches to fully commissioned moulds.
              </p>
              <Button href="/about">Learn More</Button>
            </div>
            <div className="panel grid min-h-[220px] place-items-center rounded-2xl p-3">
              <img src="/images/rosslyn-workshop.png" alt="About Moulding Technicians" className="rounded-2xl object-cover w-full h-full" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Services Summary */}
      <Section>
        <Container>
          <div className="kicker mb-1">Core Services</div>
          <h3 className="h3 mb-6">What We Do</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ServiceCard title="Plastic Moulding Solutions" desc="Prototype to high-volume; multi-cavity; material optimisation; maintenance." icon={Boxes} />
            <ServiceCard title="Mould & Tool Design" desc="3D modelling, simulation, DFM, full data packs with assemblies & revisions." icon={DraftingCompass} />
            <ServiceCard title="CAM Programming – CNC" desc="Custom G-code & strategies; milling, turning, EDM; training & posts." icon={Cpu} />
            <ServiceCard title="Machining & Prototyping" desc="High-accuracy spares & concept parts. Tolerances within ±0.005 mm." icon={Wrench} />
            <ServiceCard title="SolidCAM Reselling" desc="Licensing, module setup, installation, and ongoing support." icon={BadgeCheck} />
            <ServiceCard title="Training & Certification" desc="Hands-on SolidCAM, CNC operation, maintenance; industry-recognised certificates." icon={GraduationCap} />
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="kicker">Why Choose Us</div>
              <ValueItem code="In" title="Innovation" desc="Applying SolidCAM and 3D simulation for unmatched accuracy." />
              <ValueItem code="Ig" title="Integrity" desc="Transparent quotations & ethical operations." />
              <ValueItem code="Ex" title="Excellence" desc="PTSA-qualified toolmakers delivering ISO-level precision." />
              <ValueItem code="Su" title="Sustainability" desc="Efficient material usage and eco-conscious manufacturing." />
            </div>
            <div className="md:grid hidden min-h-[180px] place-items-start rounded-2xl">
              <KpiSection />
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section>
        <Container>
          <div
            className="rounded-2xl bg-gradient-to-r from-[var(--blue)] to-[#004b8a] p-6 text-white bg-cover bg-center h-60"
            style={{
              backgroundImage: "url('/images/bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <h3 className="h3">Let’s Build Something Precise.</h3>
            <p className="mt-1 opacity-95">Talk to our team about your next tooling or moulding project.</p>
            <div className="mt-4">
              <Button href="/contact">Contact Us</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
