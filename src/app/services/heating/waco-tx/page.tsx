// Arctic Air HVAC — Heating Repair in Waco, TX
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

export default function WacoHeatingRepairPage() {

  const whyFeatures = [
    { icon: faBolt, title: "Same-Day Emergency Heating", description: "No heat in January does not wait until next week. We prioritize heating emergencies and dispatch same-day including evenings and weekends." },
    { icon: faFan, title: "All Heating System Types", description: "Gas furnaces, electric furnaces, heat pumps, dual-fuel systems. If it heats your home, we fix it. All brands, all fuel types." },
    { icon: faShieldHalved, title: "Safety-First CO Inspection", description: "Every heating call includes a CO safety check and heat exchanger inspection. We will not leave until we know your system is safe, not just working." },
  ];

  const expectations = [
    { icon: faSearch, title: "Full System Inspection", description: "We test the heat exchanger, ignitor, gas valve, blower, and all controls to find the actual root cause not just the obvious symptom." },
    { icon: faFileContract, title: "Flat-Rate Quote Before Work", description: "Written price before we start. No surprises, no hourly billing, no change orders once work begins." },
    { icon: faCheckCircle, title: "Parts on the Truck", description: "We stock common furnace and heat pump parts on every truck. Most heating repairs are completed in a single visit." },
    { icon: faShieldHalved, title: "1-Year Full Warranty", description: "Every heating repair is backed by a 1-year parts and labor warranty. If it fails again, we come back at no charge." },
  ];

  const processSteps = [
    { number: 1, title: "Call or Book", description: "Same-day heating service available. Call anytime including evenings and weekends.", icon: faHeadset },
    { number: 2, title: "Full Inspection", description: "Tech tests every component and identifies the exact root cause.", icon: faSearch },
    { number: 3, title: "Flat-Rate Quote", description: "Written price before we start, includes parts and labor, approved by you.", icon: faFileContract },
    { number: 4, title: "Repair and Test", description: "Repaired with quality parts, fully tested, 1-year warranty on exit.", icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy, value: 800, label: "Heating systems repaired across Central Texas", suffix: "+", duration: 2 },
    { icon: faChartLine, value: 97, label: "Same-visit repair completion rate", suffix: "%", duration: 2 },
    { icon: faClock, value: 15, label: "Years of HVAC experience", suffix: "+", duration: 2 },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Flat-Rate Pricing", description: "The price we quote is the price you pay no matter how long it takes." },
    { icon: faRotateLeft, title: "1-Year Full Warranty", description: "Parts and labor both covered for 12 months on every repair." },
    { icon: faHeadset, title: "CO Safety Check Included", description: "Heat exchanger and CO inspection on every heating call, always." },
    { icon: faLock, title: "Licensed and Insured", description: "TDLR-licensed, fully bonded, and insured on every job." },
  ];

  const localAreas = [
    { town: "Hewitt", benefit: "Full residential service for Hewitt homes — on our regular route.", badge: "" },
    { town: "Woodway", benefit: "Same-day service for Woodway neighborhoods.", badge: "" },
    { town: "Robinson", benefit: "Robinson is on our regular route — fast turnaround guaranteed.", badge: "" },
  ];

  const comparisonRows = [
    { feature: "Same-day heating service", us: "✅ Available daily", others: "❌ Often 3 to 5 day wait" },
    { feature: "CO safety check included", us: "✅ Every call", others: "❌ Not always included" },
    { feature: "Flat-rate written quote", us: "✅ Before any work", others: "❌ Hourly plus estimate" },
    { feature: "1-year parts and labor warranty", us: "✅ Every repair", others: "❌ Parts only" },
    { feature: "All brands and fuel types", us: "✅ All systems", others: "❌ Brand-specific only" },
  ];

  const faq = [
    { question: "How much does furnace repair cost in Waco?", answer: "Furnace repairs in Waco typically run $150 to $600. Ignitor replacement runs $150 to $250. Gas valve repair is $250 to $400. We provide a flat-rate quote before any work starts." },
    { question: "Do you offer same-day heating service in Waco?", answer: "Yes, same-day and emergency heating service is available for Waco. Call us at (254) 900-1234 and we will get someone out fast." },
    { question: "My heater turns on but blows cold air in Waco — what is wrong?", answer: "Common causes include a bad ignitor, failed flame sensor, tripped limit switch, or a gas supply issue. Our tech will diagnose and quote it on the first visit." },
    { question: "Do you service heat pumps in Waco?", answer: "Yes, heat pump repair is fully within our scope. We service all brands and configurations including dual-fuel heat pump systems in Waco and throughout McLennan County." },
    { question: "Do you check for carbon monoxide during heating calls in Waco?", answer: "Yes, we perform a CO safety test and heat exchanger inspection on every single heating service call. It is standard, not an add-on." },
  ];

  const crossServices = [
    { icon: faFan, title: "AC Repair", body: "Same-day AC diagnosis and repair for all brands.", link: "/services/ac-repair" },
    { icon: faWrench, title: "New Installation", body: "Furnace or heat pump replacement, right-sized licensed crew.", link: "/services/installation" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Twice-yearly tune-ups that keep your heating system reliable.", link: "/services/maintenance" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",         href: "/" },
        { label: "Services",     href: "/services" },
        { label: "Heating Repair", href: "/services/heating" },
        { label: "Waco, TX" },
      ]} />

      <SectionIntro
        title="Heating Repair in Waco, TX"
        subtitle="Furnace repair, heat pump service, and emergency heating calls — same-day available in Waco and throughout McLennan County."
      />

      <TrustBar headline="Trusted by Waco homeowners for reliable heating service since 2010" />

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What to Expect on Your Waco Service Call" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Waco Calls Arctic Air" />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/heating/waco-tx" title="Heating Repair Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Heating Repair FAQs — Waco" />
      </div>

      <CTABanner
        headline="No Heat in Waco? We Come to You Same Day."
        subline="Emergency heating service available 7 days a week. Flat-rate pricing, 1-year warranty, all brands."
        primaryText="Call (254) 900-1234"
        primaryLink="tel:+12549001234"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Other Services for Waco Homeowners" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant2
          title="Schedule Heating Service in Waco"
          cityName="Waco"
          slug="services/heating/waco-tx"
          spot="heating-waco-tx-page"
          formVariant={2}
        />
      </div>

    </main>
  );
}
