import { motion, useReducedMotion } from "framer-motion";
import { OPUL_EASE } from "./Reveal";

/**
 * Serif display headline with clip-mask line reveals.
 * Pass one string per visual line.
 *
 *   <DisplayHeading lines={["Websites with", "a pulse."]} className="opul-serif" />
 */
export function DisplayHeading({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const MTag = motion[Tag] as typeof motion.h2;
  return (
    <MTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="opul-mask" aria-hidden={i > 0}>
          <motion.span
            className="opul-mask-inner"
            variants={{
              hidden: { y: reduce ? 0 : "112%" },
              show: { y: "0%", transition: { duration: 1, ease: OPUL_EASE } },
            }}
          >
            {/* allow <em> etc: render as HTML only from your own strings */}
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </motion.span>
        </span>
      ))}
      <span className="sr-only">{lines.join(" ")}</span>
    </MTag>
  );
}
