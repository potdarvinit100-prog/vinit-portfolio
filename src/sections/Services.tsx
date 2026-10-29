import {
  Building2,
  Coffee,
  Sparkles,
  Dumbbell,
  Stethoscope,
  ShoppingCart,
  LayoutTemplate,
  Cpu,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Container, SectionHeading, Reveal } from '../components/ui';
import { openInquiry } from '../lib/site';

interface Service {
  icon: LucideIcon;
  title: string;
  blurb: string;
  industry: string;
}

const SERVICES: Service[] = [
  {
    icon: Building2,
    title: 'Business & Company Websites',
    blurb: 'A professional online presence that builds trust and brings in enquiries.',
    industry: 'business',
  },
  {
    icon: Coffee,
    title: 'Restaurant & Café Websites',
    blurb: 'Menus, galleries, reservations and reviews — everything diners look for.',
    industry: 'restaurant',
  },
  {
    icon: Sparkles,
    title: 'Salon & Beauty Studio Websites',
    blurb: 'Service lists, pricing and easy appointment booking for your clients.',
    industry: 'salon',
  },
  {
    icon: Dumbbell,
    title: 'Gym & Fitness Websites',
    blurb: 'Class schedules, membership plans and trainer profiles that convert.',
    industry: 'gym',
  },
  {
    icon: Stethoscope,
    title: 'Hospital & Clinic Websites',
    blurb: 'Doctor profiles, services and appointment requests patients trust.',
    industry: 'clinic',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Websites',
    blurb: 'Product catalogs, payments and order management that sell for you.',
    industry: 'ecommerce',
  },
  {
    icon: LayoutTemplate,
    title: 'Portfolio & Landing Pages',
    blurb: 'Sharp one-page sites that pitch you, your work or your next launch.',
    industry: 'portfolio',
  },
  {
    icon: Cpu,
    title: 'Custom Full-stack & AI Web Apps',
    blurb: 'Dashboards, booking systems and AI-powered tools built to your spec.',
    industry: 'custom',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="Services"
          title="What I Build"
          sub="Every site is custom-designed, mobile-first, and built to bring you customers — not just look pretty."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.08}>
              <article className="glass rounded-2xl p-6 h-full flex flex-col hover:border-lime/60 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-viol/20 text-viol flex items-center justify-center mb-5 group-hover:bg-lime/20 group-hover:text-lime transition-colors">
                  <s.icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">{s.blurb}</p>
                <button
                  onClick={() => openInquiry({ industry: s.industry })}
                  className="inline-flex items-center gap-1.5 text-lime text-sm font-semibold hover:gap-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded"
                >
                  Start a project <ArrowRight size={16} aria-hidden="true" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
