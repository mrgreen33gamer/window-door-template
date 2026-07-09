// Arctic Air HVAC — Homepage
// Phase 2: Reshuffled component order + fresh content
// Original order: WelcomePage → TrustBar → ServiceCards → WhatToExpect → WhyChooseUs
//                 → ProcessTimeline → ImpactMetrics → Testimonials → GuaranteeSection
//                 → LocalServiceAreas → FAQ → CTABanner → BlogPreview → Form
//
// New order:      WelcomePage → TrustBar → ImpactMetrics → ServiceCards
//                 → WhyChooseUs → CTABanner (mid) → ProcessTimeline → Testimonials
//                 → GuaranteeSection → LocalServiceAreas → WhatToExpect → FAQ
//                 → BlogPreview → Form
"use client";

import styles from "./page.module.scss";
import reviews from "../../libs/local-db/reviews";

import WelcomePage        from "#/Pages/Home/WelcomePage/WelcomePage";
import TrustBar           from "#/PageComponents/TrustBar/TrustBar";
import ImpactMetrics      from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import WhyChooseUs        from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import CTABanner          from "#/PageComponents/CTABanner/CTABanner";
import ProcessTimeline    from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import Testimonials       from "#/PageComponents/Testimonials/Testimonials";
import GuaranteeSection   from "#/PageComponents/GuaranteeSection/GuaranteeSection";
import LocalServiceAreas  from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import WhatToExpect       from "#/PageComponents/WhatToExpect/WhatToExpect";
import FAQ                from "#/PageComponents/FAQ/FAQ";
import BlogPreviewGrid    from "#/PageComponents/BlogPreviewGrid/BlogPreviewGrid";

import {
  faFan, faFire, faWrench, faFilter, faThermometerHalf, faWind,
  faTrophy, faChartLine, faClock,
  faBolt, faShieldHalved, faUsers,
  faHeadset, faSearch, faFileContract, faCheckCircle,
  faFileAlt, faRotateLeft, faLock, faStar,
} from "@fortawesome/free-solid-svg-icons";
import Variant4 from "#/PageComponents/ContactForms/Variant4/Form";

