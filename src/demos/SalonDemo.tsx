import { useState, type FormEvent } from 'react';
import {
  Scissors,
  Sparkles,
  CheckCircle2,
  MapPin,
  Star,
  CalendarCheck,
} from 'lucide-react';
import DemoShell from './DemoShell';
import { DEMOS } from '../lib/site';

const demo = DEMOS.find((d) => d.path === '/demo/salon')!;

const SERVICES: Record<string, { name: string; price: string; mins: number }[]> = {
  Hair: [
    { name: 'Signature Cut', price: '$45', mins: 45 },
    { name: 'Cut + Wash + Style', price: '$60', mins: 60 },
    { name: 'Kids Cut (under 12)', price: '$25', mins: 30 },
    { name: 'Head Shave', price: '$20', mins: 20 },
  ],
  Beard: [
    { name: 'Beard Sculpt', price: '$30', mins: 30 },
    { name: 'Hot Towel Shave', price: '$40', mins: 40 },
    { name: 'Beard + Cut Combo', price: '$65', mins: 75 },
  ],
  Color: [
    { name: 'Full Color', price: '$95', mins: 120 },
    { name: 'Highlights / Balayage', price: '$130', mins: 150 },
    { name: 'Grey Blending', price: '$55', mins: 60 },
    { name: 'Color + Cut Package', price: '$150', mins: 180 },
  ],
};

const STYLISTS = [
  { name: 'Marcus Reed', role: 'Master Barber', tag: 'Fades & precision cuts' },
  { name: 'Elena Vidal', role: 'Color Specialist', tag: 'Balayage & lived-in color' },
  { name: 'Devon Cole', role: 'Senior Stylist', tag: 'Classic & textured cuts' },
];

const TIMES = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

const inputCls =
  'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-[#f7f3ea] placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#c9a227]';

