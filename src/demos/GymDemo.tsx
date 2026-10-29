import { useState, type FormEvent } from 'react';
import {
  Dumbbell,
  Zap,
  Trophy,
  Users,
  CheckCircle2,
  MapPin,
  BadgeCheck,
} from 'lucide-react';
import DemoShell from './DemoShell';
import { DEMOS } from '../lib/site';

const demo = DEMOS.find((d) => d.path === '/demo/gym')!;

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SCHEDULE: Record<string, { time: string; cls: string; trainer: string; spots: number }[]> = {
  Mon: [
    { time: '06:00', cls: 'Iron Strength', trainer: 'Coach Rivera', spots: 8 },
    { time: '12:15', cls: 'Lunch Burn HIIT', trainer: 'Coach Okafor', spots: 12 },
    { time: '18:30', cls: 'Boxing Basics', trainer: 'Coach Kim', spots: 6 },
  ],
  Tue: [
    { time: '07:00', cls: 'Powerlifting Club', trainer: 'Coach Rivera', spots: 10 },
    { time: '17:30', cls: 'Mobility Flow', trainer: 'Coach Lane', spots: 15 },
    { time: '19:00', cls: 'Kettlebell Circuit', trainer: 'Coach Okafor', spots: 9 },
  ],
  Wed: [
    { time: '06:00', cls: 'Iron Strength', trainer: 'Coach Rivera', spots: 8 },
    { time: '12:15', cls: 'Core Crusher', trainer: 'Coach Lane', spots: 14 },
    { time: '18:30', cls: 'MMA Conditioning', trainer: 'Coach Kim', spots: 7 },
  ],
  Thu: [
    { time: '07:00', cls: 'Olympic Lifting', trainer: 'Coach Rivera', spots: 8 },
    { time: '17:30', cls: 'Spin & Sprint', trainer: 'Coach Okafor', spots: 16 },
    { time: '19:00', cls: 'Boxing Basics', trainer: 'Coach Kim', spots: 6 },
  ],
  Fri: [
    { time: '06:00', cls: 'Iron Strength', trainer: 'Coach Rivera', spots: 8 },
    { time: '12:15', cls: 'Lunch Burn HIIT', trainer: 'Coach Okafor', spots: 12 },
    { time: '18:00', cls: 'Fight Night Sparring', trainer: 'Coach Kim', spots: 5 },
  ],
  Sat: [
    { time: '09:00', cls: 'Weekend Warrior WOD', trainer: 'Coach Okafor', spots: 20 },
    { time: '11:00', cls: 'Olympic Lifting', trainer: 'Coach Rivera', spots: 10 },
    { time: '16:00', cls: 'Open Mat', trainer: 'All coaches', spots: 30 },
  ],
  Sun: [
    { time: '10:00', cls: 'Recovery Yoga', trainer: 'Coach Lane', spots: 18 },
    { time: '12:00', cls: 'Kettlebell Circuit', trainer: 'Coach Okafor', spots: 12 },
  ],
};

const TIERS = [
  { name: 'Off-Peak', monthly: 29, yearly: 279, perks: ['Gym floor 9–5', 'Locker room', 'App tracking'] },
  { name: 'All-Access', monthly: 49, yearly: 469, perks: ['24/7 access', 'All classes', 'Sauna', 'Guest passes x2'] },
  { name: 'Forge Elite', monthly: 79, yearly: 749, perks: ['Everything in All-Access', '1 PT session / month', 'Nutrition plan', 'Recovery zone'] },
];

const inputCls =
  'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#c6ff3d]';

