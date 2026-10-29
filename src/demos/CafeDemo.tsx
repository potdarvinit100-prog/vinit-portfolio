import { useState, type FormEvent } from 'react';
import {
  Coffee,
  Croissant,
  CakeSlice,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import DemoShell from './DemoShell';
import { DEMOS } from '../lib/site';

const demo = DEMOS.find((d) => d.path === '/demo/cafe')!;

type Category = 'Espresso' | 'Brunch' | 'Desserts';

const MENU: Record<Category, { name: string; desc: string; price: string }[]> = {
  Espresso: [
    { name: 'Classic Espresso', desc: 'Double shot, rich crema', price: '$3.50' },
    { name: 'Oat Milk Latte', desc: 'Silky steamed oat milk', price: '$5.00' },
    { name: 'Honey Cortado', desc: 'Espresso + honey + steamed milk', price: '$5.50' },
    { name: 'Cold Brew Tonic', desc: 'Slow-steeped over citrus tonic', price: '$6.00' },
  ],
  Brunch: [
    { name: 'Shakshuka Toast', desc: 'Spiced eggs, sourdough', price: '$11.00' },
    { name: 'Ricotta Hotcakes', desc: 'Lemon ricotta, maple syrup', price: '$12.50' },
    { name: 'Avocado Rye', desc: 'Smashed avo, chili flakes, seeds', price: '$10.00' },
    { name: 'Breakfast Burrito', desc: 'Scrambled egg, black beans, salsa', price: '$9.50' },
  ],
  Desserts: [
    { name: 'Tiramisu Cup', desc: 'Espresso-soaked ladyfingers', price: '$7.00' },
    { name: 'Basque Cheesecake', desc: 'Burnt top, creamy center', price: '$8.00' },
    { name: 'Affogato', desc: 'Vanilla gelato drowned in espresso', price: '$6.50' },
    { name: 'Cardamom Bun', desc: 'Swedish-style, baked daily', price: '$4.50' },
  ],
};

const TABS: { id: Category; icon: typeof Coffee }[] = [
  { id: 'Espresso', icon: Coffee },
  { id: 'Brunch', icon: Croissant },
  { id: 'Desserts', icon: CakeSlice },
];

const GALLERY = [
  { title: 'The Pour', grad: 'from-amber-700 to-amber-950', icon: Coffee },
  { title: 'Morning Bake', grad: 'from-orange-400 to-amber-700', icon: Croissant },
  { title: 'Sweet Endings', grad: 'from-rose-400 to-amber-800', icon: CakeSlice },
  { title: 'Sunny Corner', grad: 'from-yellow-300 to-orange-500', icon: MapPin },
];

const inputCls =
  'w-full rounded-lg border border-[#3e2f23] bg-white px-4 py-3 text-[#2a1f16] placeholder:text-[#a08c76] focus:outline-none focus:ring-2 focus:ring-[#8a5a33]';

export default function CafeDemo() {
  const [tab, setTab] = useState<Category>('Espresso');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [confirmed, setConfirmed] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  return (
    <DemoShell demo={demo}>
      <div className="bg-[#faf5ec] text-[#2a1f16] font-body" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-extrabold text-2xl tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Brew <span className="text-[#8a5a33]">&amp;</span> Bean
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#menu" className="hover:text-[#8a5a33]">Menu</a>
            <a href="#gallery" className="hover:text-[#8a5a33]">Gallery</a>
            <a href="#reserve" className="hover:text-[#8a5a33]">Reserve</a>
          </div>
          <a href="#reserve" className="bg-[#2a1f16] text-[#faf5ec] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#8a5a33] transition">
            Book a Table
          </a>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8d5b5] via-[#faf5ec] to-[#d9b98f]" aria-hidden />
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#8a5a33]/20 blur-3xl" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#8a5a33] font-semibold tracking-[0.25em] uppercase text-sm mb-4">Est. 2019 · Roasted in-house</p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
                Slow mornings, <span className="text-[#8a5a33]">bold</span> coffee.
              </h1>
              <p className="text-lg text-[#5d4a38] mb-8 max-w-md">
                Single-origin espresso, fresh brunch bakes, and a sunny corner to call your own.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#menu" className="bg-[#2a1f16] text-[#faf5ec] font-semibold px-7 py-3.5 rounded-full hover:bg-[#8a5a33] transition">View Menu</a>
                <a href="#reserve" className="border-2 border-[#2a1f16] font-semibold px-7 py-3.5 rounded-full hover:bg-[#2a1f16] hover:text-[#faf5ec] transition">Reserve a Table</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] bg-gradient-to-br from-[#3e2f23] via-[#8a5a33] to-[#d9a05f] flex items-center justify-center shadow-2xl">
                <Coffee className="w-32 h-32 text-[#faf5ec]/80" aria-hidden />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-[#8a5a33]" aria-hidden />
                <div>
                  <p className="font-bold text-lg">4.9 rating</p>
                  <p className="text-sm text-[#5d4a38]">2,300+ happy regulars</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Info strip */}
        <div className="border-y border-[#e4d6bd] bg-[#f3e9d6]">
          <div className="max-w-7xl mx-auto px-6 py-6 grid sm:grid-cols-3 gap-4 text-sm">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#8a5a33]" aria-hidden /> 12 Roast Lane, Old Town</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#8a5a33]" aria-hidden /> Mon–Sun · 7:00 AM – 9:00 PM</p>
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-[#8a5a33]" aria-hidden /> (555) 014-2210</p>
          </div>
        </div>

        {/* Menu */}
        <section id="menu" className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>The Menu</h2>
          <p className="text-[#5d4a38] mb-8">Fresh daily, priced honestly.</p>
          <div className="flex gap-3 mb-8" role="tablist" aria-label="Menu categories">
            {TABS.map(({ id, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition ${
                  tab === id ? 'bg-[#2a1f16] text-[#faf5ec]' : 'bg-white border border-[#e4d6bd] hover:border-[#8a5a33]'
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden />
                {id}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="grid sm:grid-cols-2 gap-4">
            {MENU[tab].map((item) => (
              <div key={item.name} className="bg-white rounded-2xl p-6 border border-[#efe3cd] shadow-sm flex justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-[#5d4a38] text-sm">{item.desc}</p>
                </div>
                <span className="font-extrabold text-[#8a5a33] whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="bg-[#2a1f16] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-8 text-[#faf5ec]" style={{ fontFamily: "'Syne', sans-serif" }}>The Vibe</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {GALLERY.map(({ title, grad, icon: Icon }) => (
                <div key={title} className={`aspect-square rounded-2xl bg-gradient-to-br ${grad} flex flex-col items-center justify-center gap-3 text-white`}>
                  <Icon className="w-10 h-10" aria-hidden />
                  <span className="font-semibold text-sm">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation */}
        <section id="reserve" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Reserve a Table</h2>
          <p className="text-[#5d4a38] mb-8">We&apos;ll confirm within the hour.</p>
          {confirmed ? (
            <div className="bg-white rounded-2xl border border-[#e4d6bd] p-10 text-center shadow-sm" role="status">
              <CheckCircle2 className="w-14 h-14 text-[#8a5a33] mx-auto mb-4" aria-hidden />
              <h3 className="text-2xl font-bold mb-2">Table reserved!</h3>
              <p className="text-[#5d4a38]">
                Thanks, {name}. We&apos;ll hold a table for {guests} on {date} at {time}. A confirmation is on its way.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white rounded-2xl border border-[#e4d6bd] p-8 shadow-sm grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label htmlFor="cafe-name" className="block font-semibold mb-1.5 text-sm">Name</label>
                <input id="cafe-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="cafe-date" className="block font-semibold mb-1.5 text-sm">Date</label>
                <input id="cafe-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="cafe-time" className="block font-semibold mb-1.5 text-sm">Time</label>
                <input id="cafe-time" type="time" required value={time} onChange={(e) => setTime(e.target.value)} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cafe-guests" className="block font-semibold mb-1.5 text-sm">Guests</label>
                <select id="cafe-guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={inputCls}>
                  {['1', '2', '3', '4', '5', '6+'].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <button type="submit" className="sm:col-span-2 bg-[#2a1f16] text-[#faf5ec] font-semibold py-3.5 rounded-xl hover:bg-[#8a5a33] transition">
                Confirm Reservation
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e4d6bd] py-8">
          <p className="text-center text-sm text-[#5d4a38]">© 2026 Brew &amp; Bean · Concept demo — fictional branding, built to show what&apos;s possible.</p>
        </footer>
      </div>
    </DemoShell>
  );
}
