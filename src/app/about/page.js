import Hero from "../../components/Hero";
import Section from "../../components/Section";
import Container from "../../components/Container";
import Card from "../../components/Card";
import LogoSlider from "@/components/LogoSlider";
export const metadata = { title: "About Moulding Technicians" };

export default function AboutPage() {
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
        title="About Moulding Technicians"
        sub="PTSA-trained toolmakers, designers, and CAM specialists building Africa’s next-gen manufacturing capability."
      >
        <img src="/images/about-banner.png" alt="Services at Moulding Technicians" className="rounded-2xl object-cover w-full h-full" />
      </Hero>
      <div className="mx-auto w-full py-10">
        <LogoSlider
          logos={logos}
          heightClass="h-10 sm:h-12 md:h-14"
          gapClass="gap-10 sm:gap-12 md:gap-14"
          speed={28}
        />
      </div>
      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="rounded-2xl p-6">
              <div className="kicker mb-1">Mission & Vision</div>
              <p><strong>Mission:</strong> Deliver innovative plastic moulding solutions and technical training that empower clients to achieve operational excellence.</p>
              <p className="mt-2"><strong>Vision:</strong> Be Africa’s leading provider of advanced moulding technologies and training.</p>
            </Card>
            <Card className="rounded-2xl p-6">
              <div className="kicker mb-1">Core Values</div>
              <p>Sustainability • Innovation • Quality • Customer Focus • Continuous Improvement • Respect for the Environment</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="panel grid min-h-[180px] place-items-center rounded-2xl">
                <img src="/images/about-journey.png" alt="Services at Moulding Technicians" className="rounded-2xl object-cover w-full h-full" />
            </div>
            <Card className="rounded-2xl p-6">
              <div className="kicker mb-1">Our Story</div>
              <p>
                Founded in 2020 by a team of PTSA-trained toolmakers, Moulding Technicians began as a mould maintenance service and expanded into design,
                manufacturing, and software integration. Today we support clients across automotive, appliance, and packaging industries through end-to-end tooling solutions.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="kicker mb-2">Leadership</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="rounded-2xl p-6 flex flex-col items-center">
              <div className="grid place-items-center rounded-full border border-dashed border-gray-300 bg-gray-100 w-3/4 text-gray-500">
                    <img src="/images/simon.png" alt="Services at Moulding Technicians" className="rounded-full object-cover h-full" />
              </div>
              <div className="mt-3 text-center font-semibold">Makgareetsa Simon Malapane</div>
              <div className="text-sm text-center opacity-90">Managing Director & Tool Designer — PTSA (TDM). Leads design and R&D for tooling innovation & software implementation.</div>
            </Card>
            <Card className="rounded-2xl p-6 flex flex-col items-center">
              <div className="grid place-items-center rounded-full border border-dashed border-gray-300 bg-gray-100 w-3/4 text-gray-500">
                    <img src="/images/info.png" alt="Services at Moulding Technicians" className="rounded-full object-cover h-full" />
              </div>
              <div className="mt-3 text-center font-semibold">Ridovhona Muhadi</div>
              <div className="text-sm text-center opacity-90">Lead Machinist (TDM) PTSA — Designing and Machining</div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
