// Arctic Air HVAC — AC Repair in Temple, TX
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
  faCar,
  faCalendarAlt,
  faRocket,
  faStar,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function TempleACRepairPage() {

  const whyFeatures = [
    {
      icon: faCar,
      title: "Inventory & Vehicle Listing Pages",
      description: "We build indexed, SEO-optimized vehicle inventory pages — each one targeting specific make, model, and year searches — so your lot shows up when buyers are actively searching for what you have.",
    },
    {
      icon: faCalendarAlt,
      title: "Online Service Booking Integration",
      description: "We build or integrate online booking into your site so customers can schedule service, oil changes, and repairs 24/7 — reducing phone volume and capturing the after-hours appointments you're currently missing.",
    },
    {
      icon: faGoogle,
      title: "Google Business Profile Optimization",
      description: "We manage your GBP for automotive-specific categories, service offerings, and photo updates — keeping you ranking in the local map pack for every high-intent automotive search in your area.",
    },
  ];
  const expectations = [
    { icon: faSearch, title: "Same-Day Diagnosis", description: "We arrive on time with a fully stocked truck and run a complete system diagnosis explaining what is wrong in plain language, not HVAC jargon." },
    { icon: faFileContract, title: "Flat-Rate Quote First", description: "You see the written price before we touch anything. It does not change mid-job, even if the repair takes longer than expected." },
    { icon: faCheckCircle, title: "Fix It Right the First Time", description: "We carry the most common AC parts on every truck. Most repairs are completed on the first visit with no return trips." },
    { icon: faShieldHalved, title: "1-Year Warranty", description: "Every repair is backed by a full year of parts and labor coverage. If it fails again, we come back at no charge." },
  ];
  const processSteps = [
    { number: 1, title: "Audit Your Automotive Digital Presence", description: "We review your GBP, website speed, inventory visibility, and local search rankings — identifying every search where a competitor is capturing your customer.", icon: faSearch },
    { number: 2, title: "Build Inventory & Booking Systems",       description: "Vehicle listing pages, online booking, and a GBP optimized for your service menu — deployed as one cohesive digital presence.", icon: faRocket },
    { number: 3, title: "Automate Review Collection",              description: "Post-service review requests that systematically build your Google reputation — turning every completed job into a public trust signal.", icon: faStar },
    { number: 4, title: "Add Customer & Service Tools",            description: "Custom service history, CRM, and customer communication tools when you're ready to streamline your shop operations.", icon: faTools },
  ];

  const metrics = [
    { icon: faTrophy, value: 2400, label: "AC repairs completed across Central Texas", suffix: "+", duration: 2 },
    { icon: faChartLine, value: 98, label: "First-visit fix rate", suffix: "%", duration: 2 },
    { icon: faClock, value: 15, label: "Years in business", suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco", benefit: "Our home base since 2010 — fastest dispatch in the region.", badge: "Home Base" },
    { town: "Killeen", benefit: "Full coverage for Killeen and Fort Cavazos area homes.", badge: "" },
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
    { question: "How much does AC repair cost in Temple?", answer: "Most repairs in Temple run $150 to $650. Capacitor replacement runs $150 to $250. Refrigerant recharges run $250 to $500. We always provide a flat-rate quote before starting." },
    { question: "Can you fix my AC the same day I call in Temple?", answer: "In most cases yes, especially during business hours. Call before noon and same-day service is usually available for Temple and surrounding Bell County." },
    { question: "Do you offer emergency AC service in Temple?", answer: "Yes, 7 days a week including evenings. In Central Texas heat, a broken AC is a real emergency. Call us anytime at (254) 900-1234." },
    { question: "What AC brands do you service in Temple?", answer: "All major brands including Carrier, Trane, Lennox, Rheem, Goodman, York, and Daikin. Any make or model in Temple or anywhere in Bell County." },
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
        { label: "Temple, TX" },
      ]} />

      <SectionIntro
        title="AC Repair in Temple, TX"
        subtitle="Same-day AC diagnosis, flat-rate pricing, and a 1-year parts and labor warranty — serving Temple and Bell County."
      />

      <TrustBar headline="Trusted by Temple homeowners for fast, fair AC repair since 2010" />

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What to Expect on Your Temple Service Call" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Temple" features={whyFeatures} title="Why Temple Calls Arctic Air" />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Temple" />
      </div>

      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Temple" areas={localAreas} servicePath="services/ac-repair/temple-tx" title="AC Repair Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Temple" faq={faq} title="AC Repair FAQs — Temple" />
      </div>

      <CTABanner
        headline="Waco's HVAC Company — Ready When You Need Us"
        subline="Same-day and emergency service. Flat-rate pricing. 1-year warranty. No contracts — ever."
        primaryText="Call Us Now"
        primaryLink="tel:+12549001234"
        secondaryText="Request Service Online"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Other Services for Temple Homeowners" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant2
          title="Schedule AC Repair in Temple"
          cityName="Temple"
          slug="services/ac-repair/temple-tx"
          spot="ac-repair-temple-tx-page"
          formVariant={2}
        />
      </div>

    </main>
  );
}
