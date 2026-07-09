// ClearView Windows & Doors — Services Overview
"use client";

import styles from "./page.module.scss";
import reviews from '&/local-db/reviews';

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import GuaranteeSection    from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import Testimonials        from "#/PageComponents/Testimonials/Testimonials";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import Variant2            from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faWindowMaximize, faDoorOpen, faBorderAll, faShieldHalved, faWrench, faLeaf,
  faTrophy, faChartLine, faClock,
  faHeadset, faSearch, faFileContract, faCheckCircle,
  faLock, faRotateLeft, faTag,
} from "@fortawesome/free-solid-svg-icons";

export default function ServicesPage() {

  const services = [
    { icon: faWindowMaximize, title: "Window Replacement", body: "Full-home and partial replacements with Low-E vinyl, fiberglass, and wood-clad options built for Texas heat.", link: "/services/window-replacement" },
    { icon: faDoorOpen, title: "Entry Door Installation", body: "Steel, fiberglass, and wood entry doors with proper flashing, weather sealing, and curb-appeal hardware.", link: "/services/entry-door-installation" },
    { icon: faBorderAll, title: "Patio & Sliding Doors", body: "Patio, French, and sliding glass doors that operate smoothly and seal tight.", link: "/services/patio-sliding-doors" },
    { icon: faShieldHalved, title: "Storm & Impact Windows", body: "Impact-rated and storm solutions for wind protection, security, and efficiency.", link: "/services/storm-impact-windows" },
    { icon: faWrench, title: "Window Repair", body: "Fogged glass, failed seals, balances, and hardware — honest repair-vs-replace advice.", link: "/services/window-repair" },
    { icon: faLeaf, title: "Energy Efficiency Upgrades", body: "Targeted Low-E upgrades and weatherization that cut cooling costs room by room.", link: "/services/energy-efficiency-upgrades" },
  ];

  const expectations = [
    { icon: faSearch, title: "Clear Guidance First", description: "We explain options in plain English — repair vs replace, vinyl vs fiberglass — not just the most expensive package." },
    { icon: faCheckCircle, title: "Upfront, Written Pricing", description: "No hourly billing, no surprise add-ons. You approve the price before we order product." },
    { icon: faShieldHalved, title: "Factory-Certified Installers", description: "Every installer is factory-certified. Bonded and insured on every job." },
    { icon: faTag, title: "Lifetime Product + 10-Year Install Warranty", description: "Product warranty support for life of the product; installation workmanship for ten years." },
  ];

  const metrics = [
    { icon: faTrophy, value: 3500, label: "Window and door installs since 2012", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 98, label: "Customer satisfaction rating", suffix: "%", duration: 2 },
    { icon: faClock, value: 14, label: "Years serving Central Texas", suffix: "+", duration: 2 },
  ];

  const whyFeatures = [
    { icon: faHeadset, title: "A Real Person Answers", description: "Call or text and reach a real ClearView team member — not a call center. Free measurements most days." },
    { icon: faShieldHalved, title: "No Contracts, Ever", description: "There's no subscription or service agreement required. You hire us because the work is done right." },
    { icon: faLock, title: "Bonded & Insured", description: "Factory-certified and fully insured. Proof of insurance available on request for builders and PMs." },
  ];

  const processSteps = [
    { number: 1, title: "Call or Book", description: "Phone, text, or online form. We'll schedule a free in-home measurement.", icon: faHeadset },
    { number: 2, title: "Measure On-Site", description: "Factory-aware specialist measures openings and explains options in plain English.", icon: faSearch },
    { number: 3, title: "Flat-Rate Quote", description: "Written price before any order. You decide — zero pressure.", icon: faFileContract },
    { number: 4, title: "Install & Warranty", description: "Clean install, debris hauled away, Lifetime Product + 10-Year Installation Warranty.", icon: faCheckCircle },
  ];

  const guarantees = [
    { icon: faTag, title: "Upfront Pricing, Always", description: "The written price you approve is the price you pay — no hourly billing." },
    { icon: faShieldHalved, title: "10-Year Installation Warranty", description: "Every install is backed for ten years. If our workmanship fails, we fix it." },
    { icon: faRotateLeft, title: "Satisfaction Guarantee", description: "Not happy with the result? We'll return to make it right." },
    { icon: faLock, title: "Factory-Certified · Bonded & Insured", description: "Documentation available on request." },
  ];

  const localAreas = [
    { town: "Waco", benefit: "Home base — fastest scheduling and most available crews.", badge: "Home Base" },
    { town: "Hewitt", benefit: "Full residential coverage.", badge: "" },
    { town: "Woodway", benefit: "Regular availability for homes and custom installs.", badge: "" },
    { town: "Temple", benefit: "Regular service area — quick turnaround.", badge: "" },
    { town: "Killeen", benefit: "Full coverage for Killeen and Fort Cavazos area.", badge: "" },
    { town: "China Spring", benefit: "Rural coverage with no trip charge for most addresses.", badge: "" },
  ];

  const comparisonRows = [
    { feature: "Upfront, written pricing", us: "✅ Always", others: "❌ Vague estimates" },
    { feature: "10-Year Installation Warranty", us: "✅ Every install", others: "❌ Rare or none" },
    { feature: "Factory-certified installers", us: "✅ All crews", others: "❌ Not always" },
    { feature: "No service contracts required", us: "✅ Always", others: "❌ Sometimes required" },
    { feature: "Free in-home measurements", us: "✅ Yes", others: "❌ Often charged" },
  ];

  const faq = [
    { question: "How much do windows and doors cost in Waco?", answer: "Windows typically $450–$1,200 each installed. Entry doors often $1,800–$5,500. Patio doors commonly $2,500–$7,500. We always provide a flat-rate written quote after free measurement." },
    { question: "Are your installers factory-certified?", answer: "Yes — ClearView Windows & Doors uses factory-certified installers who are bonded and insured." },
    { question: "Do you offer free estimates?", answer: "Yes — free in-home measurements and consultations. Call (254) 740-3300." },
    { question: "What areas do you serve?", answer: "Waco, Hewitt, Woodway, McGregor, China Spring, Bellmead, Temple, Killeen, and most of Central Texas within about 60 miles of Waco." },
    { question: "Do you offer a warranty?", answer: "Yes — Lifetime Product Warranty Support plus a 10-Year Installation Warranty." },
    { question: "How do I get a quote?", answer: "Call, text, or fill out our online form. We'll schedule a free measurement and provide written pricing before any work starts." },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <SectionIntro
        title="Window & Door Services in Waco, TX"
        subtitle="Replacement, repair, storm protection, and energy upgrades — factory-certified installers, flat-rate quotes, Lifetime Product Warranty Support + 10-Year Installation Warranty."
      />
      <TrustBar headline="3,500+ installs · 4.9★ from 650+ reviews · Bonded & insured" />
      <div className={styles.section}><ServiceCardComponent heading="Our Services" subheading="Everything your home needs for better windows and doors." cards={services} /></div>
      <div className={styles.section}><WhatToExpect expectations={expectations} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><GuaranteeSection guarantees={guarantees} /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} /></div>
      <CTABanner
        headline="Ready for a Free Measurement?"
        subline="Flat-rate quotes. Factory-certified installers. Call (254) 740-3300."
        primaryText="Call (254) 740-3300"
        primaryLink="tel:+12547403300"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />
      <div className={styles.section}>
        <Variant2 title="Request a Free Estimate" cityName="Waco" slug="services" spot="services-index-form" formVariant={1} />
      </div>
    </main>
  );
}