export default function GymDemo() {
  const [day, setDay] = useState('Mon');
  const [yearly, setYearly] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', goal: 'Build strength' });
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <DemoShell demo={demo}>
      <div className="bg-[#0b0b0e] text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-extrabold text-2xl tracking-tight uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
            Forge <span className="text-[#c6ff3d]">Athletics</span>
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-white/60 uppercase tracking-wider">
            <a href="#schedule" className="hover:text-[#c6ff3d]">Schedule</a>
            <a href="#pricing" className="hover:text-[#c6ff3d]">Membership</a>
            <a href="#trial" className="hover:text-[#c6ff3d]">Free Trial</a>
          </div>
          <a href="#trial" className="bg-[#c6ff3d] text-black text-sm font-bold px-5 py-2.5 rounded-full hover:brightness-110 transition uppercase tracking-wide">
            Try Free
          </a>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#1d2b0a,#0b0b0e_65%)]" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="inline-flex items-center gap-2 bg-[#c6ff3d]/10 border border-[#c6ff3d]/40 text-[#c6ff3d] rounded-full px-4 py-1.5 text-sm font-semibold mb-6 uppercase tracking-widest">
              <Zap className="w-4 h-4" aria-hidden /> No excuses. Just results.
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.95] mb-6 uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
              Forge your<br /><span className="text-[#c6ff3d]">strongest self.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-xl mb-10">
              24/7 iron paradise. Expert coaches, 40+ weekly classes, and a community that shows up.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#trial" className="bg-[#c6ff3d] text-black font-bold px-8 py-4 rounded-full hover:brightness-110 transition uppercase tracking-wide">Start Free Trial</a>
              <a href="#pricing" className="border-2 border-white/25 font-semibold px-8 py-4 rounded-full hover:border-[#c6ff3d] hover:text-[#c6ff3d] transition uppercase tracking-wide">See Plans</a>
            </div>
            <div className="mt-12 grid grid-cols-3 max-w-lg gap-6">
              {[
                { n: '40+', l: 'Weekly classes' },
                { n: '12', l: 'Pro coaches' },
                { n: '2k', l: 'Members' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-4xl font-extrabold text-[#c6ff3d]">{s.n}</p>
                  <p className="text-white/50 text-sm uppercase tracking-wider">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Schedule */}
        <section id="schedule" className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2 uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>Class Schedule</h2>
          <p className="text-white/60 mb-8 flex items-center gap-2"><MapPin className="w-4 h-4 text-[#c6ff3d]" aria-hidden /> Forge Athletics HQ · updated weekly</p>
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2" role="tablist" aria-label="Day filter">
            {DAYS.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={day === d}
                onClick={() => setDay(d)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition ${
                  day === d ? 'bg-[#c6ff3d] text-black' : 'bg-white/5 border border-white/15 text-white/70 hover:border-[#c6ff3d] hover:text-[#c6ff3d]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div role="tabpanel" className="grid md:grid-cols-3 gap-4">
            {SCHEDULE[day].map((c) => (
              <div key={`${c.time}-${c.cls}`} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#c6ff3d]/60 transition">
                <p className="text-[#c6ff3d] font-mono font-bold text-lg mb-2">{c.time}</p>
                <h3 className="font-bold text-xl mb-1 uppercase tracking-wide">{c.cls}</h3>
                <p className="text-white/55 text-sm mb-4">{c.trainer}</p>
                <p className="inline-flex items-center gap-1.5 text-sm bg-[#c6ff3d]/10 text-[#c6ff3d] px-3 py-1 rounded-full font-semibold">
                  <Users className="w-4 h-4" aria-hidden /> {c.spots} spots left
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-y border-white/10 bg-[#101014] py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
              <h2 className="text-4xl font-extrabold uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>Membership</h2>
              <div className="flex items-center gap-3 bg-white/5 border border-white/15 rounded-full p-1.5">
                <button
                  type="button"
                  onClick={() => setYearly(false)}
                  aria-pressed={!yearly}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition ${!yearly ? 'bg-[#c6ff3d] text-black' : 'text-white/60'}`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setYearly(true)}
                  aria-pressed={yearly}
                  className={`px-5 py-2 rounded-full font-semibold text-sm transition ${yearly ? 'bg-[#c6ff3d] text-black' : 'text-white/60'}`}
                >
                  Yearly · save 20%
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {TIERS.map((t, i) => (
                <div
                  key={t.name}
                  className={`rounded-2xl p-8 border ${i === 1 ? 'border-[#c6ff3d] bg-[#c6ff3d]/5' : 'border-white/10 bg-white/5'}`}
                >
                  {i === 1 && (
                    <p className="inline-flex items-center gap-1.5 bg-[#c6ff3d] text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                      <Trophy className="w-3.5 h-3.5" aria-hidden /> Most popular
                    </p>
                  )}
                  <h3 className="font-bold text-xl uppercase tracking-wide mb-2">{t.name}</h3>
                  <p className="mb-6">
                    <span className="text-5xl font-extrabold">${yearly ? t.yearly : t.monthly}</span>
                    <span className="text-white/50">/{yearly ? 'yr' : 'mo'}</span>
                  </p>
                  <ul className="space-y-3 mb-8">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-white/70 text-sm">
                        <BadgeCheck className="w-4 h-4 text-[#c6ff3d] flex-shrink-0" aria-hidden /> {p}
                      </li>
                    ))}
                  </ul>
                  <a href="#trial" className={`block text-center font-bold py-3.5 rounded-xl transition uppercase tracking-wide ${i === 1 ? 'bg-[#c6ff3d] text-black hover:brightness-110' : 'border border-white/25 hover:border-[#c6ff3d] hover:text-[#c6ff3d]'}`}>
                    Choose {t.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Free trial */}
        <section id="trial" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2 uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>Free 7-Day Trial</h2>
          <p className="text-white/60 mb-8">Full gym access + 2 classes. No card required.</p>
          {done ? (
            <div className="bg-white/5 border border-[#c6ff3d]/60 rounded-2xl p-10 text-center" role="status">
              <CheckCircle2 className="w-14 h-14 text-[#c6ff3d] mx-auto mb-4" aria-hidden />
              <h3 className="text-2xl font-bold mb-2">You&apos;re in, {form.name}!</h3>
              <p className="text-white/65">
                Your 7-day trial is ready. We&apos;ll text {form.phone} with your entry pass and a plan
                tailored to your goal: {form.goal}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-8 grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="gym-name" className="block font-semibold mb-1.5 text-sm uppercase tracking-wider">Name</label>
                <input id="gym-name" required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="gym-phone" className="block font-semibold mb-1.5 text-sm uppercase tracking-wider">Phone</label>
                <input id="gym-phone" type="tel" required value={form.phone} onChange={set('phone')} placeholder="Phone number" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="gym-goal" className="block font-semibold mb-1.5 text-sm uppercase tracking-wider">Primary goal</label>
                <select id="gym-goal" value={form.goal} onChange={set('goal')} className={inputCls}>
                  {['Build strength', 'Lose weight', 'Learn boxing', 'General fitness'].map((g) => <option key={g} value={g} className="text-black">{g}</option>)}
                </select>
              </div>
              <button type="submit" className="sm:col-span-2 bg-[#c6ff3d] text-black font-bold py-3.5 rounded-xl hover:brightness-110 transition uppercase tracking-wide flex items-center justify-center gap-2">
                <Dumbbell className="w-5 h-5" aria-hidden /> Claim My Free Week
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8">
          <p className="text-center text-sm text-white/50">© 2026 Forge Athletics · Concept demo — fictional branding, built to show what&apos;s possible.</p>
        </footer>
      </div>
    </DemoShell>
  );
}
