// ClearView Windows & Doors — Window Replacement Service Page
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
    { icon: faSearch, title: "Accurate Measurement First", description: "We measure every opening and review frame condition before recommending product — no cookie-cutter quotes." },
    { icon: faFileContract, title: "Flat-Rate Written Quote", description: "Product, labor, haul-away, and sealing are in the number. No surprise change orders mid-install." },
    { icon: faCheckCircle, title: "Manufacturer-Spec Install", description: "Proper flashing, shimming, insulation, and sealing so warranties stay valid." },
    { icon: faShieldHalved, title: "10-Year Installation Warranty", description: "Every replacement is backed by Lifetime Product Warranty Support plus our 10-Year Installation Warranty." },
  ];

  const whyFeatures = [
    { icon: faClock, title: "Efficient Project Timeline", description: "Most full-home installs are scheduled in coordinated phases so your home is never left open overnight." },
    { icon: faWindowMaximize, title: "Vinyl, Fiberglass & More", description: "We help you choose the frame and glass package that fits solar exposure, budget, and style." },
    { icon: faShieldHalved, title: "Bonded & Insured Crews", description: "Factory-certified installers with full insurance documentation on request." },
  ];

  const processSteps = [
    { number: 1, title: "Free Measurement", description: "We measure openings, note frame condition, and discuss goals for light, noise, and efficiency.", icon: faHeadset },
    { number: 2, title: "Quote & Order", description: "You get a flat-rate quote. Once approved, we order product and lock install dates.", icon: faSearch },
    { number: 3, title: "Install Day", description: "Old units removed, new windows set, sealed, and finished. Debris hauled away.", icon: faFileContract },
    { number: 4, title: "Walkthrough & Warranty", description: "We walk the job with you and register product warranties.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 1800, label: "Windows replaced in Central Texas", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 98, label: "Customer satisfaction on replacements", suffix: "%", duration: 2 },
    { icon: faClock, value: 14, label: "Years installing windows locally", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for window replacement.", badge: "Home Base" },
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
    { question: "How much does window replacement cost in Waco?", answer: "Most replacements run $450–$1,200 per window depending on size, frame, and glass. Full-home packages are quoted after free measurement." },
    { question: "How long does a full-home window replacement take?", answer: "Many homes are completed in 1–3 days depending on unit count and complexity. We give a realistic schedule at the quote." },
    { question: "Vinyl or fiberglass — which should I choose?", answer: "Vinyl is cost-effective and efficient. Fiberglass offers superior strength and stability in Texas heat. We recommend based on your openings and budget." },
    { question: "Will new windows lower my energy bills?", answer: "Low-E dual-pane packages typically reduce solar heat gain and drafts significantly — especially on west and south elevations." },
    { question: "Do you haul away old windows?", answer: "Yes — removal and disposal are included in our flat-rate install quotes." },
    { question: "Are you factory-certified?", answer: "Yes — our installers are factory-certified, bonded, and insured." },
  ];

  const crossServices = [
    { icon: faDoorOpen, title: "Entry Door Installation", body: "Upgrade curb appeal and security with a new entry door.", link: "/services/entry-door-installation" },
    { icon: faBorderAll, title: "Patio & Sliding Doors", body: "Smooth-operating patio doors that seal tight.", link: "/services/patio-sliding-doors" },
    { icon: faLeaf, title: "Energy Efficiency Upgrades", body: "Targeted upgrades when a full replacement is not required.", link: "/services/energy-efficiency-upgrades" },
    { icon: faWrench, title: "Window Repair", body: "Fogged glass and hardware fixes when repair still makes sense.", link: "/services/window-repair" },
  ];

  return (
    <main className={styles.pageWrapper}>
      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Window Replacement" },
      ]} />
      <SectionIntro
        title="Window Replacement in Waco, TX"
        subtitle="Full and partial home window replacements with Low-E glass packages built for Texas heat — factory-certified install, flat-rate quotes, Lifetime Product Warranty Support + 10-Year Installation Warranty."
      />
      <TrustBar headline="3,500+ Central Texas installs — factory-certified, bonded & insured" />
      <div className={styles.section}><WhatToExpect sectionTitle="What to Expect" expectations={expectations} /></div>
      <div className={styles.section}><WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose ClearView" /></div>
      <div className={styles.section}><ProcessTimeline steps={processSteps} /></div>
      <div className={styles.section}><ImpactMetrics metrics={metrics} cityName="Waco" /></div>
      <div className={styles.section}><Testimonials testimonials={reviews} /></div>
      <div className={styles.section}><GuaranteeSection /></div>
      <div className={styles.section}><LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/window-replacement" title="Window Replacement Across Central Texas" /></div>
      <div className={styles.section}><ValueComparison rows={comparisonRows} /></div>
      <div className={styles.section}><FAQ cityName="Waco" faq={faq} title="Window Replacement FAQs" /></div>
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
        <Variant4 title="Schedule Your Free Window Measurement" cityName="Waco" slug="services/window-replacement" spot="window-replacement-page-form" formVariant={2} />
      </div>
    </main>
  );
}
