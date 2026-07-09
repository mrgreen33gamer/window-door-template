// libs/local-db/reviews.ts
// ─────────────────────────────────────────────────────────────────────────────
// Static testimonials for Arctic Air HVAC — used by Testimonials component,
// schema markup, and aggregate rating in layout.tsx.
// ─────────────────────────────────────────────────────────────────────────────

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
    service:  'AC Replacement',
    text:     "Our old unit finally gave out in the middle of a Texas summer. Arctic Air had a new system installed within 48 hours. The tech explained everything clearly, pricing was upfront, and the house has never been this comfortable. I can't recommend them enough.",
  },
  {
    name:     'Sandra K.',
    location: 'Hewitt, TX',
    rating:   5,
    date:     'February 2026',
    service:  'Heating Repair',
    text:     'Woke up at 6am to a cold house with the heater completely out. Called Arctic Air and they had someone at my door by 9am. Fixed the same day, fair price. This is the kind of service you tell your neighbors about.',
  },
  {
    name:     'James R.',
    location: 'Woodway, TX',
    rating:   5,
    date:     'January 2026',
    service:  'Annual Maintenance Plan',
    text:     'Been on their maintenance plan for two years now. They come out twice a year, always on time, always thorough. Caught a refrigerant issue last fall before it became a $3,000 emergency. The plan pays for itself every single year.',
  },
  {
    name:     'Patricia L.',
    location: 'Robinson, TX',
    rating:   5,
    date:     'December 2025',
    service:  'New Installation',
    text:     'Had three companies quote us. Arctic Air was honest about what size system we actually needed — not just upselling the biggest unit. The install was clean, fast, and our energy bill dropped by almost 30% the first month.',
  },
  {
    name:     'David M.',
    location: 'China Spring, TX',
    rating:   5,
    date:     'November 2025',
    service:  'Duct Cleaning',
    text:     'We had duct cleaning done before winter and the difference in air quality was immediate. My wife has allergies and she said it was the best she\'d breathed indoors in years. Great crew, very professional, left the house spotless.',
  },
  {
    name:     'Angela W.',
    location: 'Temple, TX',
    rating:   5,
    date:     'October 2025',
    service:  'AC Repair',
    text:     'AC went down on a Friday afternoon. I expected to wait all weekend but they came out Friday evening, diagnosed the problem fast, and had the part the next morning. No after-hours gouge either — totally fair rate. My new HVAC company for life.',
  },
  {
    name:     'Robert H.',
    location: 'Killeen, TX',
    rating:   5,
    date:     'September 2025',
    service:  'Smart Thermostat Install',
    text:     'Got a Nest installed and properly configured by Arctic Air. They set up the schedule for our family and showed us how to use the app. The tech was patient and knowledgeable — didn\'t feel rushed at all. Highly recommend.',
  },
  {
    name:     'Cheryl B.',
    location: 'Waco, TX',
    rating:   5,
    date:     'August 2025',
    service:  'Emergency Repair',
    text:     'Called them at 10pm on a 102-degree day when our AC died. They answered immediately, had someone out within the hour, and fixed it that night. I have two small kids at home — this company genuinely saved us. Thank you.',
  },
];

export default reviews;