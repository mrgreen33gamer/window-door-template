
'use client';
import BlogHero from '#/BlogComponents/BlogHero/BlogHero';
import BlogBody, { BlogSection } from '#/BlogComponents/BlogBody/BlogBody';
import BlogCTA from '#/BlogComponents/BlogCTA/BlogCTA';
import NewsletterSignup from '#/BlogComponents/NewsletterSignup/NewsletterSignup';
import { faSun, faShieldHalved, faDollarSign, faWrench, faLeaf, faHouseChimney, faCheck } from '@fortawesome/free-solid-svg-icons';

const sections: BlogSection[] = [
  {
    type: 'prose',
    body: "Central Texas is hard on windows. Summer heat, UV, occasional high wind, and long cooling seasons punish cheap frames and poor glass packages. When homeowners ask whether to choose vinyl or fiberglass, the honest answer is: it depends on budget, opening size, and how long you plan to stay in the home. Here is how we explain it on free measurements across Waco, Temple, and Killeen.",
  },
  {
    type: 'cards',
    heading: 'How Vinyl and Fiberglass Compare',
    cards: [
      { icon: faDollarSign, title: 'Upfront cost', body: 'Vinyl typically wins on purchase price for standard residential openings. Fiberglass costs more but often holds value on larger or custom openings.' },
      { icon: faSun, title: 'Texas heat & UV', body: 'Both perform well with quality Low-E glass. Fiberglass expands less with temperature swings, which can mean more stable operation over decades.' },
      { icon: faShieldHalved, title: 'Strength & stability', body: 'Fiberglass frames are very strong relative to their weight. Vinyl is excellent for many homes when properly reinforced and installed.' },
      { icon: faWrench, title: 'Maintenance', body: 'Both are low-maintenance compared with wood. Keep weep holes clear and seals intact; avoid harsh solvents on vinyl.' },
      { icon: faLeaf, title: 'Energy performance', body: 'Frame material matters, but glass package and install quality often matter more for bills. Low-E dual-pane is the real comfort driver.' },
      { icon: faHouseChimney, title: 'Aesthetics', body: 'Both can look clean and modern. Fiberglass paints well for custom colors; vinyl colors are usually molded-in.' },
    ],
  },
  {
    type: 'table',
    heading: 'Quick Decision Guide',
    tableHeaders: ['Priority', 'Lean Vinyl', 'Lean Fiberglass'],
    tableRows: [
      ['Budget-sensitive full-home project', 'Yes', 'Maybe phased'],
      ['Large picture or multi-panel openings', 'Sometimes', 'Often better'],
      ['Maximum long-term stability', 'Good', 'Excellent'],
      ['Custom exterior color matching', 'Limited', 'Strong'],
      ['Typical Waco ranch openings', 'Excellent fit', 'Premium upgrade'],
    ],
  },
  {
    type: 'callout',
    calloutAccent: true,
    calloutText: "Pro Tip: A perfect frame with a sloppy install still drafts. Factory-certified install with proper flashing and insulation protects whatever material you choose.",
  },
  {
    type: 'tips',
    heading: 'What To Do Next',
    items: [
      'Get free measurements on the openings that feel hottest or draftiest first',
      'Compare glass packages (Low-E, SHGC, U-factor) not just frame brand names',
      'Ask for a written install scope: flashing, shims, insulation, exterior seal',
      'If budget is tight, phase west and south elevations before the whole house',
      'Confirm Lifetime Product Warranty Support and a real installation warranty',
    ],
  },
];

export default function Page() {
  return (
    <>
      <BlogHero
        title="Vinyl vs Fiberglass Windows in Texas: Which Should You Choose?"
        description="Texas heat, storms, and energy bills put different demands on window frames. Here is an honest comparison of vinyl and fiberglass for Central Texas homes."
        imageSrc="/pages/blogs/energy-savings.jpg"
        imageAlt="Vinyl vs fiberglass windows comparison for Texas homes"
        category="Guides"
        date="July 3, 2026"
        readTime={7}
      />
      <BlogBody sections={sections} />
      <BlogCTA
        title="Still Deciding Between Vinyl and Fiberglass?"
        body="Get a free in-home measurement from ClearView Windows & Doors — factory-certified installers serving Waco and Central Texas."
        buttonText="Schedule a Free Measurement"
        buttonHref="/services/window-replacement"
      />
      <NewsletterSignup variant={1} spot="vinyl-vs-fiberglass-blog" />
    </>
  );
}
