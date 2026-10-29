import { Phone, MessageCircle, Send, Instagram } from 'lucide-react';
import { SITE } from '../lib/site';

const CONTACTS = [
  { label: 'Call', href: SITE.phoneHref, icon: Phone },
  { label: 'WhatsApp', href: SITE.whatsapp, icon: MessageCircle },
  { label: 'Telegram', href: SITE.telegram, icon: Send },
  { label: 'Instagram', href: SITE.instagram, icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="font-display font-extrabold text-2xl mb-2">
              VINIT<span className="text-lime">.</span>
            </p>
            <p className="text-white/50 text-sm">
              Websites • AI • Automation — shipped worldwide
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {CONTACTS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/15 text-white/80 hover:border-lime hover:text-lime transition-colors"
              >
                <c.icon size={16} />
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs mt-8">
          Email / GitHub / LinkedIn — coming soon
        </p>
        <p className="text-white/40 text-sm mt-2">
          © 2026 {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
