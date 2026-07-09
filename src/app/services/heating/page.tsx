// Arctic Air HVAC — Heating Repair Service Page
// Order: Breadcrumb → SectionIntro → TrustBar → WhyChooseUs → WhatToExpect
//        → ProcessTimeline → ImpactMetrics → Testimonials → LocalServiceAreas
//        → ValueComparison → FAQ → CTABanner → ServiceCards → Form
"use client";

import styles from "../page.module.scss";
import reviews from '&/local-db/reviews';

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import Testimonials        from "#/PageComponents/Testimonials/Testimonials";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant2            from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faFire, faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faTrophy, faChartLine,
  faFan, faWrench, faThermometerHalf,
} from "@fortawesome/free-solid-svg-icons";

export default function HeatingPage() {

  const whyFeatures = [
    { icon: faClock,        title: "Same-Day Heating Service",    description: "No heat in January doesn't wait until next week. We prioritize heating calls and offer same-day and emergency dispatch across Central Texas." },
    { icon: faFire,         title: "All Heating System Types",    description: "Gas furnaces, electric furnaces, heat pumps, dual-fuel systems — we service every configuration in every brand." },
    { icon: faShieldHalved, title: "Safety-First Diagnosis",      description: "Cracked heat exchangers and carbon monoxide risk are no joke. Our techs test for CO and inspect heat exchangers on every heating call." },
  ];

  const expectations = [
    { icon: faSearch,       title: "Full Heating System Inspection",   description: "We test the heat exchanger, ignitor, gas valve, blower, and controls to find the actual cause — not just the symptoms." },
    { icon: faFileContract, title: "Flat-Rate Heating Repair Quote",   description: "Written price before any work begins. No surprises, no hourly billing, no change orders." },
    { icon: faCheckCircle,  title: "Parts on the Truck",               description: "We stock common furnace and heat pump parts on every truck. Most heating repairs are completed in a single visit." },
    { icon: faShieldHalved, title: "Full 1-Year Warranty",             description: "Every heating repair comes with a 1-year parts and labor warranty. If it fails again, we come back — no questions asked." },
  ];

  const processSteps = [
    { number: 1, title: "Call or Book",     description: "Same-day heating service available. Call anytime — evenings and weekends included.",                            icon: faHeadset },
    { number: 2, title: "Full Inspection",  description: "We test every component of your heating system and identify the root cause — not just the symptom.",           icon: faSearch },
    { number: 3, title: "Flat-Rate Quote",  description: "Written price before we start — includes parts and labor. Approved by you first.",                             icon: faFileContract },
    { number: 4, title: "Repair & Test",    description: "Repaired with quality parts, fully tested before we leave, warranted for 1 full year.",                       icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy,    value: 800,  label: "Heating systems repaired across Central Texas", suffix: "+", duration: 2 },
    { icon: faChartLine, value: 97,   label: "Same-visit repair completion rate",             suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years of Central Texas HVAC experience",        suffix: "+", duration: 2 },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest heating dispatch available.",        badge: "Fastest Response" },
    { town: "Hewitt",       benefit: "Full heating repair coverage for Hewitt homes.",         badge: "" },
    { town: "Woodway",      benefit: "Same-day heating service for Woodway neighborhoods.",   badge: "" },
    { town: "Robinson",     benefit: "On our regular route — fast response for Robinson.",    badge: "" },
    { town: "Hillsboro",    benefit: "Hill County coverage — call ahead for availability.",   badge: "" },
    { town: "Temple",       benefit: "Full heating coverage for Bell County homes.",          badge: "" },
  ];

  const comparisonRows = [
    { feature: "Same-day heating service",         us: "✅ Available daily",    others: "❌ Often 3–5 day wait" },
    { feature: "Heat exchanger CO safety check",   us: "✅ Every call",         others: "❌ Not always included" },
    { feature: "Flat-rate written quote",          us: "✅ Before any work",    others: "❌ Hourly + estimate" },
    { feature: "1-year parts & labor warranty",    us: "✅ Every repair",       others: "❌ Parts only" },
    { feature: "All brands and fuel types",        us: "✅ All systems",        others: "❌ Brand-specific" },
  ];

  const faq = [
    { question: "How much does furnace repair cost in Waco?",              answer: "Furnace repairs typically range from $150–$600. Ignitor replacement runs $150–$250. Gas valve repair is $250–$400. Heat exchanger issues can run $500–$1,200. We quote flat-rate before any work." },
    { question: "My heater turns on but blows cold air — what's wrong?",  answer: "Common causes include a bad ignitor, failed flame sensor, tripped limit switch, or a gas supply issue. Our tech will diagnose it on the first visit with a written quote before touching anything." },
    { question: "How do I know if my heat exchanger is cracked?",          answer: "Cracked heat exchangers often cause a burning or musty smell, unusual sounds when the blower starts, or visible soot around the furnace. CO is a risk — if you suspect it, call us immediately." },
    { question: "Do you service heat pumps?",                              answer: "Yes — heat pump repair is fully within our scope. We service all brands and configurations including dual-fuel heat pump systems." },
    { question: "When should I replace my furnace instead of repairing it?", answer: "If your furnace is over 15 years old and a repair costs more than 40% of replacement cost, replacement usually wins on lifetime value. We'll give you an honest recommendation — not the most profitable one." },
  ];

  const crossServices = [
    { icon: faFan,            title: "AC Repair",        body: "Same-day AC diagnosis and repair for all brands.",             link: "/services/ac-repair" },
    { icon: faWrench,         title: "New Installation", body: "New furnace or heat pump installation — right-sized, clean.", link: "/services/installation" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Twice-yearly tune-ups that keep your system running reliably.", link: "/services/maintenance" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services", href: "/services" },
        { label: "Heating Repair" },
      ]} />

      <SectionIntro
        title="Heating Repair in Waco, TX"
        subtitle="Furnace repair, heat pump service, and emergency heating calls — same-day availability, flat-rate pricing, 1-year warranty."
      />

      <TrustBar headline="Trusted by 2,400+ Central Texas homes for heat, AC, and everything in between" />

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Heating Service Done Right" />
      </div>

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What to Expect on a Heating Service Call" expectations={expectations} />
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
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/heating" title="Heating Service Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="Heating Repair FAQs" />
      </div>

      <CTABanner
        headline="No Heat? We Come to You — Same Day."
        subline="Emergency heating service available 7 days a week. Flat-rate pricing, 1-year warranty, all brands."
        primaryText="Call Us Now"
        primaryLink="tel:+12549001234"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Other Services We Offer" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant2
          title="Schedule Heating Service"
          cityName="Waco"
          slug="services/heating"
          spot="heating-page-form"
          formVariant={2}
        />
      </div>

    </main>
  );
}
