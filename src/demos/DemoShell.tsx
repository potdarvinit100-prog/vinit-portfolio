import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hammer } from 'lucide-react';
import { ConceptBadge } from '../components/ui';
import { openInquiry, type DemoMeta } from '../lib/site';

interface DemoShellProps {
  demo: DemoMeta;
  children: ReactNode;
}

export default function DemoShell({ demo, children }: DemoShellProps) {
  const slug = demo.path.replace('/demo/', '');
  const cta = () =>
    openInquiry({ industry: demo.industry, source: `demo-${slug}` });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top utility bar */}
      <div className="sticky top-0 z-50 bg-ink/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            <span className="hidden sm:inline">Back to portfolio</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex-shrink-0">
            <ConceptBadge />
          </div>
          <button
            type="button"
            onClick={cta}
            className="inline-flex items-center gap-1.5 bg-lime text-ink text-sm font-semibold px-4 py-2 rounded-full hover:brightness-110 transition"
          >
            <Hammer className="w-4 h-4" aria-hidden />
            <span className="hidden sm:inline">Build a Website Like This</span>
            <span className="sm:hidden">Build One</span>
          </button>
        </div>
      </div>

      <div className="flex-1">{children}</div>

      {/* Footer strip */}
      <div className="bg-ink border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center">
          <p className="text-white/60 text-sm mb-6">
            Concept demo — fictional branding, built to show what&apos;s possible.
          </p>
          <button
            type="button"
            onClick={cta}
            className="inline-flex items-center gap-2 bg-lime text-ink font-semibold px-8 py-4 rounded-full hover:brightness-110 transition"
          >
            <Hammer className="w-5 h-5" aria-hidden />
            Build a Website Like This
          </button>
        </div>
      </div>
    </div>
  );
}
