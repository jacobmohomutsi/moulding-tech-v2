import Hero from "../../components/Hero";
import Section from "../../components/Section";
import Container from "../../components/Container";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import ServiceBlock from "../../components/ServiceBlock";
export const metadata = { title: "Our Expertise in Action" };
import { Boxes, DraftingCompass, Cpu, Wrench, BadgeCheck, GraduationCap } from "lucide-react";

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Expertise in Action"
        sub="Comprehensive plastic moulding and tooling solutions for every stage of production."
      >
        <img src="/images/services-banner.png" alt="Services at Moulding Technicians" className="rounded-2xl object-cover w-full h-full" />
      </Hero>

      <Section>
        <Container className="space-y-4">
            <ServiceBlock
                idx="1"
                title="Plastic Moulding Solutions"
                imgSrc="/images/3d modeling-rafiki.png"
                right="From prototype to high-volume runs with SolidCAM-driven CNC toolpaths. Material optimisation, multi-cavity moulds, and maintenance support."
                deliverables="BOM • Process sheet • QC checklist"
            />

            <ServiceBlock
                idx="2"
                title="Mould & Tool Design"
                imgSrc="/images/Design tools-rafiki.png"
                right="3D modelling, simulation, and DFM. We supply complete DATA PACKs with assembly drawings and revision histories."
                deliverables="STEP/Parasolid • 2D drawings • Rev log"
            />

            <ServiceBlock
                idx="3"
                title="CAM Programming – CNC"
                imgSrc="/images/Binary code-rafiki.png"
                right="Custom G-code and machining strategies for milling, turning, and EDM. Training and post-processor setup available."
                deliverables="G-code • Setup sheet • Tool list"
            />

            <ServiceBlock
                idx="4"
                title="Machining & Prototyping"
                imgSrc="/images/Robot arm-rafiki.png"
                right="High-accuracy machining for mould spares and concept products. Tolerances within ±0.005 mm using modern CNC centres."
                deliverables="Inspection report • Surface finish notes"
            />

            <ServiceBlock
                idx="5"
                title="SolidCAM Software Reselling"
                imgSrc="/images/Online consulting-rafiki.png"
                right="Authorized partners guiding license selection, module setup, installation, and staff training. Integrated CAD/CAM with ongoing support."
                deliverables="Install • Module config • Training plan"
            />

            <ServiceBlock
                idx="6"
                title="Technical Training & Certification"
                imgSrc="/images/Seminar-rafiki.png"
                right="Hands-on courses covering SolidCAM modules, CNC operation, and tool maintenance. Completion certificates recognised by partners."
                deliverables="On-site • Virtual • Blended"
            />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl bg-gradient-to-r from-[var(--blue)] to-[#004b8a] p-6 text-white h-60"
            style={{
              backgroundImage: "url('/images/bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <h3 className="h3">Ready to start?</h3>
            <p className="mt-1 opacity-95">Share drawings or a brief and we’ll scope the optimal approach.</p>
            <div className="mt-4">
              <Button href="/contact">Request a Quote</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
