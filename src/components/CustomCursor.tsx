import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    let raf = 0;
    let rx = -100;
    let ry = -100;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${
          e.clientY - 4
        }px)`;
      }
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest?.('a, button, [data-hover]'));
    };

    const animate = () => {
      rx += (posRef.current.x - rx) * 0.16;
      ry += (posRef.current.y - ry) * 0.16;
      if (ringRef.current) {
        const size = ringRef.current.offsetWidth;
        ringRef.current.style.transform = `translate(${rx - size / 2}px, ${
          ry - size / 2
        }px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full bg-lime"
        style={{ width: 8, height: 8 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full border border-lime/60 transition-[width,height,opacity] duration-200"
        style={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: hovering ? 1 : 0.5,
        }}
      />
    </>
  );
}
