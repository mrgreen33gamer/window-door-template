// Arctic Air HVAC — New HVAC Installation Page (NEW — did not exist in source)
// Order: Breadcrumb → SectionIntro → TrustBar → ImpactMetrics → WhatToExpect
//        → WhyChooseUs → ProcessTimeline → GuaranteeSection → LocalServiceAreas
//        → ValueComparison → FAQ → CTABanner → ServiceCards → Form
"use client";

import styles from "../page.module.scss";

import Breadcrumb          from "#/PageComponents/Breadcrumb/Breadcrumb";
import SectionIntro        from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar            from "#/PageComponents/TrustBar/TrustBar";
import ImpactMetrics       from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import WhatToExpect        from "#/PageComponents/WhatToExpect/WhatToExpect";
import WhyChooseUs         from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline     from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import GuaranteeSection    from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas   from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import ValueComparison     from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ                 from "#/PageComponents/FAQ/FAQ";
import CTABanner           from "#/PageComponents/CTABanner/CTABanner";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import Variant2            from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faWrench, faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faRotateLeft, faLock,
  faTrophy, faChartLine, faFan, faFire, faThermometerHalf,
  faDollarSign, faRuler, faStar,
} from "@fortawesome/free-solid-svg-icons";

export default function InstallationPage() {

  const metrics = [
    { icon: faTrophy,    value: 650,  label: "New HVAC systems installed across Central Texas", suffix: "+", duration: 2 },
    { icon: faChartLine, value: 100,  label: "Satisfaction rate on new system installs",         suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years installing systems in Waco and beyond",      suffix: "+", duration: 2 },
  ];

  const expectations = [
    { icon: faRuler,        title: "Right-Sizing Comes First",         description: "We calculate your home's exact load requirements before recommending any equipment. An oversized system is almost as bad as an undersized one — we get the math right." },
    { icon: faSearch,       title: "Honest Equipment Recommendation",  description: "We'll present options at multiple price points with honest pros and cons. No upselling to equipment you don't need. You choose — we install." },
    { icon: faCheckCircle,  title: "Clean, Code-Compliant Installation", description: "Full installation by our own licensed, insured crew — no subs. Every electrical connection, refrigerant line, and duct connection done to code and fully tested." },
    { icon: faShieldHalved, title: "System Registration & Warranty",   description: "We register your new equipment with the manufacturer and walk you through the full warranty terms before we leave." },
  ];

  const whyFeatures = [
    { icon: faDollarSign,   title: "Financing Available",             description: "New HVAC systems are a significant investment. We offer flexible financing for qualified homeowners — 0% interest options available. Ask us for details." },
    { icon: faRuler,        title: "We Never Oversell Equipment",     description: "Some companies install the biggest unit that fits. We install the right unit for your home's actual load — a properly sized system runs more efficiently and lasts longer." },
    { icon: faStar,         title: "Carrier & Trane Authorized Dealer", description: "We're an authorized dealer for Carrier and Trane — two of the most reliable brands in the industry. Your new system comes with the full manufacturer warranty." },
  ];

  const processSteps = [
    { number: 1, title: "Free In-Home Assessment", description: "We measure your home, evaluate your existing ductwork, and calculate exact load requirements before recommending any equipment.", icon: faRuler },
    { number: 2, title: "Written Quote",            description: "Flat-rate written quote with equipment details, installation scope, and timeline — before any commitment is made.", icon: faFileContract },
    { number: 3, title: "Installation Day",         description: "Our own licensed crew arrives on time. Typical residential install is 4–6 hours. No subcontractors, no surprises.", icon: faWrench },
    { number: 4, title: "Commissioning & Handoff",  description: "System fully tested and balanced. We register the warranty, show you the thermostat, and answer every question before we leave.", icon: faCheckCircle },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Flat-Rate Installation Quote",  body: "The price we quote is the price you pay — regardless of how long the installation takes." },
    { icon: faRotateLeft,   title: "1-Year Labor Warranty",         body: "We warrant our installation labor for a full year. If something we did causes a problem, we come back at no charge." },
    { icon: faShieldHalved, title: "Manufacturer Warranty Included", body: "New equipment comes with the full manufacturer warranty — typically 10 years on the compressor and 5 years on parts with proper registration." },
    { icon: faLock,         title: "Licensed, Insured Crew Only",   body: "Every installation is done by our own TDLR-licensed, insured team — no subs, no shortcuts." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling and full installer availability.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full installation service for Hewitt residential homes.",        badge: "" },
    { town: "Woodway",      benefit: "Premium system installations for Woodway properties.",           badge: "" },
    { town: "Robinson",     benefit: "Fast turnaround for Robinson residential replacements.",         badge: "" },
    { town: "China Spring", benefit: "Rural installation coverage — call for timeline details.",       badge: "" },
    { town: "Killeen",      benefit: "Bell County installations for Killeen area homeowners.",         badge: "" },
  ];

  const comparisonRows = [
    { feature: "Right-sizing load calculation",         us: "✅ Always performed",     others: "❌ Often skipped" },
    { feature: "Licensed crew — no subs",              us: "✅ Our own team",          others: "❌ Frequently subbed out" },
    { feature: "Flat-rate installation quote",         us: "✅ Written upfront",       others: "❌ Open-ended estimate" },
    { feature: "Manufacturer warranty registration",   us: "✅ We handle it",          others: "❌ Left to homeowner" },
    { feature: "1-year labor warranty",                us: "✅ Every install",         others: "❌ 90 days or less" },
    { feature: "Financing available",                  us: "✅ 0% interest options",   others: "❌ Cash/card only" },
  ];

  const faq = [
    { question: "How much does a new HVAC system cost in Waco?",      answer: "A new residential system typically runs $4,500–$12,000 depending on the size, brand, and whether ductwork work is needed. We provide a flat-rate written quote after an in-home assessment." },
    { question: "How long does a new installation take?",             answer: "Most residential replacements take 4–6 hours. Same-day installs are often available — especially for common 3-ton and 4-ton systems we carry in stock." },
    { question: "What size system does my home need?",                answer: "That depends on your home's square footage, insulation levels, window exposure, and more. We perform a full Manual J load calculation before recommending any equipment — guessing size is not how we operate." },
    { question: "What brands do you install?",                        answer: "Our primary brands are Carrier and Trane — both authorized dealers. We can also install other major brands on request. We'll give you an honest comparison before you choose." },
    { question: "Do you offer financing?",                            answer: "Yes — flexible financing with approved credit, including 0% interest options for qualifying homeowners. Ask us when you get your quote." },
    { question: "What happens to my old system?",                     answer: "We remove and properly dispose of your old equipment as part of the installation. Refrigerant is recovered according to EPA regulations." },
  ];

  const crossServices = [
    { icon: faFan,            title: "AC Repair",        body: "Need a repair instead? Same-day service for all brands.",                   link: "/services/ac-repair" },
    { icon: faFire,           title: "Heating Service",  body: "Furnace and heat pump repair across Central Texas.",                        link: "/services/heating" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Protect your new investment with our month-to-month maintenance plan.", link: "/services/maintenance" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services", href: "/services" },
        { label: "New Installation" },
      ]} />

      <SectionIntro
        title="New HVAC Installation in Waco, TX"
        subtitle="Right-sized equipment, licensed installation, financing available — backed by a 1-year labor warranty and the full manufacturer warranty."
      />

      <TrustBar headline="650+ new systems installed across Central Texas by our own licensed crew" />

      <div className={styles.section}>
        <ImpactMetrics title="Our Installation Track Record" metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What Your Installation Includes" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Homeowners Choose Arctic Air for New Systems" />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/installation" title="Installation Service Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="New HVAC Installation FAQs" />
      </div>

      <CTABanner
        headline="Ready for a New System? Let's Start with a Free Quote."
        subline="In-home assessment, flat-rate written quote, financing available. Our own licensed crew does every install."
        primaryText="Get a Free Quote"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549001234"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Other Services We Offer" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant2
          title="Schedule a Free Installation Assessment"
          cityName="Waco"
          slug="services/installation"
          spot="installation-page-form"
          formVariant={2}
        />
      </div>

    </main>
  );
}
