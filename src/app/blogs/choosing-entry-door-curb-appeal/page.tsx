
'use client';
import BlogHero from '#/BlogComponents/BlogHero/BlogHero';
import BlogBody, { BlogSection } from '#/BlogComponents/BlogBody/BlogBody';
import BlogCTA from '#/BlogComponents/BlogCTA/BlogCTA';
import NewsletterSignup from '#/BlogComponents/NewsletterSignup/NewsletterSignup';
import { faDoorOpen, faShieldHalved, faSun, faKey, faPaintRoller, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

const sections: BlogSection[] = [
  {
    type: 'prose',
    body: "Your entry door is the first handshake your home offers. In Central Texas it also has to handle UV, heat, and the occasional severe storm. Choosing well means balancing curb appeal, security, energy performance, and install quality — not just picking a pretty slab online.",
  },
  {
    type: 'cards',
    heading: 'What Matters Most',
    cards: [
      { icon: faDoorOpen, title: 'Material', body: 'Fiberglass resists dents and holds finish well in sun. Steel is strong and budget-friendly. Wood is beautiful but needs more maintenance in Texas heat.' },
      { icon: faShieldHalved, title: 'Security', body: 'Look for solid construction, quality multi-point or reinforced strike hardware, and smart lock compatibility if you want it.' },
      { icon: faSun, title: 'Glass packages', body: 'Decorative glass adds light and style. Low-E and insulated glass keep heat out while still showing off the design.' },
      { icon: faKey, title: 'Hardware & finish', body: 'Handlesets and finishes should match your home style and hold up to sun and hand oils. Finish warranties vary by brand.' },
      { icon: faPaintRoller, title: 'Color & style', body: 'A bold door color can transform a facade. Make sure the material accepts paint or comes in a durable factory finish.' },
      { icon: faHouseChimney, title: 'Weather sealing', body: 'Threshold, sweeps, and proper flashing matter as much as the door face. A beautiful door that leaks is still a failed install.' },
    ],
  },
  {
    type: 'table',
    heading: 'Material Snapshot',
    tableHeaders: ['Material', 'Best For', 'Watch-Outs'],
    tableRows: [
      ['Fiberglass', 'Most Waco homes, low maintenance', 'Higher cost than basic steel'],
      ['Steel', 'Budget + security', 'Can dent; finish care in sun'],
      ['Wood', 'Custom historic looks', 'More maintenance in Texas climate'],
    ],
  },
  {
    type: 'callout',
    calloutAccent: true,
    calloutText: "Pro Tip: If the frame is rotten or out of square, replace with a prehung unit — a new slab in a failed frame will not seal or operate correctly.",
  },
  {
    type: 'tips',
    heading: 'Before You Order',
    items: [
      'Measure the rough opening accurately (or schedule a free measurement)',
      'Decide slab-only vs full prehung based on frame condition',
      'Match glass privacy level to your front porch exposure',
      'Plan hardware finish with exterior lights and house numbers',
      'Confirm install includes threshold setup, exterior seal, and haul-away',
    ],
  },
];

export default function Page() {
  return (
    <>
      <BlogHero
        title="Choosing an Entry Door for Curb Appeal and Security"
        description="Material, glass, hardware, and weather sealing all matter. A practical guide to picking an entry door that looks great and performs in Central Texas weather."
        imageSrc="/pages/blogs/ac-replacement.jpg"
        imageAlt="Choosing an entry door for curb appeal in Waco TX"
        category="Doors"
        date="June 15, 2026"
        readTime={8}
      />
      <BlogBody sections={sections} />
      <BlogCTA
        title="Ready for a New Entry Door?"
        body="ClearView Windows & Doors installs fiberglass, steel, and wood entry doors with factory-certified crews across Central Texas."
        buttonText="Schedule an Entry Door Consult"
        buttonHref="/services/entry-door-installation"
      />
      <NewsletterSignup variant={1} spot="entry-door-curb-appeal-blog" />
    </>
  );
}
