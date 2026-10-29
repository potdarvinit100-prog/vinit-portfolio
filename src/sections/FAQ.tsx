import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Container, SectionHeading, Reveal } from '../components/ui';

const FAQS = [
  {
    q: 'How much does a website cost?',
    a: 'It depends on what you need — the packages above give you honest estimated ranges. Starter sites start around $99–$199, business sites around $249–$499, and custom web apps from $599. You always get a final quote before we start, so there are no surprises.',
  },
  {
    q: 'How long does it take to build?',
    a: 'As a rough estimate: starter websites take 1–2 weeks, business websites 2–4 weeks, and custom web apps 4–8 weeks. The timeline depends on the scope and how quickly we get content and feedback from you.',
  },
  {
    q: 'How many revisions do I get?',
    a: 'Starter packages include 1 revision round, Business and Custom packages include 2 revision rounds. We review the design together at each stage, so most clients never feel the need for more.',
  },
  {
    q: 'Do you help with hosting and domain?',
    a: 'Yes — I guide you through the full setup, step by step. Your domain and hosting accounts stay in your name and under your control. I never hold your site hostage.',
  },
  {
    q: 'Do you offer maintenance after launch?',
    a: 'Yes. Care plans are available for ongoing updates, backups, and small changes. Every project also includes an initial free support window so you\'re covered right after launch.',
  },
  {
    q: 'What technologies do you use?',
    a: 'Modern, proven tools: React and Tailwind for the frontend, Node.js and MongoDB on the backend. When AI adds real value — like chatbots, voice agents, or automation — I integrate it through modern APIs.',
  },
  {
    q: 'How do we start working together?',
    a: 'Simple: send an inquiry through the form below, we have a free discovery call to talk through your goals, and then you get a clear quote. If it\'s a fit, we start with the Discover step — no pressure, no obligation.',
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
  index,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-inset"
      >
        <span className="font-display text-lg font-bold">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-lime"
          aria-hidden="true"
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-white/65 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="FAQ"
          title="Questions, Answered"
          sub="The things every business owner asks me before starting a project."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <FaqItem
                q={f.q}
                a={f.a}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
