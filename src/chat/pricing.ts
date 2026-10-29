import { PACKAGES, type PackageInfo } from '../lib/site';

export { PACKAGES };
export type { PackageInfo };

const byId = (id: PackageInfo['id']): PackageInfo =>
  PACKAGES.find((p) => p.id === id) as PackageInfo;

/**
 * Recommend a package from the business type and/or an explicit budget.
 * Budget wins when present; otherwise the business type drives the pick.
 */
export function recommendPackage(
  businessType: string,
  budget: number | null
): PackageInfo {
  if (budget != null && Number.isFinite(budget)) {
    if (budget >= 600) return byId('custom');
    if (budget >= 200) return byId('business');
    return byId('starter');
  }

  const t = businessType.toLowerCase();
  if (
    /e-?commerce|online store|shop|marketplace|dashboard|portal|booking system|ai\b|app\b|platform/.test(
      t
    )
  ) {
    return byId('custom');
  }
  if (
    /restaurant|caf[eé]|coffee|salon|beauty|barber|gym|fitness|clinic|dental|health|hotel|real estate|service/.test(
      t
    )
  ) {
    return byId('business');
  }
  return byId('starter');
}

/** Human-readable price line for a package. Always framed as an estimate. */
export function priceLine(pkg: PackageInfo): string {
  return `$${pkg.min}–$${pkg.max} (typical $${pkg.base}, estimate)`;
}
