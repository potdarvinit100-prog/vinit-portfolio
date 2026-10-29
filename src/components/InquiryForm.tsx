import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react';
import { SITE, type InquiryPrefill } from '../lib/site';

const BUSINESS_TYPES = [
  'Restaurant/Café',
  'Salon/Beauty',
  'Gym/Fitness',
  'Clinic/Healthcare',
  'Retail',
  'E-commerce',
  'Other',
] as const;

const BUDGETS = ['<$150', '$150–$400', '$400–$1000', '$1000+'] as const;
const TIMELINES = ['ASAP', '1 month', '2–3 months', 'Flexible'] as const;

const API_URL = import.meta.env.VITE_API_URL || '';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  websiteUrl: string;
  requirements: string;
  features: string;
  budget: string;
  timeline: string;
  details: string;
  website: string; // honeypot
}

const EMPTY: FormValues = {
  name: '',
  email: '',
  phone: '',
  businessName: '',
  businessType: '',
  websiteUrl: '',
  requirements: '',
  features: '',
  budget: '',
  timeline: '',
  details: '',
  website: '',
};

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'contact' | 'requirements', string>>;

function validate(v: FormValues): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  const email = v.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'That email address does not look right.';
  }
  if (!email && !v.phone.trim()) {
    errors.contact = 'Please add an email or a phone number so Vinit can reach you.';
  }
  if (v.requirements.trim().length < 10) {
    errors.requirements = 'Tell us a little more (at least 10 characters).';
  }
  return errors;
}

function budgetFor(prefill: string): string {
  const t = prefill.toLowerCase().replace(/,/g, '');
  if (t.includes('1000+') || t.includes('$1000+')) return '$1000+';
  const m = t.match(/(\d+(?:\.\d+)?)\s*k?/);
  if (m) {
    let n = parseFloat(m[1]);
    if (t.includes('k')) n *= 1000;
    if (n < 150) return '<$150';
    if (n < 400) return '$150–$400';
    if (n < 1000) return '$400–$1000';
    return '$1000+';
  }
  return '';
}

function composeWhatsAppText(v: FormValues): string {
  const lines = ['New project inquiry (via portfolio form)'];
  lines.push(`Name: ${v.name}`);
  const contact = [v.email.trim(), v.phone.trim()].filter(Boolean).join(' / ');
  if (contact) lines.push(`Contact: ${contact}`);
  if (v.businessName.trim()) lines.push(`Business: ${v.businessName.trim()}`);
  if (v.businessType) lines.push(`Type: ${v.businessType}`);
  if (v.websiteUrl.trim()) lines.push(`Current website: ${v.websiteUrl.trim()}`);
  lines.push(`Requirements: ${v.requirements.trim()}`);
  if (v.features.trim()) lines.push(`Features: ${v.features.trim()}`);
  if (v.budget) lines.push(`Budget: ${v.budget}`);
  if (v.timeline) lines.push(`Timeline: ${v.timeline}`);
  if (v.details.trim()) lines.push(`Details: ${v.details.trim()}`);
  return lines.join('\n');
}

const inputCls =
  'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-lime/60 transition-colors';
const labelCls = 'block text-xs font-semibold tracking-wider uppercase text-white/55 mb-2';
const errorCls = 'mt-1.5 text-xs text-red-400';

