// ClearView Windows & Doors — Energy Efficiency Upgrades Service Page
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
    { icon: faSearch, title: "Priority Assessment", description: "We identify which openings leak the most heat and air first." },
    { icon: faFileContract, title: "Phased Budget Options", description: "Upgrade the worst elevations first if a full-home project is not in budget." },
    { icon: faCheckCircle, title: "Measurable Comfort Gains", description: "Less solar heat gain, fewer drafts, quieter rooms." },
    { icon: faShieldHalved, title: "Warrantied Installs", description: "Efficiency upgrades installed to manufacturer specs." },
  ];

  const whyFeatures = [
    { icon: faClock, title: "Faster ROI Focus", description: "We target west/south elevations and failed units for quickest comfort gains." },
    { icon: faLeaf, title: "Texas Heat Smart", description: "Glass packages chosen for solar heat gain in Central Texas summers." },
    { icon: faShieldHalved, title: "Factory-Certified", description: "Install quality that protects product performance ratings." },
  ];

  const processSteps = [
    { number: 1, title: "Energy Goals Call", description: "Discuss bills, hot rooms, and budget.", icon: faHeadset },
    { number: 2, title: "Home Walkthrough", description: "Measure priority openings and recommend a phased plan.", icon: faSearch },
    { number: 3, title: "Upgrade Install", description: "Replace or weatherize according to plan.", icon: faFileContract },
    { number: 4, title: "Results Review", description: "Walk through comfort improvements and maintenance tips.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 3500, label: "Total efficiency-focused installs", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 20, label: "Typical cooling load reduction potential", suffix: "%+", duration: 2 },
    { icon: faClock, value: 14, label: "Years improving Central Texas comfort", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for energy efficiency upgrades.", badge: "Home Base" },
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
    { question: "Will new windows pay for themselves?", answer: "Payback varies by utility rates, home orientation, and current window condition. Comfort and noise reduction are immediate benefits; bill savings accumulate over years." },
    { question: "Can I upgrade glass without replacing frames?", answer: "Sometimes glass-only swaps work; often full unit replacement performs better. We advise honestly after inspection." },
    { question: "What is Low-E glass?", answer: "Low-emissivity coatings reflect infrared heat while letting visible light through — critical for Texas summers." },
    { question: "Do you help with rebate paperwork?", answer: "When utility rebates are available we provide product documentation. Programs change — we note current options at quote time." },
    { question: "Should I do windows or attic insulation first?", answer: "Both matter. If attic insulation is severely lacking, address it too. We focus on openings; we can recommend partners for other envelope work." },
    { question: "Can efficiency upgrades be financed?", answer: "Ask about financing options when we prepare your quote." },
  ];

  const crossServices = [
    { icon: faWindowMaximize, title: "Window Replacement", body: "Full-home Low-E replacement packages.", link: "/services/window-replacement" },
    { icon: faDoorOpen, title: "Entry Door Installation", body: "Stop entry drafts with a modern door.", link: "/services/entry-door-installation" },
    { icon: faWrench, title: "Window Repair", body: "Fix failed seals before full upgrade.", link: "/services/window-repair" },
    { icon: faShieldHalved, title: "Storm & Impact Windows", body: "Protection plus efficiency on exposed sides.", link: "/services/storm-impact-windows" },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Energy Efficiency Upgrades" },
      ]} />
      <SectionIntro
        title="Energy Efficiency Upgrades in Waco, TX"
        subtitle="Low-E retrofits, weatherization, and targeted upgrades that cut cooling costs and improve comfort room by room."
      />
      <TrustBar headline="3,500+ Central Texas installs — factory-certified, bonded & insured" />
      <div className={styles.section}><WhatToExpect sectionTitle="What to Expect" expectations={expectations} /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose ClearView" /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><GuaranteeSection /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/energy-efficiency-upgrades" title="Energy Efficiency Upgrades Across Central Texas" /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} title="Energy Efficiency Upgrades FAQs" /></div>
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
        <Variant4 title="Schedule an Efficiency Assessment" cityName="Waco" slug="services/energy-efficiency-upgrades" spot="energy-efficiency-page-form" formVariant={2} />
      </div>
    </main>
  );
}