export default function SalonDemo() {
  const [category, setCategory] = useState<keyof typeof SERVICES>('Hair');
  const [service, setService] = useState('');
  const [stylist, setStylist] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <DemoShell demo={demo}>
      <div className="bg-[#0d0c0a] text-[#f7f3ea]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[#c9a227]/20">
          <span className="font-extrabold text-2xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Velvet <span className="text-[#c9a227]">&amp;</span> Blade
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/60">
            <a href="#services" className="hover:text-[#c9a227]">Services</a>
            <a href="#stylists" className="hover:text-[#c9a227]">Stylists</a>
            <a href="#book" className="hover:text-[#c9a227]">Book</a>
          </div>
          <a href="#book" className="bg-[#c9a227] text-[#0d0c0a] text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition">
            Book Now
          </a>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2a2415,#0d0c0a_70%)]" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#c9a227] tracking-[0.3em] uppercase text-sm mb-5">Premium grooming lounge</p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
                Look sharp. <span className="text-[#c9a227]">Feel sharper.</span>
              </h1>
              <p className="text-white/60 text-lg mb-8 max-w-md">
                Precision cuts, hot-towel shaves, and color work — delivered by artists, not rushed hands.
              </p>
              <a href="#book" className="inline-flex items-center gap-2 bg-[#c9a227] text-[#0d0c0a] font-bold px-8 py-4 rounded-full hover:brightness-110 transition">
                <CalendarCheck className="w-5 h-5" aria-hidden /> Book an Appointment
              </a>
              <div className="mt-10 flex items-center gap-6 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#c9a227]" aria-hidden /> 4.9 · 1,800 reviews</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#c9a227]" aria-hidden /> 45 Groom Street</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Scissors, label: '12k+ cuts delivered' },
                { icon: Sparkles, label: 'Certified colorists' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="aspect-square rounded-2xl bg-gradient-to-br from-[#1c1913] to-[#3a2f18] border border-[#c9a227]/25 flex flex-col items-center justify-center gap-3">
                  <Icon className="w-12 h-12 text-[#c9a227]" aria-hidden />
                  <span className="text-sm text-white/70 px-4 text-center">{label}</span>
                </div>
              ))}
              <div className="col-span-2 rounded-2xl bg-[#c9a227] text-[#0d0c0a] p-6 flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>First visit? 20% off.</p>
                  <p className="text-sm font-medium">Mention VELVET20 at checkout.</p>
                </div>
                <Sparkles className="w-10 h-10" aria-hidden />
              </div>
            </div>
          </div>
        </header>

        {/* Services */}
        <section id="services" className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>Services &amp; Pricing</h2>
          <div className="flex gap-3 mb-10" role="tablist" aria-label="Service categories">
            {(Object.keys(SERVICES) as (keyof typeof SERVICES)[]).map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={category === id}
                onClick={() => { setCategory(id); setService(''); }}
                className={`px-6 py-2.5 rounded-full font-semibold transition ${
                  category === id ? 'bg-[#c9a227] text-[#0d0c0a]' : 'border border-white/20 text-white/70 hover:border-[#c9a227] hover:text-[#c9a227]'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="grid sm:grid-cols-2 gap-4">
            {SERVICES[category].map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setService(s.name)}
                aria-pressed={service === s.name}
                className={`text-left rounded-2xl p-6 border transition ${
                  service === s.name
                    ? 'border-[#c9a227] bg-[#c9a227]/10'
                    : 'border-white/10 bg-white/5 hover:border-[#c9a227]/60'
                }`}
              >
                <div className="flex justify-between items-start gap-3 mb-1">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <span className="font-extrabold text-[#c9a227]">{s.price}</span>
                </div>
                <p className="text-white/50 text-sm">{s.mins} min · click to select</p>
              </button>
            ))}
          </div>
        </section>

        {/* Stylists */}
        <section id="stylists" className="border-y border-[#c9a227]/20 bg-[#14120d] py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-8" style={{ fontFamily: "'Syne', sans-serif" }}>Meet the Stylists</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {STYLISTS.map((s) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setStylist(s.name)}
                  aria-pressed={stylist === s.name}
                  className={`text-left rounded-2xl p-6 border transition ${
                    stylist === s.name ? 'border-[#c9a227] bg-[#c9a227]/10' : 'border-white/10 bg-white/5 hover:border-[#c9a227]/60'
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a227] to-[#7a5f14] flex items-center justify-center font-extrabold text-[#0d0c0a] text-xl mb-4" aria-hidden>
                    {s.name.split(' ').map((w) => w[0]).join('')}
                  </div>
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-[#c9a227] text-sm font-semibold">{s.role}</p>
                  <p className="text-white/50 text-sm mt-1">{s.tag}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Book Your Chair</h2>
          <p className="text-white/60 mb-8">
            {service && stylist ? `Selected: ${service} with ${stylist}. Pick a time.` : 'Tap a service and stylist above, then choose your slot.'}
          </p>
          {done ? (
            <div className="bg-white/5 border border-[#c9a227]/60 rounded-2xl p-10 text-center" role="status">
              <CheckCircle2 className="w-14 h-14 text-[#c9a227] mx-auto mb-4" aria-hidden />
              <h3 className="text-2xl font-bold mb-2">Appointment confirmed!</h3>
              <p className="text-white/65">
                {service || 'Your service'} with {stylist || 'our next available stylist'} on {date} at {time}.
                We&apos;ll see you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-8 grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="salon-service" className="block font-semibold mb-1.5 text-sm">Service</label>
                <select id="salon-service" required value={service} onChange={(e) => setService(e.target.value)} className={inputCls}>
                  <option value="" className="text-black">Choose a service…</option>
                  {(Object.keys(SERVICES) as (keyof typeof SERVICES)[]).flatMap((c) =>
                    SERVICES[c].map((s) => (
                      <option key={s.name} value={s.name} className="text-black">{s.name} — {s.price}</option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label htmlFor="salon-stylist" className="block font-semibold mb-1.5 text-sm">Stylist</label>
                <select id="salon-stylist" value={stylist} onChange={(e) => setStylist(e.target.value)} className={inputCls}>
                  <option value="" className="text-black">No preference</option>
                  {STYLISTS.map((s) => <option key={s.name} value={s.name} className="text-black">{s.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="salon-date" className="block font-semibold mb-1.5 text-sm">Date</label>
                <input id="salon-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="salon-time" className="block font-semibold mb-1.5 text-sm">Time</label>
                <select id="salon-time" required value={time} onChange={(e) => setTime(e.target.value)} className={inputCls}>
                  <option value="" className="text-black">Choose a time…</option>
                  {TIMES.map((t) => <option key={t} value={t} className="text-black">{t}</option>)}
                </select>
              </div>
              <button type="submit" className="sm:col-span-2 bg-[#c9a227] text-[#0d0c0a] font-bold py-3.5 rounded-xl hover:brightness-110 transition">
                Confirm Appointment
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[#c9a227]/20 py-8">
          <p className="text-center text-sm text-white/50">© 2026 Velvet &amp; Blade · Concept demo — fictional branding, built to show what&apos;s possible.</p>
        </footer>
      </div>
    </DemoShell>
  );
}
