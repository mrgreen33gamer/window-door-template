// Arctic Air HVAC — Duct Cleaning Page (NEW — did not exist in source)
// Order: Breadcrumb → SectionIntro → TrustBar → WhyChooseUs → ImpactMetrics
//        → WhatToExpect → ProcessTimeline → GuaranteeSection → LocalServiceAreas
//        → ValueComparison → FAQ → CTABanner → ServiceCards → Form
"use client";

import styles from "../page.module.scss";

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import GuaranteeSection    from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant4            from "#/PageComponents/ContactForms/Variant4/Form";

import {
  faFilter, faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faRotateLeft, faLock,
  faTrophy, faChartLine, faFan, faFire, faThermometerHalf, faWind,
  faLeaf, faBroom,
} from "@fortawesome/free-solid-svg-icons";
import Variant2 from "#/PageComponents/ContactForms/Variant2/Form";
import Variant1 from "#/PageComponents/ContactForms/Variant1/Form";
import Variant3 from "#/PageComponents/ContactForms/Variant3/Form";

export default function DuctCleaningPage() {

  const whyFeatures = [
    { icon: faLeaf,   title: "Real Difference for Allergy Sufferers",    description: "Ducts accumulate years of dust, pollen, pet dander, and mold spores that recirculate every time your system runs. A thorough cleaning removes the buildup at the source — not just at the filter." },
    { icon: faFilter, title: "Improve System Efficiency",                description: "Restricted ducts make your system work harder and run longer. A clean duct system can meaningfully reduce energy consumption — especially in homes that haven't been cleaned in 5+ years." },
    { icon: faBroom,  title: "Full System Clean — Not Just the Vents",   description: "We clean the supply and return ducts, registers, grilles, and the air handler itself. No spot-cleaning, no skipping hard-to-reach runs. Full system or we don't start." },
  ];

  const metrics = [
    { icon: faTrophy,    value: 400,  label: "Duct systems cleaned across Central Texas",      suffix: "+", duration: 2 },
    { icon: faChartLine, value: 20,   label: "Average airflow improvement after full clean",    suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years of HVAC service in Waco and beyond",       suffix: "+", duration: 2 },
  ];

  const expectations = [
    { icon: faSearch,       title: "Pre-Clean Inspection",           description: "We inspect your duct system and identify any issues — leaks, damage, blockages — before we begin. You get a clear picture of what we're cleaning and why." },
    { icon: faBroom,        title: "Full Mechanical Cleaning",       description: "High-powered vacuum combined with rotating brush agitation dislodges and removes buildup from every run. We seal off rooms systematically to capture debris." },
    { icon: faCheckCircle,  title: "Register & Grille Cleaning",     description: "Every supply and return register is removed, cleaned, and reinstalled. Your home stays clean — we use drop cloths and clean up completely after every job." },
    { icon: faShieldHalved, title: "Post-Clean Report",              description: "We show you before-and-after photos of key duct runs and leave you with a written summary of what was found and cleaned." },
  ];

  const processSteps = [
    { number: 1, title: "Schedule",      description: "Book online or call. Most duct cleaning appointments are available within a few days.", icon: faHeadset },
    { number: 2, title: "Pre-Inspection", description: "Tech inspects the duct system, identifies any damage or blockage, and walks you through the plan.", icon: faSearch },
    { number: 3, title: "Full Clean",     description: "High-powered vacuum and brush system cleans every run from the air handler to the registers.", icon: faBroom },
    { number: 4, title: "Report & Done",  description: "Before/after photos, written summary, all registers reinstalled, home left clean.", icon: faCheckCircle },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Flat-Rate Quote Upfront",      description: "You know the full price before we start. Priced by home size — no per-vent pricing surprises." },
    { icon: faRotateLeft,   title: "Satisfaction Guaranteed",      description: "If you're not satisfied with the cleaning, we come back and re-clean at no charge." },
    { icon: faShieldHalved, title: "Licensed & Insured Crew",      description: "Our duct cleaning team is part of our TDLR-licensed HVAC crew — not a separate subcontracted service." },
    { icon: faLock,         title: "No High-Pressure Upsell",      description: "We'll tell you if we find something worth addressing. We'll never invent problems to sell you additional services." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for duct cleaning.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full duct cleaning coverage for Hewitt homes.",     badge: "" },
    { town: "Woodway",      benefit: "Available for Woodway residential cleaning.",       badge: "" },
    { town: "Robinson",     benefit: "On our regular route — fast scheduling.",           badge: "" },
    { town: "China Spring", benefit: "Rural coverage — call ahead for availability.",     badge: "" },
    { town: "Killeen",      benefit: "Bell County duct cleaning on request.",             badge: "" },
  ];

  const comparisonRows = [
    { feature: "Full mechanical cleaning — all runs", us: "✅ Every run included",    others: "❌ Often spot-clean only" },
    { feature: "Flat-rate upfront pricing",           us: "✅ Written before work",   others: "❌ Per-vent pricing surprises" },
    { feature: "Before/after photo documentation",   us: "✅ Every job",              others: "❌ Rarely provided" },
    { feature: "HVAC-licensed crew",                 us: "✅ TDLR licensed",          others: "❌ Often unlicensed" },
    { feature: "No high-pressure upsell",            us: "✅ Honest assessment only", others: "❌ Frequent add-ons" },
  ];

  const faq = [
    { question: "How often should ducts be cleaned?",            answer: "Every 3–5 years for most homes, or sooner if you have pets, allergy sufferers, recent construction, or visible mold/debris at the vents. We'll give you an honest assessment on whether your system needs it." },
    { question: "How much does duct cleaning cost in Waco?",     answer: "Most residential duct cleaning runs $300–$600 depending on home size and duct system complexity. We provide a flat-rate quote after understanding your home's layout." },
    { question: "Does duct cleaning really make a difference?",  answer: "For homes with significant buildup — especially those with pets, smokers, or no prior cleaning — the difference is real and measurable in both air quality and system efficiency. For clean systems, the improvement is more modest." },
    { question: "Will duct cleaning make my home dusty?",        answer: "No — our process uses negative pressure (vacuum) to capture debris as it's dislodged, so it doesn't blow through your home. We use drop cloths and clean up completely before we leave." },
    { question: "Can you clean ducts without disrupting my house?", answer: "Yes. The process is noisy at times from the vacuum equipment, but we work methodically through your home and minimize disruption. Most jobs are complete in 3–4 hours for a typical home." },
  ];

  const crossServices = [
    { icon: faWind,           title: "Indoor Air Quality",  body: "Pair duct cleaning with a UV air purifier or HEPA-grade filtration upgrade.",   link: "/services/indoor-air-quality" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Keep your clean system in top shape with our month-to-month tune-up plan.",      link: "/services/maintenance" },
    { icon: faFan,            title: "AC Repair",          body: "Problems with airflow? We diagnose and repair all makes and models same-day.",    link: "/services/ac-repair" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services", href: "/services" },
        { label: "Duct Cleaning" },
      ]} />

      <SectionIntro
        title="Duct Cleaning in Waco, TX"
        subtitle="Full duct system cleaning and sanitizing — improved airflow, better air quality, and real relief for allergy sufferers."
      />

      <TrustBar headline="Clean ducts are the foundation of a healthy, efficient HVAC system" />

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Duct Cleaning Is Worth It" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics title="Our Duct Cleaning Results" metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <WhatToExpect sectionTitle="How We Clean Your Duct System" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <GuaranteeSection guarantees={guarantees} />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/duct-cleaning" title="Duct Cleaning Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Duct Cleaning FAQs" />
      </div>

      <CTABanner
        headline="Cleaner Air Starts with Clean Ducts."
        subline="Full mechanical duct cleaning for Waco-area homes. Flat-rate pricing, before/after documentation, licensed crew."
        primaryText="Schedule Now"
        primaryLink="/contact"
        secondaryText="Call Us"
        secondaryLink="tel:+12549001234"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Pair With These Services" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant3
          title="Schedule Duct Cleaning"
          cityName="Waco"
          slug="services/duct-cleaning"
          spot="duct-cleaning-page-form"
          formVariant={2}
        />
      </div>

    </main>
  );
}
