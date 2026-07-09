'use client';
import BlogHero from '#/BlogComponents/BlogHero/BlogHero';
import BlogBody, { BlogSection } from '#/BlogComponents/BlogBody/BlogBody';
import BlogCTA from '#/BlogComponents/BlogCTA/BlogCTA';
import NewsletterSignup from '#/BlogComponents/NewsletterSignup/NewsletterSignup';
import { faDollarSign, faTools, faThermometerHalf, faClock, faExclamationTriangle, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const sections: BlogSection[] = [
  {
    type: 'prose',
    body: "Waco summers push your AC to the limit. When repair bills keep coming, it's time to ask the big question: repair or replace?",
  },
  {
    type: 'cards',
    heading: '7 Signs Your AC Needs Replacing (Not Just Repairing)',
    cards: [
      { icon: faDollarSign, title: 'Repair bills over $500 twice in one year', body: 'If you’ve already spent more than half the cost of a new unit, it’s time to replace.' },
      { icon: faThermometerHalf, title: 'Uneven cooling or hot spots', body: 'Your system can’t keep up with Texas heat anymore.' },
      { icon: faSnowflake, title: 'Age 10+ years old', body: 'Most AC units last 10–15 years. After that efficiency drops dramatically.' },
      { icon: faExclamationTriangle, title: 'Frequent breakdowns', body: 'More than 2 repairs in a season is a red flag.' },
      { icon: faClock, title: 'Rising energy bills', body: 'Your old unit is working harder and costing you more every month.' },
      { icon: faTools, title: 'Strange noises or smells', body: 'Grinding, rattling, or burning smells mean major internal failure.' },
    ],
  },
  {
    type: 'table',
    heading: 'Repair vs Replace Cost Comparison (Waco 2026)',
    tableHeaders: ['Factor', 'Repair', 'New High-Efficiency AC'],
    tableRows: [
      ['Upfront cost', '$300–$800', '$4,500–$7,500 (installed)'],
      ['Monthly energy bill', 'Higher', '20–40% lower'],
      ['Warranty', '30–90 days', '10-year parts + labor'],
      ['Break-even', 'Never', '18–36 months'],
    ],
  },
  {
    type: 'callout',
    calloutAccent: true,
    calloutText: 'Pro Tip: In Central Texas, replacing with a 16+ SEER unit can save you $300–$600 per year on your electric bill.',
  },
  {
    type: 'tips',
    heading: 'What to Do Next in Waco',
    items: [
      'Get a free second opinion from a local HVAC pro',
      'Ask about financing and rebates',
      'Check your current SEER rating',
    ],
  },
];

export default function Page() {
  return (
    <>
      <BlogHero
        title="7 Signs Your AC Unit Needs Replacing in Waco, TX"
        description="Texas heat is brutal on AC systems. Here are the 7 clear warning signs it’s time to replace — not just repair."
        imageSrc="/pages/blogs/ac-replacement.jpg"
        imageAlt="Signs your air conditioner needs replacing in Waco TX"
        category="AC"
        date="April 18, 2026"
        readTime={7}
      />
      <BlogBody sections={sections} />
      <BlogCTA
        title="Need a New AC in Waco?"
        body="Get a free quote from Scott Applications — local Waco HVAC experts."
        buttonText="Get Free Quote"
        buttonHref="/services/ac-repair/waco-tx"
      />
      <NewsletterSignup variant={1} spot="ac-replacement-blog" />
    </>
  );
}