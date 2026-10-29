import { Phone, MessageCircle, Send, Instagram, type LucideIcon } from 'lucide-react';
import { Container, SectionHeading, Reveal, MagneticButton } from '../components/ui';
import { SITE, openInquiry } from '../lib/site';

interface Method {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

const METHODS: Method[] = [
  { icon: Phone, label: 'Call', value: SITE.phoneDisplay, href: SITE.phoneHref },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', href: SITE.whatsapp },
  { icon: Send, label: 'Telegram', value: '@hello_vinit', href: SITE.telegram },
  { icon: Instagram, label: 'Instagram', value: '@_yrrr_vinit', href: SITE.instagram },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="Get In Touch"
          title="Let's build something"
          sub="Prefer to talk first? Reach me directly on any of these — I usually reply fast."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {METHODS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <a
                href={m.href}
                target={m.href.startsWith('http') ? '_blank' : undefined}
                rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-2xl p-6 flex items-center gap-4 hover:border-lime/60 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <span className="w-12 h-12 shrink-0 rounded-xl bg-lime/15 text-lime flex items-center justify-center group-hover:bg-lime group-hover:text-black transition-colors">
                  <m.icon size={22} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-white/50 text-xs uppercase tracking-[0.15em] mb-1">
                    {m.label}
                  </span>
                  <span className="block font-semibold text-white">{m.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="text-white/40 text-sm text-center mb-10">
            Email · GitHub · LinkedIn — coming soon
          </p>
        </Reveal>
        <Reveal delay={0.1} className="text-center">
          <MagneticButton
            onClick={() => openInquiry({})}
            className="bg-lime text-black font-bold px-10 py-5 rounded-full text-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Get a Website for Your Business
          </MagneticButton>
        </Reveal>
      </Container>
    </section>
  );
}
