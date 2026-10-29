import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
  type RefObject,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/* ---------------------------------- Container ---------------------------------- */

export function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-7xl mx-auto px-6">{children}</div>;
}

/* -------------------------------- SectionHeading ------------------------------- */

interface SectionHeadingProps {
  kicker: string;
  title: string;
  sub?: string;
}

export function SectionHeading({ kicker, title, sub }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <p className="text-lime text-sm font-semibold tracking-[0.25em] uppercase mb-4">
        {kicker}
      </p>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
        {title}
      </h2>
      {sub && <p className="text-white/60 text-lg max-w-2xl">{sub}</p>}
    </Reveal>
  );
}

/* -------------------------------- MagneticButton ------------------------------- */

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (ref.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      setOffset({ x: x * strength, y: y * strength });
    }
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------ Reveal ----------------------------------- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: reduce ? 0 : 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------ Counter ---------------------------------- */

interface CounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

export function Counter({ to, suffix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(
    ref as unknown as RefObject<Element>,
    { once: true, margin: '-40px' }
  );
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(to);
      return;
    }
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* --------------------------------- ConceptBadge -------------------------------- */

export function ConceptBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-lime text-lime text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
      Concept Demo
    </span>
  );
}
