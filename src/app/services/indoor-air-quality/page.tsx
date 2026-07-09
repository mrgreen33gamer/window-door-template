// Arctic Air HVAC — Indoor Air Quality Page (NEW — did not exist in source)
// Order: Breadcrumb → SectionIntro → TrustBar → ProcessTimeline → WhatToExpect
//        → ImpactMetrics → WhyChooseUs → GuaranteeSection → LocalServiceAreas
//        → ValueComparison → FAQ → CTABanner → ServiceCards → Form
"use client";

import styles from "../page.module.scss";

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import GuaranteeSection    from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant2            from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faWind, faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faRotateLeft, faLock,
  faTrophy, faChartLine, faFan, faFilter, faThermometerHalf,
  faLeaf, faSun, faDroplet,
} from "@fortawesome/free-solid-svg-icons";

export default function IndoorAirQualityPage() {

  const processSteps = [
    { number: 1, title: "Air Quality Assessment",  description: "We evaluate your current filtration, humidity levels, and ventilation. We ask about allergy symptoms, pets, and home construction — because context matters.", icon: faSearch },
    { number: 2, title: "Honest Recommendation",   description: "We recommend only what your home actually needs. No upselling expensive equipment that won't move the needle for your specific situation.", icon: faCheckCircle },
    { number: 3, title: "Professional Installation", description: "All air quality equipment is installed by our TDLR-licensed crew and integrated properly with your existing HVAC system.", icon: faHeadset },
    { number: 4, title: "Verify & Adjust",          description: "We test the installation and walk you through maintenance requirements before we leave. Follow-up service available.", icon: faShieldHalved },
  ];

  const expectations = [
    { icon: faSun,      title: "UV Air Purification",         description: "Whole-home UV purifiers mount inside your air handler and neutralize bacteria, viruses, and mold spores as air cycles through. Particularly effective for homes with mold sensitivity." },
    { icon: faFilter,   title: "High-Efficiency Filtration",  description: "We can upgrade your system to MERV-13 filtration or install a whole-home media filter — capturing significantly more particulates than standard 1-inch filters without restricting airflow." },
    { icon: faDroplet,  title: "Whole-Home Humidification",   description: "Central Texas winters get dry. A whole-home humidifier connected to your HVAC maintains ideal humidity levels throughout your home — eliminating the need for portable units in every room." },
    { icon: faLeaf,     title: "Ventilation & Fresh Air",     description: "We assess and improve your home's fresh air exchange — important in tightly sealed modern homes where indoor air can be more polluted than outdoor air." },
  ];

  const metrics = [
    { icon: faTrophy,    value: 300,  label: "Air quality systems installed across Central Texas", suffix: "+", duration: 2 },
    { icon: faChartLine, value: 99,   label: "Of allergens removed by UV + HEPA combination",      suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years of HVAC and air quality experience in Waco",   suffix: "+", duration: 2 },
  ];

  const whyFeatures = [
    { icon: faSearch,       title: "Assessment Before Recommendation", description: "We don't sell IAQ equipment on autopilot. We assess your home's actual air quality challenges and recommend solutions that will make a real, measurable difference — not just add cost." },
    { icon: faShieldHalved, title: "Integrated with Your Existing System", description: "All equipment we install integrates directly with your existing HVAC — no standalone units to maintain separately, no cords, no portable hassles." },
    { icon: faLeaf,         title: "Long-Term Air Quality, Not Just Short-Term", description: "We recommend and install equipment that works 24/7 as part of your HVAC system — not seasonal stopgaps that need to be set up and taken down." },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Honest Assessment First",     body: "We tell you what your home actually needs — not what generates the highest sale. If basic filtration upgrades will help, we'll say so." },
    { icon: faRotateLeft,   title: "1-Year Equipment Warranty",   body: "All air quality equipment we install is backed by the manufacturer warranty plus our 1-year labor warranty." },
    { icon: faShieldHalved, title: "Licensed Installation",       body: "Every air quality upgrade is installed by our TDLR-licensed team — not a separate subcontractor." },
    { icon: faLock,         title: "No-Pressure Recommendations", body: "We present options at different price points and let you decide. You'll never feel sold to — just informed." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling for IAQ consultations.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full air quality service for Hewitt residential homes.", badge: "" },
    { town: "Woodway",      benefit: "Available for Woodway homes — premium systems welcome.", badge: "" },
    { town: "Robinson",     benefit: "On our regular route — easy scheduling.",                badge: "" },
    { town: "China Spring", benefit: "Rural homes with unique dust and pollen challenges.",    badge: "" },
    { town: "Temple",       benefit: "Bell County IAQ consultations on request.",              badge: "" },
  ];

  const comparisonRows = [
    { feature: "Assessment before equipment sale",      us: "✅ Always",              others: "❌ Equipment first, assessment never" },
    { feature: "Integrated whole-home solutions",       us: "✅ System-level install", others: "❌ Portable unit add-ons" },
    { feature: "Licensed HVAC crew installs",           us: "✅ TDLR licensed",        others: "❌ Often unlicensed" },
    { feature: "Multiple price-point options",          us: "✅ Honest comparison",    others: "❌ Push most expensive" },
    { feature: "1-year labor warranty",                 us: "✅ Every install",        others: "❌ 90 days or none" },
  ];

  const faq = [
    { question: "Does indoor air quality equipment really help with allergies?", answer: "Yes, significantly — especially the combination of HEPA-grade filtration and UV purification. For homes with pets, dust mites, or mold sensitivity, the improvement is measurable and often noticed within days of installation." },
    { question: "What's the difference between a UV air purifier and a standard filter?", answer: "Standard filters capture particles. UV purifiers kill biological contaminants — bacteria, viruses, and mold spores — that pass through filters. For allergy and respiratory health, combining both approaches gives the best results." },
    { question: "How much does indoor air quality equipment cost?", answer: "Filtration upgrades start around $200–$400. UV purifiers run $400–$800 installed. Whole-home humidifiers typically cost $500–$1,000 installed. We provide a flat-rate quote for any equipment recommendation." },
    { question: "Can you install a whole-home humidifier with my existing HVAC?", answer: "In most cases, yes — whole-home humidifiers install directly on your air handler and use your existing water supply. We assess compatibility during the consultation." },
    { question: "How often does IAQ equipment need maintenance?", answer: "UV bulbs typically need replacing every 1–2 years. Media filters replace every 6–12 months depending on use. We include maintenance guidance with every installation." },
  ];

  const crossServices = [
    { icon: faFilter,         title: "Duct Cleaning",     body: "Pair cleaner air with clean ducts — the most effective combination.",            link: "/services/duct-cleaning" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Keep your HVAC and IAQ equipment running at peak performance.",                  link: "/services/maintenance" },
    { icon: faFan,            title: "AC Repair",          body: "AC problems affecting your air quality? We diagnose and repair same-day.",        link: "/services/ac-repair" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services", href: "/services" },
        { label: "Indoor Air Quality" },
      ]} />

      <SectionIntro
        title="Indoor Air Quality in Waco, TX"
        subtitle="UV air purifiers, whole-home humidifiers, high-efficiency filtration, and fresh-air ventilation — all integrated with your existing HVAC system."
      />

      <TrustBar headline="The air inside your home can be 2–5x more polluted than outdoor air — we help fix that" />

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <WhatToExpect sectionTitle="Air Quality Solutions We Install" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <ImpactMetrics title="Indoor Air Quality by the Numbers" metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="How We Approach Indoor Air Quality" />
      </div>

      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/indoor-air-quality" title="Indoor Air Quality Service Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Indoor Air Quality FAQs" />
      </div>

      <CTABanner
        headline="Breathe Better — Starting with a Free Consultation."
        subline="Honest air quality assessment for Waco-area homes. UV purifiers, filtration upgrades, and whole-home humidification."
        primaryText="Schedule a Consultation"
        primaryLink="/contact"
        secondaryText="Call Us"
        secondaryLink="tel:+12549001234"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Pair With These Services" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant2
          title="Schedule an Air Quality Consultation"
          cityName="Waco"
          slug="services/indoor-air-quality"
          spot="iaq-page-form"
          formVariant={2}
        />
      </div>

    </main>
  );
}
