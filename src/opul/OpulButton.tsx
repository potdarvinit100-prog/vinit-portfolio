import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Outline-to-fill pill button. Hover inverts outline -> filled.
 *   <OpulButton href="#work" solid>See the work</OpulButton>
 */
export function OpulButton({
  children,
  solid = false,
  className = "",
  href,
  ...rest
}: {
  children: ReactNode;
  solid?: boolean;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `opul-btn${solid ? " opul-btn--solid" : ""} ${className}`.trim();
  if (href)
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

/** Filter pill for collection-style toggles. */
export function Pill({
  children,
  active = false,
  className = "",
  ...rest
}: {
  children: ReactNode;
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`opul-pill${active ? " opul-pill--on" : ""} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
