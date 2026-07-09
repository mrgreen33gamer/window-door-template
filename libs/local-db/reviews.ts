// libs/local-db/reviews.ts
// Static testimonials for ClearView Windows & Doors

export interface Review {
  name:     string;
  location: string;
  rating:   number;
  date:     string;
  text:     string;
  service?: string;
}

const reviews: Review[] = [
  {
    name:     'Marcus T.',
    location: 'Waco, TX',
    rating:   5,
    date:     'March 2026',
    service:  'Window Replacement',
    text:     "We replaced 14 single-pane windows with Low-E vinyl. ClearView measured carefully, the install crew was clean and on schedule, and our cooling bill dropped the first month. Pricing was upfront — no games.",
  },
  {
    name:     'Sandra K.',
    location: 'Hewitt, TX',
    rating:   5,
    date:     'February 2026',
    service:  'Entry Door Installation',
    text:     'Our old wood door was warping and leaking. ClearView installed a fiberglass entry door with a new frame and weather seal. Looks incredible and the house is quieter. Highly recommend Daniel and the crew.',
  },
  {
    name:     'James R.',
    location: 'Woodway, TX',
    rating:   5,
    date:     'January 2026',
    service:  'Patio & Sliding Doors',
    text:     'Sticky sliding door that never sealed. ClearView swapped it for a modern patio door with Low-E glass. Smooth operation, solid weather strip, and they hauled away the old unit. Fair price, great result.',
  },
  {
    name:     'Patricia L.',
    location: 'Temple, TX',
    rating:   5,
    date:     'December 2025',
    service:  'Energy Efficiency Upgrades',
    text:     'They helped us prioritize which windows to replace first based on solar heat gain. We did the west elevation only and already feel the difference. Honest advice instead of a hard sell for the whole house.',
  },
  {
    name:     'David M.',
    location: 'Killeen, TX',
    rating:   5,
    date:     'November 2025',
    service:  'Storm & Impact Windows',
    text:     'After the last windstorm we wanted better protection. ClearView walked us through impact options, installed on schedule, and the finish work was clean. Peace of mind for storm season.',
  },
  {
    name:     'Angela W.',
    location: 'China Spring, TX',
    rating:   5,
    date:     'October 2025',
    service:  'Window Repair',
    text:     'Fogged glass in two bedroom windows. ClearView repaired the seals/sashes without forcing a full replacement. Saved us money and fixed the problem. They are my go-to window company now.',
  },
  {
    name:     'Robert H.',
    location: 'Bellmead, TX',
    rating:   5,
    date:     'September 2025',
    service:  'Commercial Storefront',
    text:     'We hired ClearView for storefront glass and entry doors on a retail refresh. They coordinated after-hours so we stayed open, and the inspector signed off first pass. Professional from start to finish.',
  },
  {
    name:     'Cheryl B.',
    location: 'McGregor, TX',
    rating:   5,
    date:     'August 2025',
    service:  'Window Replacement',
    text:     'Full replacement on a 1970s ranch. Factory-certified crew, meticulous flashing, and they actually cleaned up better than most remodelers. Lifetime product support and a real installation warranty — that sold me.',
  },
];

export default reviews;
