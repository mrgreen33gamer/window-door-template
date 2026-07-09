
'use client';
import BlogHero from '#/BlogComponents/BlogHero/BlogHero';
import BlogBody, { BlogSection } from '#/BlogComponents/BlogBody/BlogBody';
import BlogCTA from '#/BlogComponents/BlogCTA/BlogCTA';
import NewsletterSignup from '#/BlogComponents/NewsletterSignup/NewsletterSignup';
import { faBolt, faTemperatureHigh, faWind, faDroplet, faChartLine, faHouseChimney, faSun } from '@fortawesome/free-solid-svg-icons';

const sections: BlogSection[] = [
  {
    type: 'prose',
    body: "When the electric bill spikes every summer, most homeowners blame the AC first. Fair — but single-pane glass, failed dual-pane seals, and drafty frames can force your system to run longer than it should. Here is how to tell when windows are a major part of the energy problem in Waco and Central Texas.",
  },
  {
    type: 'cards',
    heading: 'Signs Your Windows Are Costing You',
    cards: [
      { icon: faSun, title: 'Rooms that bake by 3pm', body: 'West and south rooms stay hot even when the thermostat is satisfied — classic solar heat gain through old glass.' },
      { icon: faWind, title: 'Drafts at the sash', body: 'Moving curtains near closed windows or feeling air at the lock rail means seals or weatherstrip have failed.' },
      { icon: faDroplet, title: 'Fog between panes', body: 'Moisture inside a dual-pane unit means the sealed insulated glass unit failed — efficiency is gone.' },
      { icon: faTemperatureHigh, title: 'Hot glass to the touch', body: 'Modern Low-E glass stays cooler in summer sun. Hot single-pane glass dumps heat into the room.' },
      { icon: faChartLine, title: 'Bills climbing year over year', body: 'If usage is up without a rate hike or lifestyle change, the building envelope is a prime suspect.' },
      { icon: faHouseChimney, title: 'Original 70s–90s windows', body: 'Many Central Texas homes still run original aluminum single-pane or early dual-pane with degraded seals.' },
    ],
  },
  {
    type: 'table',
    heading: 'Repair vs Replace for Energy',
    tableHeaders: ['Situation', 'Try First', 'Usually Replace'],
    tableRows: [
      ['One fogged pane, solid frame', 'IGU / sash repair', 'If multiple units failed'],
      ['Whole elevation is single-pane', 'N/A', 'Replace that elevation'],
      ['Drafts at weatherstrip only', 'Weatherization', 'If frame is warped'],
      ['AC oversized but still struggles', 'Envelope audit', 'Windows + other leaks'],
    ],
  },
  {
    type: 'callout',
    calloutAccent: true,
    calloutText: "Pro Tip: Replace the worst elevations first. A phased Low-E plan on west and south walls often delivers the best comfort per dollar.",
  },
  {
    type: 'tips',
    heading: 'Smart Next Steps',
    items: [
      'Note which rooms feel hottest and at what time of day',
      'Check for fogged glass and failed locks or balances',
      'Ask for a free measurement with SHGC/U-factor recommendations',
      'Compare a full-home quote vs a phased west/south plan',
      'Pair window work with basic weatherization at doors and attic access',
    ],
  },
];

export default function Page() {
  return (
    <>
      <BlogHero
        title="When to Replace Windows Because of High Energy Bills"
        description="Rising cooling costs, fogged glass, and drafts are not always a new HVAC problem. Learn when windows are the real energy leak — and what to replace first."
        imageSrc="/pages/blogs/seer-rating.jpg"
        imageAlt="When to replace windows for energy savings in Waco TX"
        category="Energy"
        date="June 24, 2026"
        readTime={6}
      />
      <BlogBody sections={sections} />
      <BlogCTA
        title="Want an Honest Energy-Focused Plan?"
        body="ClearView Windows & Doors provides free measurements and phased upgrade plans for Central Texas homes."
        buttonText="Book an Efficiency Assessment"
        buttonHref="/services/energy-efficiency-upgrades"
      />
      <NewsletterSignup variant={1} spot="energy-bills-windows-blog" />
    </>
  );
}
