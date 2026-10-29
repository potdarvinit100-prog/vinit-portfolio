import { PACKAGES, type PackageInfo, type InquiryPrefill } from '../lib/site';
import { recommendPackage } from './pricing';

// TODO: plug LLM via POST /api/chat
// When the backend chat endpoint exists, replace the rule engine's fallback
// with a call to this function. It stays a stub until then.
export async function queryLLM(_prompt: string): Promise<string> {
  void _prompt;
  throw new Error('LLM chat not configured');
}

/* ---------------------------------- types ---------------------------------- */

export interface BotTurn {
  messages: string[];
  chips: string[];
  /** When set, the widget performs this action after showing the messages. */
  action?: { type: 'openInquiry'; prefill: InquiryPrefill };
}

export type Step =
  | 'idle'
  | 'awaiting_name'
  | 'awaiting_business_type'
  | 'awaiting_budget'
  | 'awaiting_connect_consent';

export interface ChatState {
  step: Step;
  name: string | null;
  business: string | null;
  businessType: string | null;
  budgetNum: number | null;
  budgetLabel: string | null;
  timeline: string | null;
  activePackage: PackageInfo | null;
  /** negotiation round counter for the active package (max 3) */
  negoRounds: number;
  /** true once we have made a one-time counter offer */
  negoCountered: boolean;
}

export function createInitialState(): ChatState {
  return {
    step: 'idle',
    name: null,
    business: null,
    businessType: null,
    budgetNum: null,
    budgetLabel: null,
    timeline: null,
    activePackage: null,
    negoRounds: 0,
    negoCountered: false,
  };
}

export function getGreeting(): BotTurn {
  return {
    messages: [
      "Hey, I'm Vinit's AI assistant. I can walk you through his services, recommend a website package for your business, or give you an honest price estimate.",
      'What can I do for you?',
    ],
    chips: ['What services?', 'Recommend a package', 'Pricing', 'Talk to Vinit'],
  };
}

/* --------------------------------- helpers --------------------------------- */

const SERVICES = [
  'Business websites',
  'Landing pages',
  'E-commerce stores',
  'Booking systems',
  'AI chatbots',
  'Portfolios',
  'Dashboards & web apps',
  'Redesigns & speed fixes',
];

const BUSINESS_CHIPS = [
  'Restaurant',
  'Salon',
  'Gym',
  'Clinic',
  'E-commerce',
  'Other',
];

const fmt = (n: number): string => `$${Math.round(n).toLocaleString('en-US')}`;

function packageCard(pkg: PackageInfo): string {
  const feats = pkg.features.slice(0, 4).join('; ');
  return (
    `${pkg.name} — ${pkg.tagline}. ` +
    `Estimate ${fmt(pkg.min)}–${fmt(pkg.max)} (typical ${fmt(pkg.base)}), ` +
    `timeline ${pkg.timeline}. Includes: ${feats}.`
  );
}

function describeAllPackages(): string[] {
  return [
    'Here are the three packages. Prices are estimates, not guarantees — the final quote depends on your exact requirements.',
    ...PACKAGES.map(packageCard),
  ];
}

const lower = (s: string): string => s.toLowerCase();

function hasAny(text: string, words: string[]): boolean {
  return words.some((w) => text.includes(w));
}

/** Extract a USD amount from free text. Handles "$500", "500", "1.5k", "2k". */
export function parseBudget(input: string): number | null {
  const t = lower(input).replace(/,/g, '');
  const kMatch = t.match(/(\d+(?:\.\d+)?)\s*k\b/);
  if (kMatch) return Math.round(parseFloat(kMatch[1]) * 1000);
  const m = t.match(/\$?\s*(\d+(?:\.\d+)?)/);
  if (m) {
    const n = parseFloat(m[1]);
    return Number.isFinite(n) ? Math.round(n) : null;
  }
  return null;
}

const estimateDisclaimer = 'All prices are estimates, not guarantees.';

const MENU_CHIPS = ['What services?', 'Recommend a package', 'Pricing', 'Talk to Vinit'];

/* ------------------------------ intent matching ----------------------------- */

function isGreeting(t: string): boolean {
  return /^(hi|hii+|hey|hello|yo|namaste|good (morning|afternoon|evening)|sup)\b/.test(t) || t.length < 4;
}

function wantsServices(t: string): boolean {
  return hasAny(t, ['service', 'what do you do', 'what does vinit do', 'offer', 'what can you']);
}

function wantsProcess(t: string): boolean {
  return hasAny(t, ['process', 'how does it work', 'how do you work', 'workflow', 'steps']);
}

