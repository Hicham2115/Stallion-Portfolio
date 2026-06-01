export type ProjectType = "performance" | "development";

export interface Project {
  name: string;
  type: ProjectType;
  cats: string[];
  year: string;
  grad: string;
}

export interface Case {
  id: string;
  client: string;
  track: string;
  kpi: string;
  kpiLabel: string;
  grad: string;
  brief: string[];
  solution: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface Principle {
  n: string;
  title: string;
  desc: string;
}

export interface Service {
  n: string;
  title: string;
  desc: string;
}

export const PROJECTS: Project[] = [
  { name: "Nova Commerce", type: "performance", cats: ["Paid Social", "E-commerce"], year: "2025", grad: "linear-gradient(135deg,#65891c,#bafc0c)" },
  { name: "Verde Hospitality", type: "performance", cats: ["Lead Gen", "Funnels"], year: "2024", grad: "linear-gradient(135deg,#7a9e2a,#0e1013)" },
  { name: "Helios Skincare", type: "performance", cats: ["Meta & Google Ads", "CRO"], year: "2025", grad: "linear-gradient(135deg,#9ed02f,#1b1f25)" },
  { name: "Atlas Fintech", type: "development", cats: ["Web App", "Dashboard"], year: "2025", grad: "linear-gradient(135deg,#1b1f25,#65891c)" },
  { name: "Maison Solaire", type: "development", cats: ["Website", "Brand"], year: "2024", grad: "linear-gradient(135deg,#bafc0c,#65891c)" },
  { name: "Orbit SaaS", type: "development", cats: ["SaaS Platform", "Web App"], year: "2023", grad: "linear-gradient(135deg,#65891c,#14171c)" },
];

export const CASES: Case[] = [
  {
    id: "Case 01", client: "Nova Commerce", track: "Performance / Ads",
    kpi: "+312%", kpiLabel: "Return on ad spend",
    grad: "linear-gradient(135deg,#65891c,#bafc0c)",
    brief: [
      "A fast-growing skincare e-commerce brand needed to scale paid social profitably ahead of a major sale season.",
      "Returns had plateaued and creative was fatiguing fast across Meta and TikTok.",
      "The goal: triple return on ad spend within one quarter — without inflating cost per acquisition.",
    ],
    solution: [
      "Rebuilt the funnel around a modular creative system and audience-led testing.",
      "Shipped UGC + motion ad batches on a weekly iteration cadence.",
      "Tightened tracking and ran end-to-end CRO on the landing experience.",
    ],
  },
  {
    id: "Case 02", client: "Verde Hospitality", track: "Performance / Ads",
    kpi: "−43%", kpiLabel: "Cost per lead",
    grad: "linear-gradient(135deg,#7a9e2a,#0e1013)",
    brief: [
      "A boutique hospitality group was overpaying for low-intent leads from generic campaigns.",
      "The booking funnel leaked at every step and follow-up was fully manual.",
      "The goal: cut cost-per-lead sharply while increasing booked stays.",
    ],
    solution: [
      "Designed dedicated landing funnels per property and seasonal offer.",
      "Automated lead nurturing and routing through the CRM.",
      "Layered retargeting to recover drop-offs and lift conversion.",
    ],
  },
  {
    id: "Case 03", client: "Atlas Fintech", track: "Development",
    kpi: "1.2s", kpiLabel: "Load time at scale",
    grad: "linear-gradient(135deg,#1b1f25,#65891c)",
    brief: [
      "A fintech dashboard had grown heavy and slow, hurting retention as the user base scaled.",
      "The legacy front-end couldn't keep up with real-time data demands.",
      "The goal: sub-second interactions for every user, on every plan.",
    ],
    solution: [
      "Re-engineered the product as a React web app with virtualized data views.",
      "Introduced code-splitting, smart caching and a fresh design system.",
      "Shipped a fast, accessible platform built to grow with the business.",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Stallion tripled our ROAS in a single quarter — and actually explained how they did it.", name: "Sara M.", role: "Founder, Nova Commerce", initials: "SM" },
  { quote: "They shipped our web app faster than our last two agencies combined. Zero drama.", name: "Karim B.", role: "CTO, Atlas Fintech", initials: "KB" },
  { quote: "Finally an agency that talks revenue, not impressions. Every call moved the business.", name: "Lina T.", role: "CMO, Verde Hospitality", initials: "LT" },
  { quote: "No-cure, no-pay sounded too good to be true — then they delivered, twice over.", name: "Omar R.", role: "Owner, Helios Skincare", initials: "OR" },
];

export const PRINCIPLES: Principle[] = [
  { n: "01", title: "Less is more", desc: "Strip away the unnecessary until only what matters remains. Every element earns its place through purpose, not decoration." },
  { n: "02", title: "Results over noise", desc: "We measure work against revenue, not vanity metrics. If it doesn't move the number, it doesn't ship." },
  { n: "03", title: "Run beside you", desc: "We embed like partners, not vendors. Your goals are our scoreboard — your wins are how we keep score." },
  { n: "04", title: "Build to last", desc: "Fast today, maintainable tomorrow. We engineer for scale, not just for launch day." },
];

export const SERVICES: Service[] = [
  { n: "01", title: "Brand & Identity", desc: "Naming, visual systems, guidelines, motion." },
  { n: "02", title: "Web & Product", desc: "Marketing sites, SaaS, e-commerce, web apps." },
  { n: "03", title: "Performance Marketing", desc: "Paid social & search, funnels, CRO, analytics." },
  { n: "04", title: "Lead Generation", desc: "Landing pages, automation, CRM, outbound." },
];

export const MARQUEE_ITEMS = [
  "Branding", "Performance Ads", "Web Development", "SaaS",
  "Lead Generation", "Motion", "SEO", "E-commerce",
];

export const STATS = [
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 8, suffix: "", label: "Years running" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 5, suffix: "×", label: "Avg. ROAS lift" },
];
