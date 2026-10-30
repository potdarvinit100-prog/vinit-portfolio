export const SITE = {
  name: 'Vinit Potdar',
  role: 'Web Developer',
  phoneDisplay: '+91 82629 20550',
  phoneHref: 'tel:+918262920550',
  whatsapp: 'https://wa.me/918262920550',
  telegram: 'https://t.me/hello_vinit',
  instagram: 'https://instagram.com/_yrrr_vinit',
};

export interface InquiryPrefill {
  industry?: string;
  packageName?: string;
  budget?: string;
  name?: string;
  business?: string;
  source?: string;
  message?: string;
}

export function openInquiry(prefill: InquiryPrefill = {}): void {
  window.dispatchEvent(
    new CustomEvent('vinit:open-inquiry', { detail: prefill })
  );
}

export interface PackageInfo {
  id: 'starter' | 'business' | 'custom';
  name: string;
  tagline: string;
  base: number;
  min: number;
  max: number;
  timeline: string;
  features: string[];
}

export const PACKAGES: PackageInfo[] = [
  {
    id: 'starter',
    name: 'Starter Website',
    tagline: 'For small businesses & personal brands',
    base: 149,
    min: 99,
    max: 199,
    timeline: '1–2 weeks',
    features: [
      '5-page responsive website',
      'Mobile-first design',
      'Contact form + WhatsApp button',
      'Basic SEO setup',
      '1 revision round',
    ],
  },
  {
    id: 'business',
    name: 'Business Website',
    tagline: 'For restaurants, salons, clinics, gyms & services',
    base: 349,
    min: 249,
    max: 499,
    timeline: '2–4 weeks',
    features: [
      'Up to 10 pages',
      'Online booking / menu / catalog',
      'Google Maps + reviews integration',
      'Advanced SEO',
      '2 revision rounds',
      '30 days free support',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Website',
    tagline: 'E-commerce, dashboards, booking systems, AI apps',
    base: 799,
    min: 599,
    max: 1500,
    timeline: '4–8 weeks',
    features: [
      'Full-stack web application',
      'Payments / auth / database',
      'AI chatbot or automation',
      'Admin dashboard',
      'Priority support',
    ],
  },
];

export interface DemoMeta {
  path: string;
  name: string;
  industry: string;
  blurb: string;
}

export const DEMOS: DemoMeta[] = [
  {
    path: '/demo/cafe',
    name: 'Brew & Bean',
    industry: 'Café / Coffee Shop',
    blurb: 'Menu, gallery & table reservations',
  },
  {
    path: '/demo/restaurant',
    name: 'Ember & Oak',
    industry: 'Restaurant',
    blurb: 'Menu tabs & table booking',
  },
  {
    path: '/demo/salon',
    name: 'Velvet & Blade',
    industry: 'Salon / Barbershop',
    blurb: 'Services, pricing & appointments',
  },
  {
    path: '/demo/gym',
    name: 'Forge Athletics',
    industry: 'Gym / Fitness',
    blurb: 'Class schedule & memberships',
  },
  {
    path: '/demo/dental',
    name: 'Brightline Dental',
    industry: 'Dental Clinic',
    blurb: 'Services & appointment requests',
  },
];
