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
    slug:     'signs-ac-needs-replacement-waco-tx',
    title:    '7 Signs Your AC Unit Needs Replacing in Waco, TX (Not Just Repairing)',
    excerpt:  'Texas heat is brutal on AC systems. Here are the 7 clear warning signs it’s time to replace — not just repair — before your next $500 breakdown.',
    category: 'AC',
    date:     'April 18, 2026',
    readTime: 7,
    imageSrc: '/pages/blogs/ac-replacement.jpg',
    imageAlt: 'Signs your air conditioner needs replacing in Waco TX',
    featured: true,
  },
  {
    slug:     'how-often-should-you-replace-hvac-filter',
    title:    'How Often Should You Replace Your HVAC Filter in Central Texas?',
    excerpt:  'Texas dust, pollen, cedar, and summer heat destroy filters fast. Here’s the honest schedule for Waco, Temple, and Killeen homes — plus what happens when you wait too long.',
    category: 'Maintenance',
    date:     'April 14, 2026',
    readTime: 6,
    imageSrc: '/pages/blogs/hvac-filter.jpg',
    imageAlt: 'HVAC air filter replacement guide for Central Texas homes',
  },
  {
    slug:     'heat-pump-vs-traditional-hvac-texas',
    title:    'Heat Pump vs. Traditional HVAC: What Makes Sense for Texas Homes in 2026?',
    excerpt:  'Heat pumps are the hot new thing — but are they right for Central Texas summers and mild winters? Real pros, cons, and costs for Waco-area homeowners.',
    category: 'Installation',
    date:     'April 10, 2026',
    readTime: 8,
    imageSrc: '/pages/blogs/heat-pump.jpg',
    imageAlt: 'Heat pump vs traditional HVAC comparison for Texas homes',
  },
];

export function getAllPosts(): BlogPost[] { return ALL_POSTS; }
export function getRecentPosts(count: number = 3): BlogPost[] { return ALL_POSTS.slice(0, count); }
export function getFeaturedPost(): BlogPost { return ALL_POSTS.find((p) => p.featured) ?? ALL_POSTS[0]; }
export function getPostsByCategory(category: string): BlogPost[] { return ALL_POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase()); }
export function getPostBySlug(slug: string): BlogPost | undefined { return ALL_POSTS.find((p) => p.slug === slug); }
export function getAllCategories(): string[] { return Array.from(new Set(ALL_POSTS.map((p) => p.category))); }
export function getAllSlugs(): string[] { return ALL_POSTS.map((p) => p.slug); }