function wantsRecommend(t: string): boolean {
  return hasAny(t, ['recommend', 'suggest', 'which package', 'which plan', 'choose', 'help me pick', 'what should i get']);
}

function wantsPricing(t: string): boolean {
  return hasAny(t, ['price', 'pricing', 'cost', 'how much', 'charge', 'rates', 'quote', 'estimate']);
}

function wantsConnect(t: string): boolean {
  return hasAny(t, ['talk to vinit', 'contact vinit', 'call vinit', 'speak to vinit', 'connect', 'hire', 'get started', 'start project', 'human']);
}

function isYes(t: string): boolean {
  return /^(yes|yeah|yep|sure|ok|okay|please|definitely|go ahead|of course)\b/.test(t.trim());
}

function isNo(t: string): boolean {
  return /^(no|nope|not now|later|maybe later|skip)\b/.test(t.trim());
}

function faqIntent(t: string): 'hosting' | 'domain' | 'maintenance' | 'revisions' | 'timeline' | 'stack' | null {
  if (hasAny(t, ['hosting', 'host it', 'where will it be hosted', 'deploy'])) return 'hosting';
  if (hasAny(t, ['domain', 'domain name'])) return 'domain';
  if (hasAny(t, ['maintenance', 'maintain', 'support after', 'updates after'])) return 'maintenance';
  if (hasAny(t, ['revision', 'changes during', 'edits during', 'how many changes'])) return 'revisions';
  if (hasAny(t, ['how long', 'timeline', 'how fast', 'delivery', 'when will it be ready', 'duration'])) return 'timeline';
  if (hasAny(t, ['tech stack', 'technology', 'technologies', 'what do you build with', 'framework', 'react', 'wordpress'])) return 'stack';
  return null;
}

const FAQ_ANSWERS: Record<string, { text: string; chips: string[] }> = {
  hosting: {
    text: 'Vinit can deploy your site to reliable, low-cost hosting (Vercel, Netlify, or shared hosting for simpler sites). He handles the full setup — you just get a live link. Hosting fees themselves are paid to the provider and are usually cheap.',
    chips: MENU_CHIPS,
  },
  domain: {
    text: 'You can bring your own domain or Vinit can help you register one (typically around $10–15/year from registrars like Namecheap or Cloudflare). He will connect it to your site for you.',
    chips: MENU_CHIPS,
  },
  maintenance: {
    text: 'Business and Custom packages include free support after launch. After that, Vinit offers affordable maintenance plans for updates, backups, and small changes — just ask for a quote.',
    chips: MENU_CHIPS,
  },
  revisions: {
    text: 'Starter includes 1 revision round, Business includes 2. A revision round means you review the site and request a batch of changes, which Vinit then implements. Extra rounds can be added at a small cost.',
    chips: MENU_CHIPS,
  },
  timeline: {
    text: 'Rough timelines: Starter 1–2 weeks, Business 2–4 weeks, Custom 4–8 weeks. The exact timeline depends on scope and how quickly you share content and feedback.',
    chips: MENU_CHIPS,
  },
  stack: {
    text: 'Vinit builds with modern tools: React, TypeScript, Tailwind CSS, and Node.js backends, plus Supabase or similar for databases and auth. No heavy page builders — you get fast, clean, maintainable code.',
    chips: MENU_CHIPS,
  },
};

/* ------------------------------- negotiation -------------------------------- */

