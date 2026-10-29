import { useState, type FormEvent } from 'react';
import {
  Flame,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  ChefHat,
  Wine,
} from 'lucide-react';
import DemoShell from './DemoShell';
import { DEMOS } from '../lib/site';

const demo = DEMOS.find((d) => d.path === '/demo/restaurant')!;

type Category = 'Starters' | 'Mains' | 'Desserts' | 'Drinks';

const MENU: Record<Category, { name: string; desc: string; price: string }[]> = {
  Starters: [
    { name: 'Charred Sourdough', desc: 'Smoked garlic butter, rosemary salt', price: '$9' },
    { name: 'Burrata & Figs', desc: 'Balsamic pearls, basil oil', price: '$16' },
    { name: 'Fire-Roasted Beets', desc: 'Goat cheese, pistachio, honey', price: '$13' },
    { name: 'Tuna Crudo', desc: 'Citrus, chili, olive oil', price: '$18' },
  ],
  Mains: [
    { name: 'Oak-Fired Ribeye', desc: '28-day aged, bone-marrow butter', price: '$42' },
    { name: 'Ember Chicken', desc: 'Half bird, smoked paprika glaze', price: '$28' },
    { name: 'Wild Mushroom Risotto', desc: 'Truffle pecorino, crispy sage', price: '$24' },
    { name: 'Charred Salmon', desc: 'Miso glaze, charred greens', price: '$32' },
  ],
  Desserts: [
    { name: 'Burnt Basque Cheesecake', desc: 'Smoked caramel', price: '$12' },
    { name: 'Dark Chocolate Tart', desc: 'Sea salt, olive oil', price: '$11' },
    { name: 'Wood-Oven Pears', desc: 'Almond frangipane, chantilly', price: '$10' },
  ],
  Drinks: [
    { name: 'Smoked Old Fashioned', desc: 'Oak smoke, demerara, bitters', price: '$15' },
    { name: 'Ember Negroni', desc: 'Charred orange, barrel gin', price: '$14' },
    { name: 'House Red — Montepulciano', desc: 'Glass / bottle', price: '$13 / $58' },
  ],
};

const SPECIALS = [
  { icon: ChefHat, title: "Chef's Tasting Menu", desc: 'Seven courses from the fire · $85 per guest' },
  { icon: Flame, title: 'Sunday Roast', desc: 'Slow-roasted cuts, all the trimmings · $29' },
  { icon: Wine, title: 'Wine Pairing Flight', desc: 'Three pours chosen by our sommelier · $25' },
];

const TIMES = ['12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00'];

const inputCls =
  'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#ff6b35]';

