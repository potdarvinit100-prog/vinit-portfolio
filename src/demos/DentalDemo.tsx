import { useState, type FormEvent } from 'react';
import {
  Smile,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
} from 'lucide-react';
import DemoShell from './DemoShell';
import { DEMOS } from '../lib/site';

const demo = DEMOS.find((d) => d.path === '/demo/dental')!;

const SERVICES = [
  { icon: Sparkles, name: 'Cleaning & Polish', desc: 'Scale, polish & oral health check', price: '$89' },
  { icon: Smile, name: 'Teeth Whitening', desc: 'In-chair whitening, up to 8 shades', price: '$249' },
  { icon: ShieldCheck, name: 'Braces & Aligners', desc: 'Orthodontic plans for teens & adults', price: 'from $1,800' },
  { icon: HeartPulse, name: 'Dental Implants', desc: 'Permanent tooth replacement', price: 'from $950' },
  { icon: CheckCircle2, name: 'Root Canal', desc: 'Painless single-visit treatment', price: 'from $420' },
  { icon: Phone, name: 'Emergency Care', desc: 'Same-day appointments available', price: '$75' },
];

const WHY = [
  { icon: ShieldCheck, title: 'Gentle-first dentistry', desc: 'Pain-free techniques and clear pricing before we start.' },
  { icon: Sparkles, title: 'Modern equipment', desc: 'Digital X-rays, 3D scans, single-visit crowns.' },
  { icon: HeartPulse, title: 'All ages welcome', desc: 'From first checkups to full-mouth restoration.' },
];

const FAQS = [
  { q: 'Do you accept insurance?', a: 'Yes — we work with most major dental plans and handle the paperwork for you. We also offer payment plans for larger treatments.' },
  { q: 'Does treatment hurt?', a: 'We use modern anesthetics and gentle techniques. Most patients are surprised how comfortable cleanings, fillings, and even root canals feel.' },
  { q: 'How fast can I get an appointment?', a: 'Routine visits are usually available within a week, and we keep same-day slots for emergencies. Request a time below and we confirm within 2 hours.' },
];

const inputCls =
  'w-full rounded-lg border border-sky-200 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500';