export default function HomePage() {

  // ── Services ────────────────────────────────────────────────────────────────
  const services = [
    {
      icon: faFan,
      title: "AC Repair",
      body: "Same-day diagnosis on all makes and models. We stock common parts on every truck — most repairs completed in one visit.",
      link: "/services/ac-repair",
    },
    {
      icon: faFire,
      title: "Heating & Furnace",
      body: "Gas furnaces, heat pumps, dual-fuel systems — repaired fast with a full CO safety inspection on every heating call.",
      link: "/services/heating",
    },
    {
      icon: faWrench,
      title: "New Installation",
      body: "Right-sized system selection, clean installation, full commissioning. We never upsell equipment you don't need.",
      link: "/services/installation",
    },
    {
      icon: faFilter,
      title: "Duct Cleaning",
      body: "Full system clean and sanitize — removes years of buildup, improves airflow, and makes a real difference for allergy sufferers.",
      link: "/services/duct-cleaning",
    },
    {
      icon: faThermometerHalf,
      title: "Maintenance Plans",
      body: "Two tune-ups per year, 15% off repairs, priority emergency scheduling. Month-to-month — cancel anytime.",
      link: "/services/maintenance",
    },
    {
      icon: faWind,
      title: "Indoor Air Quality",
      body: "UV purifiers, whole-home humidifiers, HEPA-grade filtration. Breathe cleaner air in every room of your home.",
      link: "/services/indoor-air-quality",
    },
  ];

  // ── Impact metrics (moved up — builds trust before selling) ─────────────────
  const metrics = [
    { icon: faTrophy,    value: 2400, label: "Homes and businesses served in Central Texas", suffix: "+", duration: 3 },
    { icon: faClock,     value: 15,   label: "Years of local HVAC experience",               suffix: "+", duration: 2 },
    { icon: faChartLine, value: 98,   label: "Customer satisfaction rating",                 suffix: "%", duration: 2 },
  ];

  // ── Why Choose Us (3 differentiators) ───────────────────────────────────────
  const whyFeatures = [
    {
      icon: faBolt,
      title: "Emergency Service — Any Hour",
      description: "AC out at 11pm on a Saturday in July? We answer. Emergency dispatch is available 7 days a week, evenings included. Central Texas heat doesn't wait, and neither do we.",
    },
    {
      icon: faShieldHalved,
      title: "NATE-Certified, TDLR-Licensed",
      description: "Every technician on our crew holds NATE certification and a valid Texas TDLR license. No unlicensed subs, no shortcuts. Your home is protected from the first call to the final invoice.",
    },
    {
      icon: faUsers,
      title: "Locally Owned Since 2010",
      description: "We're not a franchise. Arctic Air was founded in Waco by Mike Hawkins, a Waco native with 20+ years in the trade. Every decision is made locally, and every call is answered by someone who lives here.",
    },
  ];

  // ── How it works (process) ───────────────────────────────────────────────────
  const processSteps = [
    {
      number: 1,
      title: "Call or Book Online",
      description: "Phone, text, or the form below — your choice. We'll confirm a same-day or next-day appointment that fits your schedule.",
      icon: faHeadset,
    },
    {
      number: 2,
      title: "Tech Arrives On Time",
      description: "Uniformed, background-checked tech shows up in the window we promised. Full system diagnosis — explained in plain English, not HVAC jargon.",
      icon: faSearch,
    },
    {
      number: 3,
      title: "You Get a Flat-Rate Quote",
      description: "Written price before we touch anything. You decide — zero pressure to proceed. The quote covers parts and labor, and it never changes mid-job.",
      icon: faFileContract,
    },
    {
      number: 4,
      title: "Done Right, Warranted",
      description: "Quality parts, clean worksite, 1-year parts and labor warranty on every repair. We leave when you're satisfied — not when we feel like it.",
      icon: faCheckCircle,
    },
  ];

  // ── What to expect (moved lower — reinforces process detail after trust built) ─
  const expectations = [
    {
      icon: faSearch,
      title: "Honest System Assessment",
      description: "We diagnose what's actually wrong — not what's most profitable to fix. You see the findings before we recommend anything.",
    },
    {
      icon: faWrench,
      title: "Clean, Respectful Service",
      description: "Shoe covers on, work area protected, home left exactly as we found it. Every single visit.",
    },
    {
      icon: faCheckCircle,
      title: "Upfront Flat-Rate Price",
      description: "Written quote before any work starts. The number doesn't change when the job runs long — that's our problem, not yours.",
    },
    {
      icon: faStar,
      title: "Manufacturer-Quality Parts",
      description: "We use OEM-grade parts on every repair, backed by the full 1-year warranty. No gray-market components, no shortcuts.",
    },
  ];

  // ── Service areas ────────────────────────────────────────────────────────────
  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest dispatch and most available techs in the city.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full residential and commercial coverage. On our regular route.",     badge: "" },
    { town: "Woodway",      benefit: "Same-day availability for Woodway homes and businesses.",             badge: "" },
    { town: "Robinson",     benefit: "Regular service area — quick turnaround guaranteed.",                 badge: "" },
    { town: "China Spring", benefit: "Rural coverage, no trip charge for most China Spring addresses.",     badge: "" },
    { town: "Killeen",      benefit: "Full coverage for Killeen and Fort Cavazos area customers.",          badge: "" },
  ];

  // ── FAQ ──────────────────────────────────────────────────────────────────────
  const faq = [
    {
      question: "How much does AC repair cost in Waco?",
      answer: "Most repairs run $150–$650 depending on the issue. Capacitors and contactors are typically $150–$250. Refrigerant recharges run $250–$500. We always provide a flat-rate written quote before starting — the diagnostic fee is waived when you proceed.",
    },
    {
      question: "Do you offer emergency HVAC service?",
      answer: "Yes — 7 days a week including evenings and weekends. In Central Texas heat, a broken AC is a genuine emergency. Call us anytime at (254) 900-1234.",
    },
    {
      question: "How quickly can you come out?",
      answer: "Same-day service is available most days. Emergency calls are dispatched within 1–2 hours. We'll give you an honest ETA when you call — not a 4-hour window.",
    },
    {
      question: "What brands do you service?",
      answer: "All major brands — Carrier, Trane, Lennox, Rheem, Goodman, York, Daikin, and more. We install Carrier and Trane as our preferred brands for new systems.",
    },
    {
      question: "Are you licensed and insured in Texas?",
      answer: "Yes — fully licensed by the Texas Department of Licensing and Regulation (TDLR), bonded, and insured. All technicians are NATE-certified. License number available on request.",
    },
    {
      question: "Do you offer financing for new systems?",
      answer: "Yes — flexible financing with approved credit, including 0% interest options for qualifying homeowners. Ask us when you get your quote.",
    },
  ];

  // ── TrustBar badges (HVAC-specific) ─────────────────────────────────────────
  const trustBadges = [
    { icon: faStar,          label: "5.0 Google Rating",    sub: "200+ Reviews" },
    { icon: faShieldHalved,  label: "TDLR Licensed",        sub: "Texas Certified" },
    { icon: faTrophy,        label: "NATE Certified",       sub: "All Technicians" },
    { icon: faClock,         label: "Same-Day Service",     sub: "7 Days a Week" },
    { icon: faBolt,          label: "Emergency Available",  sub: "Evenings & Weekends" },
    { icon: faFileAlt,       label: "Flat-Rate Pricing",    sub: "No Surprises" },
    { icon: faRotateLeft,    label: "1-Year Warranty",      sub: "Parts & Labor" },
    { icon: faLock,          label: "No Contracts",         sub: "Month-to-Month" },
    { icon: faWrench,        label: "All Brands Serviced",  sub: "Any Make & Model" },
    { icon: faUsers,         label: "Locally Owned",        sub: "Since 2010" },
  ];

  return (
    <main className={styles.pageWrapper}>

      {/* 1. Hero */}
      <WelcomePage />

      {/* 2. Scrolling trust strip — immediately after hero */}
      <TrustBar
        headline="Waco's trusted HVAC company — licensed, insured, and warrantied on every job"
      />

      {/* 3. Impact metrics — build credibility before pitching services */}
      <div className={styles.section}>
        <ImpactMetrics
          title="Numbers That Speak for Us"
          metrics={metrics}
          cityName="Waco"
        />
      </div>

      {/* 4. Services grid */}
      <div className={styles.section}>
        <ServiceCardComponent
          heading="Complete HVAC Services for Your Home"
          cards={services}
        />
      </div>

      {/* 5. Why Choose Us */}
      <div className={styles.section}>
        <WhyChooseUs
          cityName="Waco"
          features={whyFeatures}
          title="What Makes Arctic Air Different"
        />
      </div>

      {/* 14. Contact form — final conversion point */}
      <div className={styles.section}>
        <Variant4
          title="Request Service or a Free Quote"
          cityName="Waco"
          slug="/"
          spot="homepage-contact-form"
          formVariant={2}
        />
      </div>

      {/* 7. How it works — process after the CTA so urgency is set */}
      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      {/* 8. Social proof — reviews before the guarantee promise */}
      <div className={styles.section}>
        <Testimonials testimonials={reviews} />
      </div>

      {/* 9. Guarantee — peer validation already done, now make the promise */}
      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      {/* 6. Mid-page CTA — emergency hook before process details */}
      <CTABanner
        headline="AC Out or Heat Down? Call Us Right Now."
        subline="Same-day and emergency service across Waco, Hewitt, Woodway, Robinson, and all of Central Texas. Flat-rate pricing. 1-year warranty."
        primaryText="Call (254) 900-1234"
        primaryLink="tel:+12549001234"
        secondaryText="Book Online"
        secondaryLink="/contact"
      />


      {/* 10. Service areas */}
      <div className={styles.section}>
        <LocalServiceAreas
          cityName="Waco"
          areas={localAreas}
          servicePath=""
          title="Serving All of Central Texas"
        />
      </div>

      {/* 11. What to expect (detail reassurance — lower in page) */}
      <div className={styles.section}>
        <WhatToExpect
          sectionTitle="Every Service Call, Every Time"
          expectations={expectations}
        />
      </div>

      {/* 12. FAQ */}
      <div className={styles.section}>
        <FAQ
          cityName="Waco"
          faq={faq}
          title="HVAC Questions — Answered Straight"
        />
      </div>

      {/* 13. Blog preview — educational content before the final form */}
      <div className={styles.section}>
        <BlogPreviewGrid />
      </div>

    </main>
  );
}
