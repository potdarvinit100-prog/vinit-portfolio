import {
  Compass,
  PenTool,
  Code2,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { Container, SectionHeading, Reveal } from '../components/ui';

interface Step {
  icon: LucideIcon;
  num: string;
  title: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    icon: Compass,
    num: '01',
    title: 'Discover',
    desc: 'We talk about your business, your goals, and the customers you want to reach — so the site is built to sell, not just sit there.',
  },
  {
    icon: PenTool,
    num: '02',
    title: 'Design',
    desc: 'You get a wireframe and a visual mockup first. We iterate on the look until it feels right for your brand.',
  },
  {
    icon: Code2,
    num: '03',
    title: 'Build',
    desc: 'I develop the full site — responsive pages, integrations, and AI features where they genuinely help your business.',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Launch',
    desc: 'I deploy everything, walk you through managing it, and stick around for support after go-live.',
  },
];

export default function Process() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          kicker="How It Works"
          title="From Idea to Live Website"
          sub="A simple, transparent process. You always know what happens next — and what's expected of you."
        />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <li className="relative glass rounded-2xl p-6 h-full">
                <span
                  className="font-display text-6xl font-extrabold text-white/10 absolute top-4 right-5 select-none"
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-lime/15 text-lime flex items-center justify-center mb-5">
                  <step.icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
