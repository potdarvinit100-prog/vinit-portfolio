import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { OPUL_EASE } from "./Reveal";

/** Radial champagne spotlight + vertical beam. Place inside a relative hero. */
export function Spotlight({ className = "" }: { className?: string }) {
  return (
    <div className={`opul-spotlight ${className}`} aria-hidden="true">
      <div className="opul-beam" />
    </div>
  );
}

/** Hero media that scales 1.06 -> 1.0 and settles on load. */
export function HeroVisual({
  children,
  className = "",
  delay = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ scale: reduce ? 1 : 1.06, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.4, delay, ease: OPUL_EASE }}
    >
      {children}
    </motion.div>
  );
}

/** "scroll to reveal" cue with looping fade line. */
export function ScrollCue({ label = "scroll to reveal" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3" aria-hidden="true">
      <span className="opul-micro">{label}</span>
      <span className="opul-cue-line" />
    </div>
  );
}

/** Full-bleed section with hairline top rule + numbered micro label. */
export function OpulSection({
  index,
  label,
  title,
  children,
  id,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-28 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <hr className="opul-rule mb-7" />
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-5">
          <p className="opul-micro">
            <b>{index}</b> &nbsp;·&nbsp; {label}
          </p>
          <div className="opul-serif text-4xl md:text-5xl leading-tight">{title}</div>
        </div>
        {children}
      </div>
    </section>
  );
}
