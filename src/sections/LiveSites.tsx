import { ExternalLink } from 'lucide-react';
import { Container, SectionHeading, Reveal } from '../components/ui';

const SITES = [
  {
    name: 'Rishi Digital',
    industry: 'Mobile Retail & Repair',
    blurb: 'Mobile accessories store with repair booking, WhatsApp enquiries and reviews — Baner, Pune.',
    url: 'https://rishi-digital.vercel.app/',
    gradient: 'from-amber-500/70 via-orange-700/50 to-ink',
  },
  {
    name: 'Vighnesh Automobile',
    industry: 'Car Service',
    blurb: 'Full car-care site: servicing, detailing, denting & painting with one-tap booking — Baner & Pashan, Pune.',
    url: 'https://vignesh-automobiles.vercel.app/',
    gradient: 'from-sky-500/70 via-blue-800/50 to-ink',
  },
  {
    name: 'M.K. Pro Sports',
    industry: 'Sports Retail',
    blurb: 'Sports equipment store plus badminton arena bookings — Pashan, Pune.',
    url: 'https://m-k-sports-kappa.vercel.app/',
    gradient: 'from-lime-400/70 via-emerald-700/50 to-ink',
  },
  {
    name: 'Optic Glory',
    industry: 'Eye Care',
    blurb: 'Eye-care centre with check-up booking, eyewear catalogue and WhatsApp enquiries — Pashan, Pune.',
    url: 'https://optic-glory.vercel.app/',
    gradient: 'from-fuchsia-500/70 via-purple-800/50 to-ink',
  },
  {
    name: 'Aditi Multispeciality Hospital',
    industry: 'Healthcare',
    blurb: 'Hospital site with 12 departments, doctor profiles and 24×7 emergency — Baner, Pune.',
    url: 'https://aditi-multispeciality-hospital.vercel.app/',
    gradient: 'from-red-500/70 via-rose-800/50 to-ink',
  },
];

export default function LiveSites() {
  return (
    <section id="live-work" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="Live Client Work"
          title="Real Websites, Live Right Now"
          sub="Production sites I built for real local businesses. Click any card to visit the live site."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SITES.map((site, i) => (
            <Reveal key={site.url} delay={(i % 3) * 0.08}>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block glass rounded-2xl overflow-hidden hover:border-lime/60 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              >
                <div
                  className={`h-44 bg-gradient-to-br ${site.gradient} flex items-center justify-center relative`}
                >
                  <span className="font-display text-4xl font-extrabold text-white/90 tracking-tight px-6 text-center transition-transform duration-700 ease-out group-hover:scale-105">
                    {site.name}
                  </span>
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 flex items-center justify-center text-white/80 group-hover:text-lime group-hover:bg-black/60 transition-colors">
                    <ExternalLink size={16} aria-hidden="true" />
                  </span>
                  <span className="absolute top-4 left-4 bg-lime text-black text-[10px] font-extrabold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                    Live
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-lime text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                    {site.industry}
                  </p>
                  <h3 className="font-display text-xl font-bold mb-1.5 group-hover:text-lime transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-white/60 text-sm">{site.blurb}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="text-white/50 text-sm mt-8 text-center">
            Real client builds — each one live and serving customers today.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
