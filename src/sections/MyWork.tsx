import { PhoneCall, Brain, CalendarCheck, Check, MessageSquare } from 'lucide-react';
import { Container, SectionHeading, Reveal, MagneticButton } from '../components/ui';
import { openInquiry } from '../lib/site';

const CAPABILITIES = [
  {
    icon: PhoneCall,
    text: 'Answers business calls with natural voice — 24/7',
  },
  {
    icon: Brain,
    text: 'Answers customer FAQs from your knowledge base',
  },
  {
    icon: CalendarCheck,
    text: 'Checks live calendar availability in real time',
  },
  {
    icon: Check,
    text: 'Books appointments without you lifting a finger',
  },
];

const TECH_TAGS = ['Next.js', 'Supabase', 'Vapi voice AI', 'Twilio'];

export default function MyWork() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          kicker="Real Build"
          title="My Work"
          sub="A real production-grade project — not a mockup. This is the standard I build to."
        />
        <Reveal>
          <article className="glass rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Visual side */}
              <div className="relative min-h-64 bg-gradient-to-br from-viol/40 via-purple-900/40 to-ink p-8 flex flex-col justify-between overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  aria-hidden="true"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(139,92,246,0.5), transparent 60%), radial-gradient(circle at 75% 80%, rgba(198,255,61,0.25), transparent 55%)',
                  }}
                />
                <span className="relative w-fit bg-lime text-black text-xs font-extrabold tracking-[0.2em] uppercase px-4 py-2 rounded-full">
                  Real Project
                </span>
                <div className="relative">
                  <p className="font-display text-5xl md:text-6xl font-extrabold tracking-tight">
                    Voxa<span className="text-lime">.</span>
                  </p>
                  <p className="text-white/70 mt-2 text-lg">AI Receptionist Platform</p>
                </div>
              </div>
              {/* Copy side */}
              <div className="p-8 md:p-10">
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  A real build from 2026: an AI receptionist platform that lets small
                  businesses never miss a call. I designed and developed it end to end —
                  voice agent, dashboard, bookings, and integrations.
                </p>
                <ul className="space-y-4 mb-8">
                  {CAPABILITIES.map((c) => (
                    <li key={c.text} className="flex items-start gap-3">
                      <span className="w-9 h-9 shrink-0 rounded-lg bg-lime/15 text-lime flex items-center justify-center">
                        <c.icon size={18} aria-hidden="true" />
                      </span>
                      <span className="text-white/85 text-sm leading-relaxed pt-1.5">
                        {c.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {TECH_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-white/70 border border-white/15 rounded-full px-3.5 py-1.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Honest CTA band */}
            <div className="border-t border-white/10 bg-panel/70 px-8 md:px-10 py-8 flex flex-col md:flex-row md:items-center gap-5 justify-between">
              <p className="flex items-start gap-3 text-white/80">
                <MessageSquare size={22} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-display text-lg font-bold">
                  Work with me and become my first featured review.
                </span>
              </p>
              <MagneticButton
                onClick={() => openInquiry({})}
                className="shrink-0 bg-lime text-black font-bold px-7 py-3.5 rounded-full hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Start Your Project
              </MagneticButton>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
