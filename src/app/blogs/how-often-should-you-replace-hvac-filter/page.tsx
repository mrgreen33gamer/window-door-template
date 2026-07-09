'use client';
import BlogHero from '#/BlogComponents/BlogHero/BlogHero';
import BlogBody, { BlogSection } from '#/BlogComponents/BlogBody/BlogBody';
import BlogCTA from '#/BlogComponents/BlogCTA/BlogCTA';
import NewsletterSignup from '#/BlogComponents/NewsletterSignup/NewsletterSignup';

const sections: BlogSection[] = [
  {
    type: 'prose',
    body: 'In Central Texas the air is full of dust, pollen, and cedar. Your HVAC filter works overtime.',
  },
  {
    type: 'tips',
    heading: 'Recommended Replacement Schedule for Waco / Central Texas',
    items: [
      'Standard 1" fiberglass filter → every 30 days during summer',
      'Pleated 3–4" MERV 8–11 filter → every 60–90 days',
      'High-efficiency MERV 13+ filter → every 90 days',
      'If you have pets or allergies → cut all times in half',
      'Check filter monthly — if it looks dirty, change it',
    ],
  },
  {
    type: 'cards',
    heading: 'What Happens When You Wait Too Long',
    cards: [
      { title: 'Higher energy bills', body: 'Dirty filter forces your system to work 15–20% harder.' },
      { title: 'Reduced indoor air quality', body: 'Dust, pollen, and allergens blow straight into your home.' },
      { title: 'Shorter system lifespan', body: 'Your AC or furnace can fail years earlier.' },
      { title: 'Frozen coils', body: 'Restricted airflow is the #1 cause of frozen evaporator coils.' },
    ],
  },
  {
    type: 'callout',
    calloutAccent: true,
    calloutText: 'Dirty filters can increase your energy bill by 15% and make your AC work 2–3x harder.',
  },
];

export default function Page() {
  return (
    <>
      <BlogHero
        title="How Often Should You Replace Your HVAC Filter in Central Texas?"
        description="Texas dust, pollen, cedar, and summer heat destroy filters fast. Here’s the honest schedule for Waco, Temple, and Killeen homes."
        imageSrc="/pages/blogs/hvac-filter.jpg"
        imageAlt="HVAC air filter replacement guide for Central Texas homes"
        category="Maintenance"
        date="April 14, 2026"
        readTime={6}
      />
      <BlogBody sections={sections} />
      <BlogCTA
        title="Need Professional HVAC Maintenance?"
        body="Let us handle your filter changes and full system tune-ups."
        buttonText="Schedule Maintenance"
        buttonHref="/services/maintenance/waco-tx"
      />
      <NewsletterSignup variant={1} spot="hvac-filter-blog" />
    </>
  );
}