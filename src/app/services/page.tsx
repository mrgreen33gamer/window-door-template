// Arctic Air HVAC — Services Overview
// Order: Breadcrumb → SectionIntro → TrustBar → ServiceCards → WhatToExpect
//        → ImpactMetrics → WhyChooseUs → ProcessTimeline → GuaranteeSection
//        → Testimonials → LocalServiceAreas → ValueComparison → FAQ → CTABanner → Form
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
  faFan, faFire, faWrench, faFilter, faThermometerHalf, faWind,
  faTrophy, faChartLine, faClock,
  faHeadset, faSearch, faFileContract, faCheckCircle,
  faShieldHalved, faLock, faRotateLeft, faBolt,
} from "@fortawesome/free-solid-svg-icons";

export default function ServicesPage() {

  const services = [
    { icon: faFan,            title: "AC Repair",          body: "Fast, accurate diagnosis on all brands. Same-day service available — we stock common parts on every truck.",                           link: "/services/ac-repair" },
    { icon: faFire,           title: "Heating Service",    body: "Furnace repair, heat pump service, and emergency heating calls across Central Texas — 7 days a week.",                                 link: "/services/heating" },
    { icon: faWrench,         title: "New Installation",   body: "Right-sized system selection, clean installation, and full commissioning. Financing available for qualified homeowners.",               link: "/services/installation" },
    { icon: faFilter,         title: "Duct Cleaning",      body: "Full duct cleaning and sanitizing for improved air quality and system efficiency. A real difference for allergy sufferers.",           link: "/services/duct-cleaning" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Twice-yearly tune-ups that prevent breakdowns and keep your warranty valid. Month-to-month — no contracts.",                          link: "/services/maintenance" },
    { icon: faWind,           title: "Indoor Air Quality", body: "Air purifiers, UV lights, whole-home humidifiers, and filtration upgrades that make your home healthier every day.",                   link: "/services/indoor-air-quality" },
  ];

  const expectations = [
    { icon: faSearch,       title: "Free Diagnostic Visit",       description: "We inspect your system and explain exactly what's wrong with a flat-rate price before anything is touched. Diagnostic fee waived when you proceed." },
    { icon: faCheckCircle,  title: "Upfront Flat-Rate Pricing",   description: "No hourly billing, no surprise fees. You approve the price before we start — and it never changes mid-job." },
    { icon: faShieldHalved, title: "NATE-Certified Technicians",  description: "Every tech is NATE-certified, background-checked, and licensed in Texas. You know exactly who is coming to your home." },
    { icon: faWrench,       title: "1-Year Parts & Labor Warranty", description: "Every repair we complete is backed by a full year of coverage on both parts and labor. No fine print." },
  ];

  const metrics = [
    { icon: faTrophy,    value: 2400, label: "Homes and businesses served since 2010", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 98,   label: "Customer satisfaction rating",            suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years serving Waco and Central Texas",    suffix: "+", duration: 2 },
  ];

  const whyFeatures = [
    { icon: faBolt,          title: "Same-Day & Emergency Service",  description: "We staff for Central Texas summers. Emergency calls get answered and dispatched within the hour — evenings and weekends included." },
    { icon: faHeadset,       title: "No Contracts, Ever",            description: "Our maintenance plans are month-to-month. Our repairs have no service agreements. You hire us because we do great work — not because you're locked in." },
    { icon: faShieldHalved,  title: "Financing Available",           description: "New system replacement doesn't have to break the bank. We offer flexible financing options for qualified homeowners — ask us for details." },
  ];

  const processSteps = [
    { number: 1, title: "Schedule",  description: "Call, text, or book online. We'll confirm a time that fits your schedule — usually same-day.", icon: faHeadset },
    { number: 2, title: "Diagnose",  description: "Tech arrives on time, inspects your system, and explains the problem clearly — no pressure.",   icon: faSearch },
    { number: 3, title: "Quote",     description: "Flat-rate written quote before any work starts. No surprises, no hidden fees.",                  icon: faFileContract },
    { number: 4, title: "Fix",       description: "Completed with quality parts, site left clean, backed by our 1-year parts and labor warranty.", icon: faCheckCircle },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Flat-Rate Pricing",            description: "The price you approve is the price you pay. No hourly billing, no change orders mid-job." },
    { icon: faRotateLeft,   title: "1-Year Repair Warranty",       description: "Every repair is backed by a full year of parts and labor coverage. No fine print." },
    { icon: faHeadset,      title: "Real People Answer the Phone", description: "Call us at 10pm in July and someone in Waco answers. No call centers, no hold queues." },
    { icon: faLock,         title: "Licensed, Bonded & Insured",   description: "TDLR-licensed, fully bonded, and insured. License number available on request." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — best availability and fastest response in the city.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full residential and commercial service coverage.",                badge: "" },
    { town: "Woodway",      benefit: "Same-day availability for Woodway-area homes.",                   badge: "" },
    { town: "Robinson",     benefit: "Regular route — quick turnaround for Robinson customers.",        badge: "" },
    { town: "China Spring", benefit: "Rural coverage with no trip charge for most locations.",          badge: "" },
    { town: "Temple",       benefit: "Full service coverage for Bell County homes and businesses.",     badge: "" },
  ];

  const comparisonRows = [
    { feature: "Flat-rate upfront pricing",       us: "✅ Always",         others: "❌ Hourly + surprise fees" },
    { feature: "1-year parts & labor warranty",   us: "✅ Every repair",   others: "❌ Parts only, or none" },
    { feature: "NATE-certified technicians",      us: "✅ All techs",      others: "❌ Varies" },
    { feature: "No service contracts required",   us: "✅ Always",         others: "❌ Often required" },
    { feature: "Emergency & same-day available",  us: "✅ 7 days a week",  others: "❌ Business hours only" },
  ];

  const faq = [
    { question: "How much does HVAC service cost in Waco?",         answer: "Repairs typically range from $150–$800 depending on the issue. New system installation runs $4,500–$12,000 depending on size and type. We always provide a flat-rate written quote before any work begins." },
    { question: "Do you work on all HVAC brands?",                  answer: "Yes — all major brands including Carrier, Trane, Lennox, Rheem, Goodman, York, and more. We install Carrier and Trane as our primary brands for new systems." },
    { question: "What does your maintenance plan include?",          answer: "Two visits per year — spring cooling tune-up and fall heating tune-up. Each includes a 20-point inspection, cleaning, filter check, refrigerant check, electrical check, and written report. Month-to-month, cancel anytime." },
    { question: "Are you available for emergency calls?",            answer: "Yes — 7 days a week including evenings. We understand a broken AC in July is a genuine emergency. Emergency calls are dispatched within the hour." },
    { question: "How long does a full AC replacement take?",         answer: "Most residential replacements take 4–6 hours. We carry common unit sizes in stock, so most installs happen the same week you request them — often same or next day." },
  ];

  return (
    <>
      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services" },
      ]} />

      <SectionIntro
        title="HVAC Services for Waco & Central Texas"
        subtitle="Repair, replacement, maintenance, and air quality — done right, priced fairly, backed by a 1-year warranty on every job."
      />

      <TrustBar headline="Trusted by 2,400+ Central Texas homes and businesses since 2010" />

      <div className={styles.section}>
        <ServiceCardComponent heading="What We Do" cards={services} />
      </div>

      <div className={styles.section}>
        <WhatToExpect sectionTitle="How Every Service Call Works" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <ImpactMetrics title="Results That Speak for Themselves" metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Central Texas Chooses Arctic Air" />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <GuaranteeSection guarantees={guarantees} />
      </div>

      <div className={styles.section}>
        <Testimonials testimonials={reviews} />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services" title="Serving All of Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="HVAC Service FAQs" />
      </div>

      <CTABanner
        headline="Ready to Schedule Your Service?"
        subline="Same-day and emergency service available. Flat-rate pricing, 1-year warranty, no contracts ever."
        primaryText="Call Us Now"
        primaryLink="tel:+12549001234"
        secondaryText="Schedule Online"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <Variant2
          title="Request a Service or Free Estimate"
          cityName="Waco"
          slug="services"
          spot="services-page-form"
          formVariant={2}
        />
      </div>
    </>
  );
}