function negotiateTurn(state: ChatState, offer: number): BotTurn {
  const pkg = state.activePackage;
  if (!pkg) {
    return {
      messages: ["Let's pick a package first so I can give you a real number. What kind of business is this for?"],
      chips: BUSINESS_CHIPS,
    };
  }

  // Accept at or above base.
  if (offer >= pkg.base) {
    state.negoRounds = 0;
    state.negoCountered = false;
    return {
      messages: [
        `${fmt(offer)} works — that is at the typical ${pkg.name} price of ${fmt(pkg.base)}. Vinit can do it.`,
        `Want me to send these details to Vinit so he can confirm and get started?`,
      ],
      chips: ['Yes, talk to Vinit', 'Show packages', 'What services?'],
    };
  }

  // Between min and base: counter once midway, then accept next time.
  if (offer >= pkg.min) {
    if (!state.negoCountered) {
      state.negoCountered = true;
      const counter = Math.round((offer + pkg.base) / 2);
      return {
        messages: [
          `I can meet you partway at ${fmt(counter)} — that is between your offer and the typical ${pkg.name} price of ${fmt(pkg.base)}. ${estimateDisclaimer}`,
          'Does that work for you?',
        ],
        chips: [`${fmt(counter)} works`, 'Show packages', 'Talk to Vinit'],
      };
    }
    state.negoRounds = 0;
    state.negoCountered = false;
    return {
      messages: [
        `Done — ${fmt(offer)} it is for the ${pkg.name}.`,
        'Want me to pass this to Vinit so he can confirm the scope and get started?',
      ],
      chips: ['Yes, talk to Vinit', 'Show packages'],
    };
  }

  // Below min: hold firm (max 3 rounds), then suggest smaller scope.
  state.negoRounds += 1;
  if (state.negoRounds < 3) {
    return {
      messages: [
        `Honest answer: ${fmt(offer)} is below what Vinit can do for the ${pkg.name} — his floor for that scope is ${fmt(pkg.min)}. ${estimateDisclaimer}`,
        `Can you stretch to ${fmt(pkg.min)}?`,
      ],
      chips: [`${fmt(pkg.min)} works`, 'Show smaller options', 'Talk to Vinit'],
    };
  }

  state.negoRounds = 0;
  const smaller = pkg.id === 'custom' ? PACKAGES.find((p) => p.id === 'business') : PACKAGES.find((p) => p.id === 'starter');
  const smallerText = smaller
    ? `For example, the ${smaller.name} runs ${fmt(smaller.min)}–${fmt(smaller.max)} and covers ${smaller.features[0].toLowerCase()} — or we could trim the scope (fewer pages, simpler features) to fit your budget.`
    : 'We could trim the scope (fewer pages, simpler features) to fit your budget.';
  return {
    messages: [
      `I have held firm three times, so let me be straight: ${fmt(pkg.min)} is the floor for the ${pkg.name}. But your budget can still work with a smaller scope.`,
      smallerText,
      'Want me to connect you with Vinit to scope it down together?',
    ],
    chips: ['Yes, talk to Vinit', 'Show packages', 'What services?'],
  };
}

/* ------------------------------ connect flow -------------------------------- */

function connectSummary(state: ChatState): string {
  const parts: string[] = [];
  if (state.name) parts.push(`Name: ${state.name}`);
  if (state.business) parts.push(`Business: ${state.business}`);
  if (state.businessType) parts.push(`Type: ${state.businessType}`);
  if (state.activePackage) parts.push(`Package: ${state.activePackage.name}`);
  if (state.budgetLabel) parts.push(`Budget: ${state.budgetLabel}`);
  if (state.timeline) parts.push(`Timeline: ${state.timeline}`);
  return parts.length ? parts.join(' · ') : 'No details collected yet';
}

function startConnect(state: ChatState): BotTurn {
  state.step = 'awaiting_connect_consent';
  return {
    messages: [
      `Here is what I have so far: ${connectSummary(state)}.`,
      'Can I open the inquiry form with these details pre-filled?',
    ],
    chips: ['Yes, open the form', 'Not yet'],
  };
}

/* --------------------------------- engine ----------------------------------- */