export default function DentalDemo() {
  const [form, setForm] = useState({ name: '', phone: '', service: 'Cleaning & Polish', date: '', time: '', notes: '' });
  const [done, setDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <DemoShell demo={demo}>
      <div className="bg-white text-slate-800" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {/* Nav */}
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="font-extrabold text-2xl tracking-tight text-sky-700" style={{ fontFamily: "'Syne', sans-serif" }}>
            Brightline <span className="text-sky-500">Dental</span>
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-500">
            <a href="#services" className="hover:text-sky-600">Services</a>
            <a href="#why" className="hover:text-sky-600">Why Us</a>
            <a href="#faq" className="hover:text-sky-600">FAQ</a>
          </div>
          <a href="#book" className="bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-sky-700 transition">
            Book Appointment
          </a>
        </nav>

        {/* Hero */}
        <header className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-cyan-50">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-sky-200/50 blur-3xl" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sky-600 font-semibold tracking-[0.25em] uppercase text-sm mb-4">Family &amp; cosmetic dentistry</p>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                A healthier smile, <span className="text-sky-600">without the anxiety.</span>
              </h1>
              <p className="text-lg text-slate-500 mb-8 max-w-md">
                Gentle, transparent, modern dentistry — from six-month cleanings to complete smile makeovers.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#book" className="bg-sky-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-sky-700 transition">Request Appointment</a>
                <a href="#services" className="border-2 border-sky-200 text-sky-700 font-semibold px-8 py-4 rounded-full hover:border-sky-600 transition">Our Services</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-600" aria-hidden /> 210 Smile Avenue</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-600" aria-hidden /> Mon–Sat · 8:00 – 20:00</span>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-sky-400 via-sky-500 to-cyan-400 flex items-center justify-center shadow-2xl">
                <Smile className="w-28 h-28 text-white/90" aria-hidden />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-3 border border-sky-100">
                <ShieldCheck className="w-8 h-8 text-sky-600" aria-hidden />
                <div>
                  <p className="font-bold text-lg text-slate-900">5,000+ smiles</p>
                  <p className="text-sm text-slate-500">cared for every year</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Services */}
        <section id="services" className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2 text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>Services &amp; Pricing</h2>
          <p className="text-slate-500 mb-10">Transparent pricing, confirmed before treatment begins.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ icon: Icon, name, desc, price }) => (
              <div key={name} className="rounded-2xl border border-sky-100 bg-sky-50/50 p-7 hover:shadow-lg hover:border-sky-300 transition">
                <div className="bg-sky-600 w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-white" aria-hidden />
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{name}</h3>
                <p className="text-slate-500 text-sm mb-4">{desc}</p>
                <p className="font-extrabold text-sky-700 text-xl">{price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="bg-sky-600 py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {WHY.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-white">
                <Icon className="w-10 h-10 mb-4 text-sky-100" aria-hidden />
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-sky-100/90">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Booking */}
        <section id="book" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-extrabold mb-2 text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>Request an Appointment</h2>
          <p className="text-slate-500 mb-8">Tell us what you need — we confirm within 2 hours.</p>
          {done ? (
            <div className="rounded-2xl border border-sky-200 bg-sky-50 p-10 text-center" role="status">
              <CheckCircle2 className="w-14 h-14 text-sky-600 mx-auto mb-4" aria-hidden />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Request received!</h3>
              <p className="text-slate-600">
                Thanks, {form.name}. We&apos;ll call {form.phone} shortly to confirm your {form.service} appointment
                {form.date && <> on {form.date}</>}{form.time && <> at {form.time}</>}.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="rounded-2xl border border-sky-100 bg-white shadow-sm p-8 grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="dent-name" className="block font-semibold mb-1.5 text-sm text-slate-700">Name</label>
                <input id="dent-name" required value={form.name} onChange={set('name')} placeholder="Your name" className={inputCls} />
              </div>
              <div>
                <label htmlFor="dent-phone" className="block font-semibold mb-1.5 text-sm text-slate-700">Phone</label>
                <input id="dent-phone" type="tel" required value={form.phone} onChange={set('phone')} placeholder="Phone number" className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="dent-service" className="block font-semibold mb-1.5 text-sm text-slate-700">Service</label>
                <select id="dent-service" value={form.service} onChange={set('service')} className={inputCls}>
                  {SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="dent-date" className="block font-semibold mb-1.5 text-sm text-slate-700">Preferred date</label>
                <input id="dent-date" type="date" value={form.date} onChange={set('date')} className={inputCls} />
              </div>
              <div>
                <label htmlFor="dent-time" className="block font-semibold mb-1.5 text-sm text-slate-700">Preferred time</label>
                <input id="dent-time" type="time" value={form.time} onChange={set('time')} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="dent-notes" className="block font-semibold mb-1.5 text-sm text-slate-700">Notes <span className="text-slate-400 font-normal">(optional)</span></label>
                <textarea id="dent-notes" rows={3} value={form.notes} onChange={set('notes')} placeholder="Symptoms, concerns, insurance info…" className={inputCls} />
              </div>
              <button type="submit" className="sm:col-span-2 bg-sky-600 text-white font-semibold py-3.5 rounded-xl hover:bg-sky-700 transition">
                Request Appointment
              </button>
            </form>
          )}
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-3xl mx-auto px-6 pb-20">
          <h2 className="text-4xl font-extrabold mb-8 text-slate-900" style={{ fontFamily: "'Syne', sans-serif" }}>Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border border-sky-100 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900 hover:bg-sky-50/60 transition"
                  >
                    {f.q}
                    <ChevronDown className={`w-5 h-5 text-sky-600 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                  </button>
                  {open && <p className="px-6 pb-6 text-slate-500">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-8">
          <p className="text-center text-sm text-slate-400">© 2026 Brightline Dental · Concept demo — fictional branding, built to show what&apos;s possible.</p>
        </footer>
      </div>
    </DemoShell>
  );
}