export default function RestaurantDemo() {
  const [tab, setTab] = useState<Category>('Starters');
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '19:00', party: '2', occasion: '' });
  const [ref, setRef] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setRef(`EO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
  };

  return (
    <DemoShell demo={demo}>
      <div className="bg-[#120b08] text-[#f5ede4]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-extrabold text-2xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Ember <span className="text-[#ff6b35]">&amp;</span> Oak
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
            <a href="#menu" className="hover:text-[#ff6b35]">Menu</a>
            <a href="#specials" className="hover:text-[#ff6b35]">Specials</a>
            <a href="#booking" className="hover:text-[#ff6b35]">Book a Table</a>
          </div>
          <a href="#booking" className="bg-[#ff6b35] text-[#120b08] text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition">
            Reserve
          </a>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2a130a] via-[#120b08] to-[#120b08]" aria-hidden />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[#ff6b35]/15 blur-3xl" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
            <div className="inline-flex items-center gap-2 border border-[#ff6b35]/40 text-[#ff6b35] rounded-full px-4 py-1.5 text-sm mb-6">
              <Flame className="w-4 h-4" aria-hidden /> Wood-fired · Open late
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              Dinner, <span className="text-[#ff6b35]">straight from the fire.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              Oak-fired steaks, ember-roasted vegetables, and a wine list built for slow evenings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#booking" className="bg-[#ff6b35] text-[#120b08] font-bold px-8 py-4 rounded-full hover:brightness-110 transition">Book a Table</a>
              <a href="#menu" className="border-2 border-white/25 font-semibold px-8 py-4 rounded-full hover:border-[#ff6b35] hover:text-[#ff6b35] transition">Explore the Menu</a>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-white/60">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#ff6b35]" aria-hidden /> 88 Ember Street</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#ff6b35]" aria-hidden /> Tue–Sun · 12:00 – 23:00</span>
            </div>
          </div>
        </header>

        {/* Specials strip */}
        <section id="specials" className="border-y border-white/10 bg-[#1a0f0a]">
          <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-6">
            {SPECIALS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 items-start">
                <div className="bg-[#ff6b35]/15 p-3 rounded-xl">
                  <Icon className="w-6 h-6 text-[#ff6b35]" aria-hidden />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                    {title} <Star className="w-4 h-4 text-[#ff6b35]" aria-hidden />
                  </h3>
                  <p className="text-white/60 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Menu */}
        <section id="menu" className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-8 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>The Menu</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist" aria-label="Menu categories">
            {(Object.keys(MENU) as Category[]).map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`px-6 py-2.5 rounded-full font-semibold transition ${
                  tab === id ? 'bg-[#ff6b35] text-[#120b08]' : 'border border-white/20 text-white/70 hover:border-[#ff6b35] hover:text-[#ff6b35]'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="grid md:grid-cols-2 gap-5">
            {MENU[tab].map((item) => (
              <div key={item.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between gap-4 hover:border-[#ff6b35]/50 transition">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-white/55 text-sm">{item.desc}</p>
                </div>
                <span className="font-extrabold text-[#ff6b35] whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Booking */}
        <section id="booking" className="bg-[#1a0f0a] border-t border-white/10 py-20">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Book a Table</h2>
            <p className="text-white/60 mb-8">We hold every reservation for 20 minutes past the hour.</p>
            {ref ? (
              <div className="bg-white/5 border border-[#ff6b35]/50 rounded-2xl p-10 text-center" role="status">
                <CheckCircle2 className="w-14 h-14 text-[#ff6b35] mx-auto mb-4" aria-hidden />
                <h3 className="text-2xl font-bold mb-2">You&apos;re booked!</h3>
                <p className="text-white/65 mb-4">
                  {form.name}, table for {form.party} on {form.date} at {form.time}. We&apos;ll text {form.phone} to confirm.
                </p>
                <p className="inline-block bg-[#ff6b35]/15 text-[#ff6b35] font-mono font-bold px-5 py-2.5 rounded-xl tracking-widest">
                  Ref: {ref}
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-8 grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="rest-name" className="block font-semibold mb-1.5 text-sm">Name</label>
                  <input id="rest-name" required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="rest-phone" className="block font-semibold mb-1.5 text-sm">Phone</label>
                  <input id="rest-phone" type="tel" required value={form.phone} onChange={set('phone')} placeholder="Phone number" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="rest-date" className="block font-semibold mb-1.5 text-sm">Date</label>
                  <input id="rest-date" type="date" required value={form.date} onChange={set('date')} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="rest-time" className="block font-semibold mb-1.5 text-sm">Time</label>
                  <select id="rest-time" value={form.time} onChange={set('time')} className={inputCls}>
                    {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="rest-party" className="block font-semibold mb-1.5 text-sm">Party size</label>
                  <select id="rest-party" value={form.party} onChange={set('party')} className={inputCls}>
                    {['1','2','3','4','5','6','7','8+'].map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="rest-occasion" className="block font-semibold mb-1.5 text-sm">Occasion <span className="text-white/40 font-normal">(optional)</span></label>
                  <input id="rest-occasion" value={form.occasion} onChange={set('occasion')} placeholder="Birthday, anniversary…" className={inputCls} />
                </div>
                <button type="submit" className="sm:col-span-2 bg-[#ff6b35] text-[#120b08] font-bold py-3.5 rounded-xl hover:brightness-110 transition">
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
          <p className="text-center text-sm text-white/50">© 2026 Ember &amp; Oak · Concept demo — fictional branding, built to show what&apos;s possible.</p>
        </footer>
      </div>
    </DemoShell>
  );
}
