// Arctic Air HVAC — AC Repair Service Page
// Order: Breadcrumb → SectionIntro → TrustBar → WhatToExpect → WhyChooseUs
//        → ProcessTimeline → ImpactMetrics → Testimonials → GuaranteeSection
//        → LocalServiceAreas → ValueComparison → FAQ → CTABanner → ServiceCards → Form
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
import Variant2            from "#/PageComponents/ContactForms/Variant2/Form";

import {
  faFan, faSearch, faCheckCircle, faClock, faShieldHalved,
  faHeadset, faFileContract, faRotateLeft, faLock,
  faTrophy, faChartLine, faThermometerHalf, faWrench, faFire, faFilter,
} from "@fortawesome/free-solid-svg-icons";
import Variant1 from "#/PageComponents/ContactForms/Variant1/Form";
import Variant3 from "#/PageComponents/ContactForms/Variant3/Form";
import Variant4 from "#/PageComponents/ContactForms/Variant4/Form";

export default function ACRepairPage() {

  const expectations = [
    { icon: faSearch,       title: "Same-Day Diagnosis",                    description: "We arrive on time, run a full system diagnosis, and explain what's wrong in plain English — no upsell pressure, ever." },
    { icon: faFileContract, title: "Flat-Rate Quote Before We Touch Anything", description: "You get a written price before any work starts. It doesn't change when the job takes longer than expected." },
    { icon: faCheckCircle,  title: "Fix It Right the First Time",           description: "We stock common AC parts on every truck — most repairs are completed in a single visit without a return trip." },
    { icon: faShieldHalved, title: "1-Year Parts & Labor Warranty",         description: "Every AC repair we complete is backed by a full year of coverage. If it fails again, we fix it at no charge." },
  ];

  const whyFeatures = [
    { icon: faClock,        title: "Emergency Service — Any Time",         description: "We answer 7 days a week, including evenings and weekends. In Central Texas heat, a broken AC can't wait until Monday." },
    { icon: faFan,          title: "All Makes & Models Serviced",          description: "Carrier, Trane, Lennox, Rheem, Goodman, York, and more — our techs have seen every brand and know them all." },
    { icon: faShieldHalved, title: "NATE-Certified, Licensed in Texas",    description: "Every technician is NATE-certified and TDLR-licensed. You're never dealing with an unlicensed subcontractor on our jobs." },
  ];

  const processSteps = [
    { number: 1, title: "Call or Book",      description: "Contact us by phone, text, or online. We'll schedule you in — usually same-day during business hours.", icon: faHeadset },
    { number: 2, title: "Tech Arrives",      description: "On time, in uniform, with a fully stocked truck. Diagnosis starts immediately.",                         icon: faSearch },
    { number: 3, title: "Flat-Rate Quote",   description: "We show you the exact price before any work begins. You decide — zero pressure.",                        icon: faFileContract },
    { number: 4, title: "Repair & Warranty", description: "Repaired with quality parts, tested before we leave, and warranted for 1 full year.",                   icon: faCheckCircle },
  ];

  const metrics = [
    { icon: faTrophy,    value: 2400, label: "AC repairs and installations completed", suffix: "+", duration: 3 },
    { icon: faChartLine, value: 98,   label: "First-visit fix rate",                   suffix: "%", duration: 2 },
    { icon: faClock,     value: 15,   label: "Years serving Waco-area homeowners",     suffix: "+", duration: 2 },
  ];

  const guarantees = [
    { icon: faFileContract, title: "Flat-Rate Pricing",    body: "The price we quote is the price you pay — no matter how long it takes." },
    { icon: faRotateLeft,   title: "1-Year Full Warranty", body: "Parts and labor both covered for 12 months on every repair we complete." },
    { icon: faHeadset,      title: "Emergency Available",  body: "7-day-a-week availability for genuine HVAC emergencies — evenings included." },
    { icon: faLock,         title: "Licensed & Insured",   body: "TDLR-licensed and fully insured. License number available on request." },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest dispatch, most available techs.", badge: "Fastest Response" },
    { town: "Hewitt",       benefit: "Full AC repair coverage throughout Hewitt.",          badge: "" },
    { town: "Woodway",      benefit: "Same-day AC service for Woodway neighborhoods.",     badge: "" },
    { town: "Robinson",     benefit: "On our regular route — quick turnaround guaranteed.", badge: "" },
    { town: "China Spring", benefit: "Rural coverage — call ahead for same-day availability.", badge: "" },
    { town: "Temple",       benefit: "Full AC service coverage for Bell County homes.",    badge: "" },
  ];

  const comparisonRows = [
    { feature: "Flat-rate price before work starts",  us: "✅ Always written",      others: "❌ Hourly + estimate only" },
    { feature: "1-year parts AND labor warranty",     us: "✅ Every repair",         others: "❌ Parts only" },
    { feature: "NATE-certified technicians",          us: "✅ All techs",             others: "❌ Not always" },
    { feature: "Emergency service 7 days/week",       us: "✅ Always available",     others: "❌ M–F business hours" },
    { feature: "Parts on truck — same-visit repair",  us: "✅ Most repairs",         others: "❌ Often a return trip" },
  ];

  const faq = [
    { question: "How much does AC repair cost in Waco?",          answer: "Most AC repairs range from $150–$650. Capacitor replacement runs $150–$250. Refrigerant recharges run $250–$500. Compressor replacement is typically $800–$1,500. We quote flat-rate before starting." },
    { question: "Can you fix my AC the same day I call?",         answer: "In most cases, yes — especially during business hours. We dispatch from Waco and keep common parts on every truck. Call before noon and same-day service is usually available." },
    { question: "What are common signs my AC needs repair?",      answer: "Warm air blowing, weak airflow, strange noises (grinding, squealing), water leaking, ice on the lines, unusual smells, or a sudden spike in your energy bill are all signals to call us." },
    { question: "My AC is running but not cooling — what's wrong?", answer: "Most common causes: low refrigerant, dirty evaporator coil, failing capacitor, dirty filter restricting airflow, or a thermostat issue. Our tech pinpoints it on the first visit." },
    { question: "At what point is it better to replace than repair?", answer: "If the repair cost exceeds 50% of a new system's price and the unit is over 10 years old, replacement usually wins on lifetime cost. We'll give you an honest opinion either way." },
    { question: "Do you repair mini-split (ductless) systems?",   answer: "Yes — we service all major ductless mini-split brands including Mitsubishi, Daikin, LG, and others. Mini-split repair is fully within our scope." },
  ];

  const crossServices = [
    { icon: faFire,            title: "Heating Repair",    body: "Furnace and heat pump repair across Central Texas.",           link: "/services/heating" },
    { icon: faWrench,          title: "New AC Installation", body: "Right-sized system selection and clean installation.",       link: "/services/installation" },
    { icon: faThermometerHalf, title: "Maintenance Plans", body: "Twice-yearly tune-ups that prevent expensive breakdowns.",     link: "/services/maintenance" },
    { icon: faFilter,          title: "Duct Cleaning",     body: "Improve air quality and system efficiency with a full clean.", link: "/services/duct-cleaning" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home",     href: "/" },
        { label: "Services", href: "/services" },
        { label: "AC Repair" },
      ]} />

      <SectionIntro
        title="AC Repair in Waco, TX"
        subtitle="Same-day diagnosis, flat-rate pricing, and a 1-year parts & labor warranty on every repair — for all brands and all systems."
      />

      <TrustBar headline="2,400+ Central Texas homeowners trust Arctic Air for HVAC service" />

      <div className={styles.section}>
        <WhatToExpect sectionTitle="What Happens When You Call for AC Repair" expectations={expectations} />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} title="Why Waco Calls Arctic Air First" />
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
        <GuaranteeSection />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} servicePath="services/ac-repair" title="AC Repair Across Central Texas" />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} title="AC Repair FAQs — Answered Honestly" />
      </div>

      <CTABanner
        headline="AC Out? We're Ready Right Now."
        subline="Same-day service available. Flat-rate pricing, 1-year warranty, all brands serviced."
        primaryText="Call Us Now"
        primaryLink="tel:+12549001234"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <ServiceCardComponent heading="Other Services You Might Need" cards={crossServices} />
      </div>

      <div className={styles.section}>
        <Variant4
          title="Schedule Your AC Repair"
          cityName="Waco"
          slug="services/ac-repair"
          spot="ac-repair-page-form"
          formVariant={2}
        />
      </div>

    </main>
  );
}
