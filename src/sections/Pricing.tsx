import { Check, Clock } from 'lucide-react';
import { Container, SectionHeading, Reveal } from '../components/ui';
import { PACKAGES, openInquiry } from '../lib/site';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="Pricing"
          title="Honest, Upfront Packages"
          sub="Pick a starting point that fits your business. Every project gets a custom quote before we begin."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PACKAGES.map((p, i) => {
            const popular = p.id === 'business';
            return (
              <Reveal key={p.id} delay={i * 0.1} className="h-full">
                <article
                  className={`relative rounded-3xl p-8 h-full flex flex-col transition-colors ${
                    popular
                      ? 'bg-panel border-2 border-lime shadow-[0_0_60px_rgba(198,255,61,0.12)]'
                      : 'glass hover:border-white/30'
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-lime text-black text-xs font-extrabold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full whitespace-nowrap">
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-2xl font-bold mb-1">{p.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{p.tagline}</p>
                  <p className="mb-1">
                    <span className="font-display text-4xl font-extrabold text-lime">
                      ${p.min}–${p.max}
                    </span>
                  </p>
                  <p className="text-white/50 text-sm mb-6">estimated range, not a fixed quote</p>
                  <p className="flex items-center gap-2 text-white/70 text-sm mb-6">
                    <Clock size={16} className="text-viol" aria-hidden="true" />
                    <span>
                      Estimated timeline: <strong className="text-white">{p.timeline}</strong>
                    </span>
                  </p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check size={16} className="text-lime shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => openInquiry({ packageName: p.name })}
                    className={`w-full font-bold py-3.5 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
                      popular
                        ? 'bg-lime text-black hover:brightness-110'
                        : 'border border-white/25 text-white hover:border-lime hover:text-lime'
                    }`}
                  >
                    Discuss My Project
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.15}>
          <p className="text-white/60 text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            All prices are estimates, not guarantees — final quote after a free discovery call.
            No surprises, no hidden fees.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
