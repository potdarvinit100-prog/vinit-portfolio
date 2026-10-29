import { Link } from 'react-router-dom';
import { Container, SectionHeading, Reveal, ConceptBadge } from '../components/ui';
import { DEMOS } from '../lib/site';

const GRADIENTS = [
  'from-amber-500/70 via-orange-700/50 to-ink',
  'from-red-500/70 via-rose-800/50 to-ink',
  'from-fuchsia-500/70 via-purple-800/50 to-ink',
  'from-lime-400/70 via-emerald-700/50 to-ink',
  'from-sky-500/70 via-blue-800/50 to-ink',
];

export default function Showcase() {
  return (
    <section id="work" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="Concept Demos"
          title="Industry Concept Demos"
          sub="Live interactive previews built to show what's possible for your industry. Click any card to explore."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMOS.map((demo, i) => (
            <Reveal key={demo.path} delay={(i % 3) * 0.08}>
              <Link
                to={demo.path}
                className="block glass rounded-2xl overflow-hidden hover:border-lime/60 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <div
                  className={`h-44 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center relative`}
                >
                  <span className="font-display text-4xl font-extrabold text-white/90 tracking-tight px-6 text-center transition-transform duration-700 ease-out group-hover:scale-105">
                    {demo.name}
                  </span>
                  <span className="absolute top-4 left-4">
                    <ConceptBadge />
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-lime text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                    {demo.industry}
                  </p>
                  <h3 className="font-display text-xl font-bold mb-1.5 group-hover:text-lime transition-colors">
                    {demo.name}
                  </h3>
                  <p className="text-white/60 text-sm">{demo.blurb}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="text-white/50 text-sm mt-8 text-center">
            Concept demos with fictional branding — built to show what's possible for your
            industry.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
