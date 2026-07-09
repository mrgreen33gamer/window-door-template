// libs/blog-posts.ts
export interface BlogPost {
  slug:      string;
  title:     string;
  excerpt:   string;
  category:  string;
  date:      string;
  readTime:  number;
  imageSrc:  string;
  imageAlt:  string;
  featured?: boolean;
}

const ALL_POSTS: BlogPost[] = [
  {
    slug:     'vinyl-vs-fiberglass-windows-texas',
    title:    'Vinyl vs Fiberglass Windows in Texas: Which Should You Choose?',
    excerpt:  'Texas heat, storms, and energy bills put different demands on window frames. Here is an honest comparison of vinyl and fiberglass for Central Texas homes.',
    category: 'Guides',
    date:     'July 3, 2026',
    readTime: 7,
    imageSrc: '/pages/home/welcome/after.jpg',
    imageAlt: 'Vinyl vs fiberglass windows comparison for Texas homes',
    featured: true,
  },
  {
    slug:     'when-to-replace-windows-energy-bills',
    title:    'When to Replace Windows Because of High Energy Bills',
    excerpt:  'Rising cooling costs, fogged glass, and drafts are not always a new HVAC problem. Learn when windows are the real energy leak — and what to replace first.',
    category: 'Energy',
    date:     'June 24, 2026',
    readTime: 6,
    imageSrc: '/pages/home/welcome/before.jpg',
    imageAlt: 'When to replace windows for energy savings in Waco TX',
  },
  {
    slug:     'choosing-entry-door-curb-appeal',
    title:    'Choosing an Entry Door for Curb Appeal and Security',
    excerpt:  'Material, glass, hardware, and weather sealing all matter. A practical guide to picking an entry door that looks great and performs in Central Texas weather.',
    category: 'Doors',
    date:     'June 15, 2026',
    readTime: 8,
    imageSrc: '/pages/home/welcome/hero-main.jpg',
    imageAlt: 'Choosing an entry door for curb appeal in Waco TX',
  },
];

export function getAllPosts(): BlogPost[] { return ALL_POSTS; }
export function getRecentPosts(count: number = 3): BlogPost[] { return ALL_POSTS.slice(0, count); }
export function getFeaturedPost(): BlogPost { return ALL_POSTS.find((p) => p.featured) ?? ALL_POSTS[0]; }
export function getPostsByCategory(category: string): BlogPost[] { return ALL_POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase()); }
export function getPostBySlug(slug: string): BlogPost | undefined { return ALL_POSTS.find((p) => p.slug === slug); }
export function getAllCategories(): string[] { return Array.from(new Set(ALL_POSTS.map((p) => p.category))); }
export function getAllSlugs(): string[] { return ALL_POSTS.map((p) => p.slug); }
