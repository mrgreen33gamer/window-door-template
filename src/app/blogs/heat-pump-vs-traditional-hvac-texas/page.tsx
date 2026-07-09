'use client';
import BlogHero from '#/BlogComponents/BlogHero/BlogHero';
import BlogBody, { BlogSection } from '#/BlogComponents/BlogBody/BlogBody';
import BlogCTA from '#/BlogComponents/BlogCTA/BlogCTA';
import NewsletterSignup from '#/BlogComponents/NewsletterSignup/NewsletterSignup';
import { faLeaf, faBolt, faSnowflake, faFire } from '@fortawesome/free-solid-svg-icons';

const sections: BlogSection[] = [
  {
    type: 'prose',
    body: 'Heat pumps are everywhere in the news — but are they right for Central Texas summers and mild winters?',
  },
  {
    type: 'cards',
    heading: 'Heat Pump vs Traditional HVAC – Side-by-Side',
    cards: [
      { icon: faLeaf, title: 'Energy Efficiency', body: 'Heat pumps are 2–3x more efficient than traditional systems.' },
      { icon: faBolt, title: 'Cooling Power', body: 'Traditional AC wins in 100°F+ Texas heat.' },
      { icon: faSnowflake, title: 'Heating', body: 'Heat pumps work great down to about 25°F — perfect for Waco winters.' },
      { icon: faFire, title: 'Upfront Cost', body: 'Heat pump systems cost $2,000–$4,000 more to install.' },
    ],
  },
  {
    type: 'table',
    heading: 'Cost & Performance Comparison (Central Texas)',
    tableHeaders: ['Category', 'Traditional HVAC', 'Heat Pump'],
    tableRows: [
      ['Cooling efficiency', 'Good', 'Excellent'],
      ['Heating efficiency', 'Good', 'Excellent'],
      ['Upfront cost', 'Lower', 'Higher'],
      ['Annual energy savings', 'Baseline', '30–50% lower'],
      ['Best for Waco winters', 'Yes', 'Yes'],
    ],
  },
  {
    type: 'callout',
    calloutAccent: true,
    calloutText: 'For most Waco homes a hybrid system (heat pump + gas furnace backup) gives the best of both worlds.',
  },
];

export default function Page() {
  return (
    <>
      <BlogHero
        title="Heat Pump vs. Traditional HVAC: What Makes Sense for Texas Homes in 2026?"
        description="Heat pumps are the hot new thing — but are they right for Central Texas summers and mild winters? Real pros, cons, and costs for Waco-area homeowners."
        imageSrc="/pages/blogs/heat-pump.jpg"
        imageAlt="Heat pump vs traditional HVAC comparison for Texas homes"
        category="Installation"
        date="April 10, 2026"
        readTime={8}
      />
      <BlogBody sections={sections} />
      <BlogCTA
        title="Not Sure Which System Is Right for Your Home?"
        body="Get a free HVAC consultation from Scott Applications."
        buttonText="Get Free Consultation"
        buttonHref="/services/installation/waco-tx"
      />
      <NewsletterSignup variant={1} spot="heat-pump-blog" />
    </>
  );
}