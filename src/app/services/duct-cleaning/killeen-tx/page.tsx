// src/app/services/ac-repair/killeen-tx/page.tsx
// Arctic Air HVAC — AC Repair in Killeen, TX
"use client";

import styles from "../../page.module.scss";

import Breadcrumb           from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro         from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar             from "#/PageComponents/TrustBar/TrustBar";
import WhatToExpect         from "#/PageComponents/WhatToExpect/WhatToExpect";
import WhyChooseUs          from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline      from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics        from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import GuaranteeSection     from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas    from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                  from "#/PageComponents/FAQ/FAQ";
import CTABanner            from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant2             from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faBolt, faFan, faShieldHalved,
  faSearch, faFileContract, faCheckCircle, faHeadset,
  faTrophy, faChartLine, faClock,
  faRotateLeft, faLock,
  faFire, faWrench, faThermometerHalf,
} from "@fortawesome/free-solid-svg-icons";

export default function KilleenACRepairPage() {

  const whyFeatures = [
    { icon: faBolt, title: "Emergency Service — Any Hour", description: "AC down on a Saturday night in July? We answer. Emergency dispatch is available 7 days a week including evenings because Central Texas heat does not keep business hours." },
    { icon: faFan, title: "All Brands and Models", description: "Carrier, Trane, Lennox, Rheem, Goodman, York — we have serviced them all. Whatever brand is running in your home, our techs know it." },
    { icon: faShieldHalved, title: "Licensed, Insured, NATE-Certified", description: "Every technician is NATE-certified and TDLR-licensed. You always know exactly who is coming to your home and that they are fully qualified to be there." },
  ];

  const expectations = [
    { icon: faSearch, title: "Same-Day Diagnosis", description: "We arrive on time with a fully stocked truck and run a complete system diagnosis explaining what is wrong in plain language, not HVAC jargon." },
    { icon: faFileContract, title: "Flat-Rate Quote First", description: "You see the written price before we touch anything. It does not change mid-job, even if the repair takes longer than expected." },
    { icon: faCheckCircle, title: "Fix It Right the First Time", description: "We carry the most common AC parts on every truck. Most repairs are completed on the first visit with no return trips." },
    { icon: faShieldHalved, title: "1-Year Warranty", description: "Every repair is backed by a full year of parts and labor coverage. If it fails again, we come back at no charge." },
  ];

  const processSteps = [
    { number: 1, title: "Call or Book", description: "Phone, text, or online form. We will get you scheduled same-day when you call before noon.", icon: faHeadset },
    { number: 2, title: "Diagnosis", description: "Tech arrives on time, inspects the full system, and identifies the root cause.", icon: faSearch },
    { number: 3, title: "Flat-Rate Quote", description: "Written price before we start. You approve it with no pressure and no obligation.", icon: faFileContract },
    { number: 4, title: "Repair and Warranty", description: "Completed with quality parts, fully tested, warranted for 1 year.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 2400, label: "AC repairs completed across Central Texas", suffix: "+", duration: 2 },
    { icon: faChartLine, value: 98, label: "First-visit fix rate", suffix: "%", duration: 2 },
    { icon: faClock, value: 15, label: "Years in business", suffix: "+", duration: 2 },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Flat-Rate Pricing", description: "The price we quote is the price you pay no matter how long it takes." },
    { icon: faRotateLeft, title: "1-Year Full Warranty", description: "Parts and labor both covered for 12 months on every repair." },
    { icon: faHeadset, title: "Emergency Available", description: "7-day-a-week availability for genuine HVAC emergencies." },
    { icon: faLock, title: "Licensed and Insured", description: "TDLR-licensed, fully bonded, and insured on every job." },
  ];

  const localAreas = [
    { town: "Waco", benefit: "Our home base since 2010 — fastest dispatch in the region.", badge: "Home Base" },
    { town: "Temple", benefit: "Bell County coverage for Temple and surrounding communities.", badge: "" },
    { town: "Waco", benefit: "Our home base — fastest dispatch in the region.", badge: "Home Base" },
    { town: "Robinson", benefit: "Robinson is on our regular route — fast turnaround guaranteed.", badge: "" },
  ];

  const comparisonRows = [
    { feature: "Flat-rate price before work starts", us: "✅ Always written", others: "❌ Hourly plus estimate only" },
    { feature: "1-year parts AND labor warranty", us: "✅ Every repair", others: "❌ Parts only" },
    { feature: "NATE-certified technicians", us: "✅ All techs", others: "❌ Not always" },
    { feature: "Emergency service 7 days per week", us: "✅ Always available", others: "❌ Business hours only" },
    { feature: "Parts on truck same-visit repair", us: "✅ Most repairs", others: "❌ Often a return trip" },
  ];

  const faq = [
    { question: "How much does AC repair cost in Killeen?", answer: "Most repairs in Killeen run $150 to $650. Capacitor replacement runs $150 to $250. Refrigerant recharges run $250 to $500. We always provide a flat-rate quote before starting." },
    { question: "Can you fix my AC the same day I call in Killeen?", answer: "In most cases yes, especially during business hours. Call before noon and same-day service is usually available for Killeen and surrounding Bell County." },
    { question: "Do you offer emergency AC service in Killeen?", answer: "Yes, 7 days a week including evenings. In Central Texas heat, a broken AC is a real emergency. Call us anytime at (254) 900-1234." },
    { question: "What AC brands do you service in Killeen?", answer: "All major brands including Carrier, Trane, Lennox, Rheem, Goodman, York, and Daikin. Any make or model in Killeen or anywhere in Bell County." },
    { question: "When should I replace my AC instead of repairing it?", answer: "If the repair cost exceeds 50 percent of a new system and the unit is over 10 years old, replacement often wins on lifetime value. We will give you an honest opinion either way." },
  ];

  const crossServices = [
    { icon: faFire, title: "Heating Repair", body: "Furnace and heat pump repair same-day available.", link: "/services/heating" },
    { icon: faWrench, title: "New Installation", body: "Right-sized system selection and clean installation.", link: "/services/installation" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Prevent the next breakdown with twice-yearly tune-ups.", link: "/services/maintenance" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",         href: "/" },
        { label: "Services",     href: "/services" },
        { label: "AC Repair", href: "/services/ac-repair" },
        { label: "Killeen, TX" },
      ]} />

      <SectionIntro
        title="AC Repair in Killeen, TX"
        subtitle="Same-day AC diagnosis, flat-rate pricing, and a 1-year parts and labor warranty — serving Killeen and Bell County."
      />

      <TrustBar headline="Trusted by Killeen homeowners for fast, fair AC repair since 2010" />

      <div className={styles.section}>
        <WhyChooseUs cityName="Killeen" features={whyFeatures} title="Why Killeen Calls Arctic Air" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Killeen" />
      </div>

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What to Expect on Your Killeen Service Call" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <GuaranteeSection
          title="Our AC Repair Guarantee"
          headline={"Fixed right.\nWarrantied.\nFair price."}
          guarantees={guarantees}
          ctaText="Schedule AC Repair in Killeen"
          ctaLink="/contact"
        />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="Killeen" />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Killeen" areas={localAreas} servicePath="services/ac-repair/killeen-tx" title="AC Repair Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} title="Arctic Air vs. The Other Guys" />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Killeen" faq={faq} title="AC Repair FAQs — Killeen" />
      </div>

      <CTABanner
        headline="AC Out in Killeen? We Are Ready."
        subline="Same-day and emergency service. Flat-rate pricing, 1-year warranty, all brands."
        primaryText="Call (254) 900-1234"
        primaryLink="tel:+12549001234"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Other Services for Killeen Homeowners" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant2
          title="Schedule AC Repair in Killeen"
          cityName="Killeen"
          slug="services/ac-repair/killeen-tx"
          spot="ac-repair-killeen-tx-page"
          formVariant={2}
        />
      </div>

    </main>
  );
}
