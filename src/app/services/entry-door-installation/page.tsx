// ClearView Windows & Doors — Entry Door Installation Service Page
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
    { icon: faSearch, title: "Style & Security Fit", description: "We match door style, glass package, and hardware to your home and security needs." },
    { icon: faFileContract, title: "Complete Install Quote", description: "Door, frame, labor, weather seal, and haul-away included in writing." },
    { icon: faCheckCircle, title: "Weather-Tight Install", description: "Correct flashing and threshold setup so rain stays out and AC stays in." },
    { icon: faShieldHalved, title: "10-Year Installation Warranty", description: "Workmanship covered for a decade; product warranties supported for life." },
  ];

  const whyFeatures = [
    { icon: faClock, title: "Often Same-Week Install", description: "Many stock and quick-ship doors install within days of order." },
    { icon: faDoorOpen, title: "Curb Appeal + Efficiency", description: "A new entry door improves looks, security, and energy performance together." },
    { icon: faShieldHalved, title: "Factory-Certified", description: "Installs follow manufacturer specs so warranties stay valid." },
  ];

  const processSteps = [
    { number: 1, title: "Consult & Measure", description: "We measure the rough opening and review door styles on-site or in showroom samples.", icon: faHeadset },
    { number: 2, title: "Quote & Select", description: "Flat-rate quote with finish and hardware options. You approve before order.", icon: faSearch },
    { number: 3, title: "Install Day", description: "Old door and frame removed as needed, new unit set, sealed, and adjusted.", icon: faFileContract },
    { number: 4, title: "Final Adjust", description: "Locks, sweeps, and thresholds tuned; warranty registered.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 900, label: "Entry doors installed locally", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 99, label: "On-time install rate", suffix: "%", duration: 2 },
    { icon: faClock, value: 14, label: "Years of door installations", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for entry door installation.", badge: "Home Base" },
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
    { question: "How much does an entry door cost installed?", answer: "Most installed entry doors range $1,800–$5,500 depending on material, glass, and frame work." },
    { question: "Fiberglass vs steel doors?", answer: "Fiberglass resists dents and holds paint well in Texas sun. Steel is strong and budget-friendly. We help you choose." },
    { question: "Can you replace just the slab?", answer: "Sometimes — if the frame is sound. Often a full prehung unit seals better long-term." },
    { question: "Do you install storm doors?", answer: "Yes — storm and security storm doors can be added with your entry package." },
    { question: "How long does install take?", answer: "Most single entry doors are completed in one day." },
    { question: "Is the install warrantied?", answer: "Yes — 10-Year Installation Warranty plus manufacturer product coverage." },
  ];

  const crossServices = [
    { icon: faWindowMaximize, title: "Window Replacement", body: "Coordinate doors and windows for a consistent look.", link: "/services/window-replacement" },
    { icon: faBorderAll, title: "Patio & Sliding Doors", body: "Match rear openings to your new front entry.", link: "/services/patio-sliding-doors" },
    { icon: faLeaf, title: "Energy Efficiency Upgrades", body: "Weatherization that complements a new door.", link: "/services/energy-efficiency-upgrades" },
    { icon: faWrench, title: "Window Repair", body: "Fix failing windows while upgrading the entry.", link: "/services/window-repair" },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Entry Door Installation" },
      ]} />
      <SectionIntro
        title="Entry Door Installation in Waco, TX"
        subtitle="Steel, fiberglass, and wood entry doors with proper flashing, weather sealing, and curb-appeal hardware — factory-certified install and 10-Year Installation Warranty."
      />
      <TrustBar headline="3,500+ Central Texas installs — factory-certified, bonded & insured" />
      <div className={styles.section}><WhatToExpect sectionTitle="What to Expect" expectations={expectations} /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose ClearView" /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><GuaranteeSection /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/entry-door-installation" title="Entry Door Installation Across Central Texas" /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} title="Entry Door Installation FAQs" /></div>
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
        <Variant4 title="Schedule Your Entry Door Consultation" cityName="Waco" slug="services/entry-door-installation" spot="entry-door-page-form" formVariant={2} />
      </div>
    </main>
  );
}
