// libs/local-db/projects.ts
// ─────────────────────────────────────────────────────────────────────────────
// Central data store for all projects & clients shown on the /projects page.
// Edit here — the ProjectCardGrid component reads from this file automatically.
//
// ADDING A PROJECT:
//   1. Add an entry to the correct category array below.
//   2. Drop your images in /public/pages/home/references/clientProfiles/{slug}/carousel/
//   3. That's it. No other files need to change.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectCategory = 'Web Design' | 'Software';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  contactName?: string;
  client: string;
  location: string;
  category: ProjectCategory;
  year: string;
  /** 2–3 sentence teaser shown on the card */
  shortDesc: string;
  /** Full story shown in the modal */
  fullDesc: string;
  /** Headline metric badge on the card image */
  result: string;
  tags: string[];
  /** images[0] = card thumbnail + modal hero */
  images: ProjectImage[];
  /** Optional — shows "Visit Site" button in the modal */
  liveUrl?: string;
  /** true = offline / no live URL */
  offline?: boolean;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// WEB DESIGN
// ─────────────────────────────────────────────────────────────────────────────
const webDesignProjects: Project[] = [
  {
    id: 'graciano-family-chiro',
    title: 'Graciano Family Chiro',
    contactName: 'Dr. Kevin Graciano',
    client: 'Graciano Family Chiro',
    location: 'Waxahachie, TX',
    category: 'Web Design',
    year: '2026',
    shortDesc:
      'Clean, minimalist healthcare website for a family chiropractic practice — designed to convert local searches into booked appointments.',
    fullDesc:
      'Dr. Kevin Graciano runs an evidence-based and holistic chiropractic practice in Waxahachie, TX, specializing in auto injury, wellness care, pregnancy chiropractic (Webster technique), and soft tissue therapies. He needed a site that communicated professionalism and warmth without clutter or the need of an ongoing web retainer. We built a minimalist Next.js/React site with appointment request forms, service detail pages, Google Business integration, and local SEO structured for Waxahachie chiropractic searches. Simple, fast, and effective.',
    result: 'No Web Retainer',
    tags: ['Next.js', 'React', 'Healthcare SEO', 'Minimalist UI'],
    images: [
      { src: '/pages/home/references/clientProfiles/gracianofamilychiro/carousel/image-1.png', alt: 'Graciano Family Chiro homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/gracianofamilychiro/carousel/image-2.png', alt: 'Services listing', caption: '' },
      { src: '/pages/home/references/clientProfiles/gracianofamilychiro/carousel/image-3.png', alt: 'Contact & booking', caption: '' },
    ],
    liveUrl: 'https://gracianofamilychiro.com/',
    featured: true,
  },
  {
    id: 'oscars-tree-service',
    title: "Oscar's Tree Service — Local SEO + Website",
    contactName: 'Oscar Lopez',
    client: "Oscar's Tree Service",
    location: 'Waco, TX',
    category: 'Web Design',
    year: '2025',
    shortDesc:
      'Code-based Next.js/React website and local SEO campaign for a Waco tree service — built to rank and convert in a crowded local market.',
    fullDesc:
      'Oscar Lopez is a certified arborist who has been running one of the best tree service crews in Central Texas since 2020, but had zero online presence when he came to us. We built him a fast, photo-heavy Next.js/React website with a prominent CTA and quote request form, then launched a local SEO strategy targeting Waco, Temple, Belton, Killeen, and surrounding areas. His phone started ringing within the first week of launch.',
    result: 'Code-based Website',
    tags: ['Next.js', 'React', 'Local SEO', 'Google Business'],
    images: [
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-1.png', alt: "Oscar's Tree Service homepage", caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-3.png', alt: 'Gallery', caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-4.png', alt: 'Mobile view', caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-5.png', alt: 'Contact', caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-6.png', alt: 'SEO landing', caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-7.png', alt: 'About', caption: '' },
      { src: '/pages/home/references/clientProfiles/oscarstreeservice/carousel/image-8.png', alt: 'Footer', caption: '' },
    ],
    liveUrl: 'https://www.oscartreeservice.org',
  },
  {
    id: 'ogi-tree-service',
    title: 'OGI Tree Service — Website',
    client: 'OGI Tree Service',
    location: 'Texas',
    category: 'Web Design',
    year: '2026',
    shortDesc:
      'Professional website for a tree service company — built to establish online presence and drive local service leads.',
    fullDesc:
      'Built a clean, service-focused website for OGI Tree Service. Designed to rank for local tree service searches and convert visitors into quote requests with a straightforward, mobile-first layout.',
    result: 'Bold Modern Design',
    tags: ['Web Design', 'Local SEO', 'Lead Capture'],
    images: [
      { src: '/pages/home/references/clientProfiles/ogitreeservice/carousel/cover.png', alt: 'OGI Tree Service website', caption: 'All 3 Devices' },
      { src: '/pages/home/references/clientProfiles/ogitreeservice/carousel/desktop.png', alt: 'OGI Tree Service website', caption: 'Desktop Contact Page' },
      { src: '/pages/home/references/clientProfiles/ogitreeservice/carousel/mobile.png', alt: 'OGI Tree Service website', caption: 'Mobile Services Page' },
      { src: '/pages/home/references/clientProfiles/ogitreeservice/carousel/tablet.png', alt: 'OGI Tree Service website', caption: 'Tablet Home Page' },
    ],
    liveUrl: 'https://OGITreeService.com',
  },
  {
    id: 'everything-blocks',
    title: 'Everything Blocks — Website',
    contactName: 'Tim Wade',
    client: 'Everything Blocks',
    location: 'Dallas, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'E-commerce website for a Dallas-based company serving the North Texas market.',
    fullDesc:
      'Tim needed a site built to handle product listings and drive online sales. We built an e-commerce website with Google Ads-optimized landing pages, positioning Everything Blocks as the go-to destination for their North Texas customer base.',
    result: 'Shopify E-Commerce',
    tags: ['Web Design', 'E-Commerce', 'Google Ads'],
    images: [
      { src: '/pages/home/references/clientProfiles/everythingblocks/carousel/image-1.png', alt: 'Everything Blocks homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/everythingblocks/carousel/image-2.png', alt: 'Product catalog', caption: '' },
      { src: '/pages/home/references/clientProfiles/everythingblocks/carousel/image-3.png', alt: 'Contractor portal', caption: '' },
      { src: '/pages/home/references/clientProfiles/everythingblocks/carousel/image-4.png', alt: 'Contact page', caption: '' },
      { src: '/pages/home/references/clientProfiles/everythingblocks/carousel/image-5.png', alt: 'Contact page', caption: '' },
    ],
    liveUrl: 'https://www.everythingblocks.com',
  },
  {
    id: 'hot-rocks-asphalt',
    title: 'Hot Rocks Asphalt',
    contactName: 'Jesse Stanley',
    client: 'Hot Rocks Asphalt',
    location: 'Waco, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'Minimalist Next.js/React service website for a Waco asphalt company — built for speed, mobile, and local search.',
    fullDesc:
      "Jesse Stanley's Hot Rocks Asphalt Inc. specializes in asphalt paving, seal coating, and repair across a wide swath of Central Texas. We built a minimalist Next.js/React website with a prominent free estimate form, before/after gallery, and service area pages targeting Waco, Killeen, Temple, China Spring, Valley Mills, Hewitt, Woodway, and Robinson. Local SEO and Google Business optimization included.",
    result: '+Quote Requests',
    tags: ['Next.js', 'React', 'Minimalist UI', 'Local SEO'],
    images: [
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-1.png', alt: 'Hot Rocks Asphalt homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-3.png', alt: 'Gallery', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-4.png', alt: 'Estimate form', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-5.png', alt: 'Service areas', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-6.png', alt: 'About', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-7.png', alt: 'Mobile view', caption: '' },
      { src: '/pages/home/references/clientProfiles/hotrocksasphalt/carousel/image-8.png', alt: 'Footer', caption: '' },
    ],
    liveUrl: 'https://www.hotrocks-asphalt.com',
  },
  {
    id: 'gtsdigs',
    title: "GT's Digs — (Wix)",
    contactName: 'Gene Tolbert',
    client: "GT's Digs",
    location: 'Elgin, TX',
    category: 'Web Design',
    year: '2023',
    shortDesc:
      'Minimalist Wix website for an Elgin-based excavation and site prep company serving Central Texas contractors and landowners.',
    fullDesc:
      "Gene needed a clean, professional web presence fast. We built a minimalist Wix site for GT's Digs with a service listing, project gallery, and quote request form. Local SEO targeting Elgin, Bastrop, and the Austin metro was included to drive inbound leads.",
    result: 'Brand + Web Live',
    tags: ['Wix', 'Minimalist UI', 'Local SEO', 'Quote Forms'],
    images: [
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-1.png', alt: "GT's Digs homepage", caption: '' },
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-3.png', alt: 'Gallery', caption: '' },
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-4.png', alt: 'Quote form', caption: '' },
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-5.png', alt: 'About', caption: '' },
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-6.png', alt: 'Mobile', caption: '' },
      { src: '/pages/home/references/clientProfiles/gtsdigs/carousel/image-7.png', alt: 'Footer', caption: '' },
    ],
    liveUrl: 'https://www.gtsdigs.com',
  },
  {
    id: 'gallery11-waco',
    title: 'Gallery 11 Waco',
    contactName: 'Kara Ballard',
    client: 'Gallery 11 Waco',
    location: 'Waco, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'Minimalist Next.js/React website for a Waco crystals and gems jewelry shop — clean layout that lets the products speak for themselves.',
    fullDesc:
      "Kara Ballard opened Gallery 11 in January 2023 at 1319 Austin Avenue in Downtown Waco — a curated crystals and gems jewelry shop focused on high-quality stones and a welcoming community vibe. She needed a site that matched the shop's warmth and aesthetic. We built a minimalist Next.js/React site with a product showcase, shop information, and contact details. Clean typography and generous whitespace keep the focus on the gems.",
    result: 'Shop Live',
    tags: ['Next.js', 'React', 'Minimalist UI', 'E-Commerce'],
    images: [
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-1.png', alt: 'Gallery 11 Waco homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-2.png', alt: 'Current collection', caption: '' },
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-3.png', alt: 'Crystals & gems', caption: '' },
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-4.png', alt: 'Shop', caption: '' },
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-5.png', alt: 'Events', caption: '' },
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-6.png', alt: 'About', caption: '' },
      { src: '/pages/home/references/clientProfiles/gallery11waco/carousel/image-7.png', alt: 'Mobile', caption: '' },
    ],
    liveUrl: 'https://www.gallery11waco.com',
  },
  {
    id: 'f5-portable-solutions',
    title: 'F5 Portable Solutions',
    contactName: 'Stephanie Ferguson',
    client: 'F5 Portable Solutions',
    location: 'Waco, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'Minimalist Next.js/React website for a portable restroom rental company serving events and job sites across Central Texas.',
    fullDesc:
      'Stephanie needed a no-fluff site that made it fast and easy to request a quote. We built a minimalist Next.js/React site with a clean service breakdown and a multi-step quote form. Google Business optimization and local SEO targeting Waco, Temple, and Killeen were built in.',
    result: 'Quote Requests Up',
    tags: ['Next.js', 'React', 'Minimalist UI', 'Local SEO'],
    images: [
      { src: '/pages/home/references/clientProfiles/f5portablesolutions/carousel/image-1.png', alt: 'F5 Portable Solutions homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/f5portablesolutions/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/f5portablesolutions/carousel/image-3.png', alt: 'Quote form', caption: '' },
    ],
    liveUrl: 'https://www.f5portablesolutions.com/',
  },
  {
    id: 'bennington-hhc',
    title: 'Bennington HHC — (WIX)',
    contactName: 'Amanda Menchaca',
    client: 'Bennington HHC',
    location: 'San Marcos, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'Home Health Care website made using Wix — focused on trust and clarity for families seeking care.',
    fullDesc:
      'Amanda needed a site that balanced warmth with professionalism in a minimal package. We built a clean Wix site focused on trust signals — licensing info, service descriptions, and a contact form for both families and prospective employees. Local SEO targets San Marcos, Kyle, and Buda.',
    result: 'Family Inquiries Up',
    tags: ['Next.js', 'React', 'Minimalist UI', 'Healthcare SEO'],
    images: [
      { src: '/pages/home/references/clientProfiles/benningtonhhc/carousel/image-1.png', alt: 'Bennington HHC homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/benningtonhhc/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/benningtonhhc/carousel/image-3.png', alt: 'About', caption: '' },
      { src: '/pages/home/references/clientProfiles/benningtonhhc/carousel/image-4.png', alt: 'Contact', caption: '' },
    ],
    liveUrl: 'https://www.benningtonhhc.com',
  },
  {
    id: 'cen-tex-landscaping',
    title: 'Cen-Tex Landscaping & Irrigation',
    contactName: 'Cavin Harrison',
    client: 'Cen-Tex Landscaping & Irrigation',
    location: 'China Spring, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'Minimalist Next.js/React service website for a China Spring landscaping and irrigation company serving the greater Waco area.',
    fullDesc:
      'Cavin needed a clean, fast site that showcased his range of work without the fluff. We built a minimalist Next.js/React website with a services section, photo gallery, free estimate form, and service area pages for Waco, China Spring, Woodway, and Hewitt.',
    result: 'Local Leads Flowing',
    tags: ['Next.js', 'React', 'Minimalist UI', 'Local SEO'],
    images: [
      { src: '/pages/home/references/clientProfiles/cen-texlandscaping/carousel/image-1.png', alt: 'Cen-Tex Landscaping homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/cen-texlandscaping/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/cen-texlandscaping/carousel/image-3.png', alt: 'Gallery', caption: '' },
      { src: '/pages/home/references/clientProfiles/cen-texlandscaping/carousel/image-4.png', alt: 'Contact', caption: '' },
    ],
    liveUrl: 'https://www.cen-texlandscaping.com',
  },
  {
    id: 'cen-tex-utilities',
    title: 'Cen-Tex Utilities',
    contactName: 'Billy Harrison',
    client: 'Cen-Tex Utilities',
    location: 'China Spring, TX',
    category: 'Web Design',
    year: '2024',
    shortDesc:
      'Minimalist Next.js/React website for a Central Texas utilities and infrastructure company serving municipalities and contractors.',
    fullDesc:
      'Billy needed a clean, authority-forward site built for commercial and municipal contacts. We built a minimalist Next.js/React website with a service breakdown, project portfolio, and a contact form designed for RFP and quote submissions. Local SEO targets utility and infrastructure searches across the Waco metro.',
    result: 'Commercial Leads In',
    tags: ['Next.js', 'React', 'Minimalist UI', 'B2B Design'],
    images: [
      { src: '/pages/home/references/clientProfiles/cen-texutilities/carousel/image-1.png', alt: 'Cen-Tex Utilities homepage', caption: '' },
      { src: '/pages/home/references/clientProfiles/cen-texutilities/carousel/image-2.png', alt: 'Services', caption: '' },
      { src: '/pages/home/references/clientProfiles/cen-texutilities/carousel/image-3.png', alt: 'Portfolio', caption: '' },
      { src: '/pages/home/references/clientProfiles/cen-texutilities/carousel/image-4.png', alt: 'Contact', caption: '' },
    ],
    liveUrl: 'https://cen-texutilities.com',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOFTWARE
// ─────────────────────────────────────────────────────────────────────────────
const softwareProjects: Project[] = [
  {
    id: 'scott-apps-invoicing',
    title: 'Scott Apps — Invoicing SaaS Platform',
    contactName: 'Joshua Feliciano',
    client: 'Scott Applications LLC',
    location: 'Waco, TX',
    category: 'Software',
    year: '2026',
    shortDesc:
      'Our own SaaS product — a clean, lightning-fast invoicing tool built for small businesses, freelancers, and contractors across Texas.',
    fullDesc:
      "Scott Apps is our own product, not a client job. A dead-simple invoicing platform: create and send professional invoices in under 60 seconds, track payments, auto-send reminders, and accept cards via Stripe. Built on Next.js 15, MongoDB, and deployed on Vercel. It's live, it's used, and it proves we don't just talk tech — we ship it.",
    result: 'Live SaaS Product',
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Vercel', 'TypeScript'],
    featured: true,
    images: [
      { src: '/pages/home/references/clientProfiles/scottapps/carousel/image-1.png', alt: 'Scott Apps invoicing dashboard', caption: '' },
      { src: '/pages/home/references/clientProfiles/scottapps/carousel/image-2.png', alt: 'Invoice creation', caption: '' },
      { src: '/pages/home/references/clientProfiles/scottapps/carousel/image-3.png', alt: 'Payment tracking', caption: '' },
    ],
    liveUrl: 'https://scottapps.com',
  },
  {
    id: 'waco-exchange',
    title: 'Waco Exchange — Multi-Marketplace Platform',
    contactName: 'Joshua Feliciano',
    client: 'Waco Exchange',
    location: 'Waco, TX',
    category: 'Software',
    year: '2022',
    shortDesc:
      'Custom-built multi-marketplace platform connecting buyers and sellers across Central Texas — our own full-stack product.',
    fullDesc:
      'Waco Exchange is our own internal platform build — a local multi-marketplace for Central Texas. Full-stack custom development: marketplace listings, user accounts, messaging, search & filter, and a mobile-first UI. Built on Next.js, MongoDB, and deployed on Vercel. Currently offline.',
    result: 'Platform Built',
    tags: ['Next.js', 'MongoDB', 'Full-Stack', 'Marketplace', 'TypeScript'],
    featured: true,
    offline: true,
    images: [
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-1.png', alt: 'Waco Exchange marketplace', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-2.png', alt: 'Listings', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-3.png', alt: 'Listing detail', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-4.png', alt: 'Mobile app', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-5.png', alt: 'Search & filter', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-6.png', alt: 'User profile', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-7.png', alt: 'Messaging', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-8.png', alt: 'Onboarding', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-9.png', alt: 'Settings', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-10.png', alt: 'Dashboard', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-11.png', alt: 'Admin panel', caption: '' },
      { src: '/pages/home/references/clientProfiles/wacoexchange/carousel/image-12.png', alt: 'Final screens', caption: '' },
    ],
  },
  {
    id: 'nexus-esports',
    title: 'Nexus e-Sports — Software & Site Setup',
    contactName: 'Zach Krizan',
    client: 'Nexus e-Sports',
    location: 'Waco, TX',
    category: 'Software',
    year: '2023',
    shortDesc:
      "Custom software development and website setup for Waco's premier gaming, dining, and entertainment venue — accessible via domain.",
    fullDesc:
      "Zach Krizan founded Nexus as a state-of-the-art gaming, esports, and entertainment hub in Downtown Waco, now operating at 1603 Washington Ave. The venue features an esports arena, a trading card game shop, and Save Point Sandwich Shop — all under one roof. We built custom software accessible via their domain — membership management, tournament registration, and event tooling. Also handled initial website setup. The primary deliverable here was the code and platform logic behind the scenes, not the front-end design.",
    result: 'Software Live',
    tags: ['Custom Software', 'Next.js', 'Membership System', 'Event Tools'],
    images: [
      { src: '/pages/home/references/clientProfiles/nexusesports/carousel/image-1.png', alt: 'Nexus e-Sports platform', caption: '' },
      { src: '/pages/home/references/clientProfiles/nexusesports/carousel/image-2.png', alt: 'Events & booking', caption: '' },
    ],
    liveUrl: 'https://www.nexuswaco.com',
  },
  {
    id: 'save-point-sandwich',
    title: 'Save Point Sandwich — Software & Site Setup',
    contactName: 'Zach Krizan',
    client: 'Save Point Sandwich',
    location: 'Waco, TX',
    category: 'Software',
    year: '2023',
    shortDesc:
      'Custom software and website setup for a retro gaming-themed sandwich shop inside Nexus Waco — online ordering and menu system accessible via domain.',
    fullDesc:
      "Save Point Sandwich Shop is a retro gaming-themed deli located inside Nexus Waco at 1603 Washington Ave. It was born out of Nexus to feed the hungry gamers who flooded the venue on event days, and has since grown into its own full restaurant with a cult following in Waco. We built the software backend and online ordering system accessible via their domain, alongside the website setup. Like Nexus, the primary work here was the code and ordering logic rather than the design layer.",
    result: 'Ordering System Live',
    tags: ['Custom Software', 'Online Ordering', 'Next.js', 'Site Setup'],
    images: [
      { src: '/pages/home/references/clientProfiles/savepointsandwich/carousel/image-1.png', alt: 'Save Point Sandwich platform', caption: '' },
    ],
    liveUrl: 'https://www.savepointsandwich.com',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_PROJECTS: Project[] = [
  ...webDesignProjects,
  ...softwareProjects,
];

export const PROJECTS_BY_CATEGORY: Record<ProjectCategory, Project[]> = {
  'Web Design': webDesignProjects,
  'Software': softwareProjects,
};

export const CATEGORIES: ProjectCategory[] = ['Web Design', 'Software'];

export default ALL_PROJECTS;