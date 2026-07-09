// Arctic Air HVAC — Maintenance Plans Page
// Order: Breadcrumb → SectionIntro → TrustBar → WhatToExpect → WhyChooseUs
//        → GuaranteeSection → ProcessTimeline → ImpactMetrics → Testimonials
//        → ValueComparison → FAQ → CTABanner → Form
"use client";

import styles from "../page.module.scss";
import reviews from '&/local-db/reviews';

import Breadcrumb       from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro     from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar         from "#/PageComponents/TrustBar/TrustBar";
import WhatToExpect     from "#/PageComponents/WhatToExpect/WhatToExpect";
import WhyChooseUs      from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import GuaranteeSection from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import ProcessTimeline  from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics    from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import Testimonials     from "#/PageComponents/Testimonials/Testimonials";
import ValueComparison  from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ              from "#/PageComponents/FAQ/FAQ";
import CTABanner        from "#/PageComponents/CTABanner/CTABanner";
import Variant2         from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faThermometerHalf, faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faRotateLeft, faLock,
  faTrophy, faChartLine, faLeaf, faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function MaintenancePage() {

  const expectations = [
    { icon: faCalendarCheck, title: "Spring Cooling Tune-Up",        description: "Refrigerant check, coil cleaning, electrical inspection, capacitor test, drain flush, and a 20-point system check before the Texas summer hits." },
    { icon: faSearch,        title: "Fall Heating Tune-Up",          description: "Burner cleaning, heat exchanger inspection, ignitor test, gas pressure check, blower cleaning, and a full heating system safety check before winter." },
    { icon: faCheckCircle,   title: "Written Inspection Report",     description: "After every visit you get a written report with everything we inspected, what we found, and any recommendations — no mystery, no pressure." },
    { icon: faLeaf,          title: "Priority Scheduling & Discounts", description: "Plan members get priority dispatch during peak season and 15% off any repair parts needed. The plan more than pays for itself." },
  ];

  const whyFeatures = [
    { icon: faClock,        title: "Prevent Emergencies Before They Happen", description: "80% of HVAC breakdowns are preventable with proper maintenance. Our plan customers consistently avoid the $800–$2,000 emergency repairs that catch unserviced systems off guard." },
    { icon: faShieldHalved, title: "Keep Your Manufacturer Warranty Valid",  description: "Most HVAC manufacturer warranties require documented annual maintenance. Our maintenance plan provides the paper trail your warranty demands." },
    { icon: faLeaf,         title: "Better Efficiency, Lower Bills",          description: "A dirty system works harder and costs more to run. A properly maintained system can use 15–25% less energy — often more than covering the plan's annual cost." },
  ];

  const guarantees = [
    { icon: faFileContract, title: "No Long-Term Contracts",      description: "Month-to-month plan. Cancel anytime with 30 days notice — no cancellation fees." },
    { icon: faRotateLeft,   title: "15% Off All Repair Parts",    description: "Plan members receive 15% off all repair parts needed throughout the year." },
    { icon: faHeadset,      title: "Priority Emergency Dispatch", description: "Jump to the front of the queue during peak summer and winter service demand." },
    { icon: faLock,         title: "Manufacturer Warranty Docs",  description: "We provide written maintenance records for your manufacturer warranty compliance." },
  ];

  const processSteps = [
    { number: 1, title: "Sign Up",        description: "Call or sign up online. No contracts — cancel anytime with 30 days notice.",                                           icon: faFileContract },
    { number: 2, title: "Spring Visit",   description: "We call to schedule your spring cooling tune-up before temperatures climb. 20-point inspection included.",             icon: faSearch },
    { number: 3, title: "Fall Visit",     description: "We schedule your fall heating tune-up before the cold arrives. Full safety check including heat exchanger inspection.", icon: faCalendarCheck },
    { number: 4, title: "Priority Access", description: "Plan members jump the queue during peak season and get 15% off any repair parts needed throughout the year.",         icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy,    value: 600, label: "Active maintenance plan customers",                      suffix: "+", duration: 2 },
    { icon: faChartLine, value: 80,  label: "Of breakdowns prevented by proper maintenance",          suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,  label: "Average energy savings with maintained systems",         suffix: "%", duration: 2 },
  ];

  const comparisonRows = [
    { feature: "No long-term contract",         us: "✅ Month-to-month",   others: "❌ Annual lock-in" },
    { feature: "Written inspection report",     us: "✅ After every visit", others: "❌ Verbal summary only" },
    { feature: "Parts discount included",       us: "✅ 15% off",           others: "❌ No discount" },
    { feature: "Priority scheduling",           us: "✅ Jump the queue",    others: "❌ Standard wait" },
    { feature: "Heat exchanger CO inspection",  us: "✅ Every fall visit",  others: "❌ Not always included" },
  ];

  const faq = [
    { question: "How much does the maintenance plan cost?",           answer: "Our plan is $199/year or $19/month, covering two full tune-ups (spring and fall). The 15% parts discount and emergency priority typically offset the cost within a single service call." },
    { question: "What exactly is included in each tune-up visit?",    answer: "Spring (cooling): refrigerant check, coil cleaning, electrical inspection, capacitor test, drain pan flush, filter check, thermostat calibration, and 20-point system check. Fall (heating): burner cleaning, heat exchanger inspection, ignitor test, gas pressure check, blower cleaning, safety controls test, and full system evaluation." },
    { question: "Is there a contract or cancellation fee?",           answer: "No contract, no cancellation fee. Cancel anytime with 30 days notice. We want you to stay because the service is worth it — not because you're locked in." },
    { question: "Does a maintenance plan void my manufacturer warranty?", answer: "The opposite, actually — skipping maintenance is what voids most HVAC warranties. Our maintenance visits generate documented records that demonstrate compliance with manufacturer requirements." },
    { question: "Can I add more than one system to the plan?",        answer: "Yes — multi-system discounts are available for homes with multiple HVAC units or rental properties with multiple systems. Call us for a custom quote." },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services", href: "/services" },
        { label: "Maintenance Plans" },
      ]} />

      <SectionIntro
        title="HVAC Maintenance Plans in Waco, TX"
        subtitle="Two tune-ups per year, 15% off repairs, priority emergency scheduling — month-to-month, no contracts."
      />

      <TrustBar headline="600+ Central Texas families on the Arctic Air maintenance plan" />

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What's Included in Every Tune-Up" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why a Maintenance Plan Pays for Itself" />
      </div>

      <div className={styles.section}>
        <GuaranteeSection guarantees={guarantees} />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <Testimonials testimonials={reviews} />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Maintenance Plan FAQs" />
      </div>

      <CTABanner
        headline="Stop Reacting. Start Preventing."
        subline="$199/year or $19/month. Two tune-ups, 15% off repairs, priority scheduling, no contracts."
        primaryText="Sign Up Now"
        primaryLink="/contact"
        secondaryText="Call Us First"
        secondaryLink="tel:+12549001234"
      />

      <div className={styles.section}>
        <Variant2
          title="Sign Up for the Maintenance Plan"
          cityName="Waco"
          slug="services/maintenance"
          spot="maintenance-page-form"
          formVariant={2}
        />
      </div>

    </main>
  );
}