export function respond(state: ChatState, rawInput: string): BotTurn {
  const input = rawInput.trim();
  const t = lower(input);
  const budget = parseBudget(input);

  // In-progress conversational steps take priority.
  if (state.step === 'awaiting_connect_consent') {
    if (isYes(t)) {
      state.step = 'idle';
      return {
        messages: ['Opening the inquiry form with your details — Vinit will reply soon.'],
        chips: MENU_CHIPS,
        action: {
          type: 'openInquiry',
          prefill: {
            name: state.name ?? undefined,
            business: state.business ?? undefined,
            industry: state.businessType ?? undefined,
            packageName: state.activePackage?.name,
            budget: state.budgetLabel ?? undefined,
            source: 'chatbot',
          },
        },
      };
    }
    if (isNo(t)) {
      state.step = 'idle';
      return {
        messages: ['No problem. Anything else I can help with?'],
        chips: MENU_CHIPS,
      };
    }
    return {
      messages: ['Just checking — should I open the inquiry form with your details pre-filled?'],
      chips: ['Yes, open the form', 'Not yet'],
    };
  }

  if (state.step === 'awaiting_name') {
    const name = input.replace(/^(my name is|i am|i'm|this is)\s+/i, '').trim();
    if (name.length >= 2) {
      state.name = name;
      state.step = 'awaiting_business_type';
      return {
        messages: [
          `Nice to meet you, ${name}. What kind of business is the website for?`,
        ],
        chips: BUSINESS_CHIPS,
      };
    }
    return {
      messages: ['What is your name?'],
      chips: [],
    };
  }

  if (state.step === 'awaiting_business_type') {
    state.businessType = input;
    state.step = 'awaiting_budget';
    return {
      messages: [
        `Got it — a ${input.toLowerCase()} website. What is your rough budget? (A number is fine, e.g. 200)`,
      ],
      chips: ['Under $150', '$150–$400', '$400–$1000', '$1000+'],
    };
  }

  if (state.step === 'awaiting_budget') {
    const n = budgetFromChip(input) ?? budget;
    if (n != null) {
      state.budgetNum = n;
      state.budgetLabel = fmt(n);
      state.step = 'idle';
      const pkg = recommendPackage(state.businessType ?? '', n);
      state.activePackage = pkg;
      state.negoRounds = 0;
      state.negoCountered = false;
      return {
        messages: [
          `Based on that, I recommend the ${pkg.name}.`,
          packageCard(pkg),
          `If your budget is flexible, tell me a number and I will see what Vinit can do.`,
        ],
        chips: ['Talk to Vinit', 'Show all packages', 'What services?'],
      };
    }
    return {
      messages: ['What is your rough budget? A number like 200 works, or pick a range.'],
      chips: ['Under $150', '$150–$400', '$400–$1000', '$1000+'],
    };
  }

  // Global intents.
  if (wantsConnect(t)) return startConnect(state);

  const faq = faqIntent(t);
  if (faq) {
    const a = FAQ_ANSWERS[faq];
    return { messages: [a.text], chips: a.chips };
  }

  if (wantsRecommend(t)) {
    if (state.name) {
      state.step = 'awaiting_business_type';
      return {
        messages: ['What kind of business is the website for?'],
        chips: BUSINESS_CHIPS,
      };
    }
    state.step = 'awaiting_name';
    return {
      messages: [
        'I can recommend the right package — it takes two quick questions. First, what is your name?',
      ],
      chips: [],
    };
  }

  if (wantsPricing(t)) {
    return {
      messages: describeAllPackages(),
      chips: ['Recommend a package', 'Talk to Vinit', 'What services?'],
    };
  }

  if (wantsServices(t)) {
    return {
      messages: [
        'Vinit builds 8 kinds of things: ' + SERVICES.join(', ') + '.',
        'His process is simple: Discover (understand your business) → Design (mockups you approve) → Build (clean, fast code) → Launch (deploy + support).',
      ],
      chips: ['Recommend a package', 'Pricing', 'Talk to Vinit'],
    };
  }

  if (wantsProcess(t)) {
    return {
      messages: [
        'The process: 1) Discover — Vinit learns about your business and goals. 2) Design — you review and approve the look. 3) Build — clean, fast, mobile-first code. 4) Launch — deployed, connected, and supported.',
      ],
      chips: MENU_CHIPS,
    };
  }

  // A bare number after a package is active = negotiation offer.
  // (Checked before greetings so short numbers like "300" negotiate, not greet.)
  if (budget != null && state.activePackage) {
    return negotiateTurn(state, budget);
  }

  // A bare number with no package context: start from budget.
  if (budget != null) {
    state.budgetNum = budget;
    state.budgetLabel = fmt(budget);
    const pkg = recommendPackage(state.businessType ?? '', budget);
    state.activePackage = pkg;
    state.negoRounds = 0;
    state.negoCountered = false;
    return {
      messages: [
        `With a budget around ${fmt(budget)}, the ${pkg.name} fits best.`,
        packageCard(pkg),
      ],
      chips: ['Talk to Vinit', 'Show all packages', 'What services?'],
    };
  }

  if (isGreeting(t)) return getGreeting();

  // Explicit "smaller options" request after a hard no.
  if (hasAny(t, ['smaller', 'cheaper', 'lower budget', 'reduce scope', 'scope down'])) {
    return {
      messages: describeAllPackages(),
      chips: ['Recommend a package', 'Talk to Vinit'],
    };
  }

  // Fallback.
  return {
    messages: [
      "I didn't catch that — I can explain services, recommend a package, share pricing estimates, or connect you with Vinit.",
    ],
    chips: MENU_CHIPS,
  };
}

/** Map budget-range chips to representative numbers. */
function budgetFromChip(input: string): number | null {
  const t = lower(input);
  if (t.includes('under') || t.includes('<')) return 120;
  if (t.includes('150') && t.includes('400')) return 250;
  if (t.includes('400') && t.includes('1000')) return 600;
  if (t.includes('1000+') || t.includes('1000 +')) return 1200;
  return null;
}