export default function InquiryForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState(false);

  // Prefill from the chatbot (or any other caller) via CustomEvent.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<InquiryPrefill>).detail ?? {};
      setValues((prev) => {
        const next = { ...prev };
        if (detail.name) next.name = detail.name;
        if (detail.business) next.businessName = detail.business;
        if (detail.industry) {
          const match = BUSINESS_TYPES.find(
            (t) => t.toLowerCase() === detail.industry!.toLowerCase()
          );
          if (match) {
            next.businessType = match;
          } else {
            next.details = [next.details, `Business type: ${detail.industry}`]
              .filter(Boolean)
              .join('\n');
          }
        }
        if (detail.packageName) {
          const line = `Interested in: ${detail.packageName}`;
          if (!next.details.includes(line)) {
            next.details = [next.details, line].filter(Boolean).join('\n');
          }
        }
        if (detail.budget) {
          const b = budgetFor(detail.budget);
          if (b) next.budget = b;
        }
        if (detail.message) {
          if (!next.requirements) next.requirements = detail.message;
          else next.details = [next.details, detail.message].filter(Boolean).join('\n');
        }
        return next;
      });
      setSent(false);
      setFallbackNotice(false);
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('vinit:open-inquiry', onOpen);
    return () => window.removeEventListener('vinit:open-inquiry', onOpen);
  }, []);

  const set = (key: keyof FormValues) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Honeypot: pretend success without sending anything.
    if (values.website.trim()) {
      setSent(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim() || undefined,
          phone: values.phone.trim() || undefined,
          businessName: values.businessName.trim() || undefined,
          businessType: values.businessType || undefined,
          websiteUrl: values.websiteUrl.trim() || undefined,
          requirements: values.requirements.trim(),
          features: values.features.trim() || undefined,
          budget: values.budget || undefined,
          timeline: values.timeline || undefined,
          details: values.details.trim() || undefined,
          source: 'portfolio-form',
        }),
      });
      if (!res.ok) throw new Error(`Backend responded ${res.status}`);
      setSent(true);
    } catch {
      // Backend unreachable: fall back to WhatsApp with the full request.
      const url = `https://wa.me/918262920550?text=${encodeURIComponent(composeWhatsAppText(values))}`;
      window.open(url, '_blank', 'noopener');
      setFallbackNotice(true);
      setSent(true);
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="glass rounded-3xl p-10 md:p-14 text-center">
        <CheckCircle2 className="w-14 h-14 text-lime mx-auto mb-5" strokeWidth={1.8} />
        <h3 className="font-display text-3xl font-extrabold text-white mb-3">
          Request received — Vinit will reply soon
        </h3>
        <p className="text-white/60 max-w-md mx-auto mb-8">
          {fallbackNotice
            ? 'Backend unreachable — opening WhatsApp with your request instead.'
            : 'Thanks for reaching out. Your project details are on their way to Vinit.'}
        </p>
        <a
          href={SITE.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-lime text-ink font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2.2} />
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="glass rounded-3xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      {/* Honeypot — visually hidden, real users never fill this. */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={set('website')}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 h-0 w-0 pointer-events-none"
      />

      <div>
        <label htmlFor="inq-name" className={labelCls}>
          Your name *
        </label>
        <input
          id="inq-name"
          value={values.name}
          onChange={set('name')}
          placeholder="Vinit"
          className={inputCls}
        />
        {errors.name && <p className={errorCls}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="inq-business" className={labelCls}>
          Business name
        </label>
        <input
          id="inq-business"
          value={values.businessName}
          onChange={set('businessName')}
          placeholder="Brew & Bean"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="inq-email" className={labelCls}>
          Email
        </label>
        <input
          id="inq-email"
          type="email"
          value={values.email}
          onChange={set('email')}
          placeholder="you@example.com"
          className={inputCls}
        />
        {errors.email && <p className={errorCls}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="inq-phone" className={labelCls}>
          Phone / WhatsApp
        </label>
        <input
          id="inq-phone"
          type="tel"
          value={values.phone}
          onChange={set('phone')}
          placeholder="+91 …"
          className={inputCls}
        />
      </div>

      {errors.contact && (
        <p className={`${errorCls} md:col-span-2 flex items-center gap-1.5 -mt-2`}>
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.contact}
        </p>
      )}

      <div>
        <label htmlFor="inq-type" className={labelCls}>
          Business type
        </label>
        <select
          id="inq-type"
          value={values.businessType}
          onChange={set('businessType')}
          className={`${inputCls} [&>option]:text-ink`}
        >
          <option value="">Select…</option>
          {BUSINESS_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="inq-url" className={labelCls}>
          Current website <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          id="inq-url"
          type="url"
          value={values.websiteUrl}
          onChange={set('websiteUrl')}
          placeholder="https://…"
          className={inputCls}
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="inq-req" className={labelCls}>
          What do you need? *
        </label>
        <textarea
          id="inq-req"
          value={values.requirements}
          onChange={set('requirements')}
          rows={4}
          placeholder="Tell Vinit about your project — what the site should do, who it's for, anything you already have…"
          className={`${inputCls} resize-y`}
        />
        {errors.requirements && <p className={errorCls}>{errors.requirements}</p>}
      </div>

      <div className="md:col-span-2">
        <label htmlFor="inq-features" className={labelCls}>
          Features <span className="normal-case font-normal">(e.g. online booking, menu, payments)</span>
        </label>
        <input
          id="inq-features"
          value={values.features}
          onChange={set('features')}
          placeholder="e.g. online booking, menu, payments"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="inq-budget" className={labelCls}>
          Budget
        </label>
        <select
          id="inq-budget"
          value={values.budget}
          onChange={set('budget')}
          className={`${inputCls} [&>option]:text-ink`}
        >
          <option value="">Select…</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="inq-timeline" className={labelCls}>
          Timeline
        </label>
        <select
          id="inq-timeline"
          value={values.timeline}
          onChange={set('timeline')}
          className={`${inputCls} [&>option]:text-ink`}
        >
          <option value="">Select…</option>
          {TIMELINES.map((tl) => (
            <option key={tl} value={tl}>
              {tl}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="inq-details" className={labelCls}>
          Anything else
        </label>
        <textarea
          id="inq-details"
          value={values.details}
          onChange={set('details')}
          rows={3}
          placeholder="References, deadlines, questions…"
          className={`${inputCls} resize-y`}
        />
      </div>

      <div className="md:col-span-2 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 bg-lime text-ink font-semibold px-8 py-4 rounded-full hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed w-full md:w-auto"
        >
          {sending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.2} />
              Sending…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" strokeWidth={2.2} />
              Send project request
            </>
          )}
        </button>
        <p className="text-white/40 text-xs mt-4">
          Prices shown anywhere on this site are estimates, not guarantees — the final quote depends on your requirements.
        </p>
      </div>
    </form>
  );
}
