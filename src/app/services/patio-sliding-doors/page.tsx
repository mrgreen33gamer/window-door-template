// ClearView Windows & Doors — Patio & Sliding Doors Service Page
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
    { icon: faSearch, title: "Opening Assessment", description: "We check sill condition, header, and clearances before recommending a system." },
    { icon: faFileContract, title: "All-In Pricing", description: "Door, labor, sealing, and disposal in one written number." },
    { icon: faCheckCircle, title: "Smooth, Square Install", description: "Correct rollers, tracks, and weather seals for daily use." },
    { icon: faShieldHalved, title: "10-Year Installation Warranty", description: "Workmanship guaranteed for ten years." },
  ];

  const whyFeatures = [
    { icon: faClock, title: "Minimal Home Disruption", description: "Most patio door swaps complete in a single day." },
    { icon: faBorderAll, title: "Sliding or Hinged Options", description: "We help you choose based on traffic, furniture layout, and energy goals." },
    { icon: faShieldHalved, title: "Texas-Ready Glass", description: "Low-E packages reduce heat gain on west-facing openings." },
  ];

  const processSteps = [
    { number: 1, title: "Measure & Recommend", description: "On-site measurement with option walkthrough.", icon: faHeadset },
    { number: 2, title: "Quote & Order", description: "Written package price; product ordered after approval.", icon: faSearch },
    { number: 3, title: "Install", description: "Old unit removed, new door set, sealed, adjusted.", icon: faFileContract },
    { number: 4, title: "Walkthrough", description: "Operation demo and warranty registration.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 700, label: "Patio and sliding doors installed", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 97, label: "First-visit completion rate", suffix: "%", duration: 2 },
    { icon: faClock, value: 14, label: "Years of outdoor-living installs", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for patio & sliding doors.", badge: "Home Base" },
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
    { question: "Sliding vs French patio doors?", answer: "Sliding saves swing space. French doors offer a classic look and wide opening. We size both for your opening." },
    { question: "Can you fix a sticky slider instead of replace?", answer: "Sometimes — track and roller repair can help. If the frame is bowed or seals failed, replacement is usually better." },
    { question: "Do patio doors come with Low-E glass?", answer: "Yes — Low-E dual-pane packages are standard on most of our installs." },
    { question: "How much do patio doors cost?", answer: "Installed patio/sliding doors commonly range $2,500–$7,500 depending on size and glass." },
    { question: "Will you haul away the old door?", answer: "Yes — included in our install quotes." },
    { question: "Is financing available?", answer: "Ask about current financing partners when we quote — options vary by credit and project size." },
  ];

  const crossServices = [
    { icon: faWindowMaximize, title: "Window Replacement", body: "Match patio glass to new windows.", link: "/services/window-replacement" },
    { icon: faDoorOpen, title: "Entry Door Installation", body: "Front entry that matches rear patio style.", link: "/services/entry-door-installation" },
    { icon: faShieldHalved, title: "Storm & Impact Windows", body: "Add protection on exposed elevations.", link: "/services/storm-impact-windows" },
    { icon: faLeaf, title: "Energy Efficiency Upgrades", body: "Weatherization around outdoor living spaces.", link: "/services/energy-efficiency-upgrades" },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Patio & Sliding Doors" },
      ]} />
      <SectionIntro
        title="Patio & Sliding Doors in Waco, TX"
        subtitle="Patio, French, and sliding glass doors that operate smoothly and seal tight — Low-E glass options and factory-certified installation."
      />
      <TrustBar headline="3,500+ Central Texas installs — factory-certified, bonded & insured" />
      <div className={styles.section}><WhatToExpect sectionTitle="What to Expect" expectations={expectations} /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose ClearView" /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><GuaranteeSection /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/patio-sliding-doors" title="Patio & Sliding Doors Across Central Texas" /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} title="Patio & Sliding Doors FAQs" /></div>
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
        <Variant4 title="Schedule Your Patio Door Measurement" cityName="Waco" slug="services/patio-sliding-doors" spot="patio-doors-page-form" formVariant={2} />
      </div>
    </main>
  );
}
