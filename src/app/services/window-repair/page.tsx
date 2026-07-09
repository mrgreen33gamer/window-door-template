// ClearView Windows & Doors — Window Repair Service Page
"use client";

import styles from "../page.module.scss";
import reviews from '&/local-db/reviews';

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import Testimonials        from "#/PageComponents/Testimonials/Testimonials";
import GuaranteeSection    from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant4            from "#/PageComponents/ContactForms/Variant4/Form";

import {
  faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faWrench, faTrophy, faChartLine,
  faWindowMaximize, faDoorOpen, faBorderAll, faLeaf,
} from "@fortawesome/free-solid-svg-icons";

export default function ServicePage() {

  const expectations = [
    { icon: faSearch, title: "Honest Diagnosis", description: "We tell you if repair is smart or if replacement is the better long-term value." },
    { icon: faFileContract, title: "Clear Repair Pricing", description: "Parts and labor quoted before work starts." },
    { icon: faCheckCircle, title: "Quality Parts", description: "Balances, locks, and glass packages matched to your unit when available." },
    { icon: faShieldHalved, title: "Warrantied Labor", description: "Repair labor backed by our installation standards." },
  ];

  const whyFeatures = [
    { icon: faClock, title: "Fast Scheduling", description: "Many repairs completed in a single visit once parts are available." },
    { icon: faWrench, title: "Repair When It Makes Sense", description: "We will not push full replacement if a targeted fix is appropriate." },
    { icon: faShieldHalved, title: "Factory-Aware Techs", description: "We understand common vinyl and aluminum system failures." },
  ];

  const processSteps = [
    { number: 1, title: "Describe the Issue", description: "Call or book online with photos if possible.", icon: faHeadset },
    { number: 2, title: "On-Site Diagnosis", description: "We inspect seals, sashes, balances, and frames.", icon: faSearch },
    { number: 3, title: "Approve & Repair", description: "Written price; repair completed same visit when parts allow.", icon: faFileContract },
    { number: 4, title: "Test & Clean", description: "Operation tested; area cleaned up.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 1200, label: "Window repairs completed", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 95, label: "Same-visit completion when parts stocked", suffix: "%", duration: 2 },
    { icon: faClock, value: 14, label: "Years diagnosing window failures", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for window repair.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full coverage throughout Hewitt.",                     badge: "" },
    { town: "Woodway",      benefit: "Regular availability for Woodway homes.",              badge: "" },
    { town: "Temple",       benefit: "Bell County coverage — permit-ready installs.",        badge: "" },
    { town: "China Spring", benefit: "Rural coverage for larger homes.",                     badge: "" },
    { town: "Killeen",      benefit: "Full coverage for Killeen and Fort Cavazos area.",     badge: "" },
  ];

  const comparisonRows = [
    { feature: "Free in-home measurement before quote", us: "✅ Always", others: "❌ Often skipped" },
    { feature: "Factory-certified install crews",       us: "✅ All jobs", others: "❌ Varies" },
    { feature: "Flat-rate quote (product + labor)",     us: "✅ Written", others: "❌ Hourly + extras" },
    { feature: "10-Year Installation Warranty",         us: "✅ Every install", others: "❌ Rare" },
    { feature: "Lifetime Product Warranty Support",     us: "✅ Manufacturer-backed", others: "❌ Limited" },
  ];

  const faq = [
    { question: "Can fogged double-pane glass be repaired?", answer: "Sometimes the sealed unit can be replaced without a full frame swap. If the frame is failed, full replacement may be better." },
    { question: "How much does window repair cost?", answer: "Simple hardware repairs may be a few hundred dollars; glass unit replacements vary by size. We quote after inspection." },
    { question: "When should I replace instead of repair?", answer: "Multiple failed units, rotten frames, or inefficient single-pane systems usually favor replacement." },
    { question: "Do you repair all brands?", answer: "We repair most common residential systems. Some discontinued brands may require creative parts sourcing." },
    { question: "Is repair warrantied?", answer: "Labor on repairs is warrantied; part warranties follow manufacturer terms." },
    { question: "Can you re-caulk and weatherstrip only?", answer: "Yes — weatherization repairs are available when full product replacement is not needed." },
  ];

  const crossServices = [
    { icon: faWindowMaximize, title: "Window Replacement", body: "When repair no longer pencils out.", link: "/services/window-replacement" },
    { icon: faLeaf, title: "Energy Efficiency Upgrades", body: "Weatherization and selective upgrades.", link: "/services/energy-efficiency-upgrades" },
    { icon: faDoorOpen, title: "Entry Door Installation", body: "Fix drafts at the front door too.", link: "/services/entry-door-installation" },
    { icon: faBorderAll, title: "Patio & Sliding Doors", body: "Repair or replace sticky patio doors.", link: "/services/patio-sliding-doors" },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Window Repair" },
      ]} />
      <SectionIntro
        title="Window Repair in Waco, TX"
        subtitle="Fogged glass, failed seals, broken balances, and hardware repairs — honest guidance when replacement is not yet needed."
      />
      <TrustBar headline="3,500+ Central Texas installs — factory-certified, bonded & insured" />
      <div className={styles.section}><WhatToExpect sectionTitle="What to Expect" expectations={expectations} /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose ClearView" /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><GuaranteeSection /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/window-repair" title="Window Repair Across Central Texas" /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} title="Window Repair FAQs" /></div>
      <CTABanner
        headline="Ready to Get Started?"
        subline="Free measurement. Flat-rate quotes. Factory-certified installers. Call (254) 740-3300."
        primaryText="Call Us Now"
        primaryLink="tel:+12547403300"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />
      <div className={styles.section}><ServiceCardComponent heading="Other Services You Might Need" cards={crossServices} /></div>
      <div className={styles.section}>
        <Variant4 title="Schedule Window Repair Service" cityName="Waco" slug="services/window-repair" spot="window-repair-page-form" formVariant={2} />
      </div>
    </main>
  );
}
