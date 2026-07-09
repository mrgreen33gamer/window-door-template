// ClearView Windows & Doors — Homepage
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
  faWindowMaximize, faDoorOpen, faBorderAll, faShieldHalved, faWrench, faLeaf,
  faTrophy, faChartLine, faClock,
  faUsers,
  faHeadset, faSearch, faFileContract, faCheckCircle,
  faFileAlt, faRotateLeft, faStar, faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import Variant4 from "#/PageComponents/ContactForms/Variant4/Form";

export default function HomePage() {

  const services = [
    {
      icon: faWindowMaximize,
      title: "Window Replacement",
      body: "Full-home and partial window replacements with vinyl, fiberglass, and wood-clad options. Low-E glass packages built for Texas heat.",
      link: "/services/window-replacement",
    },
    {
      icon: faDoorOpen,
      title: "Entry Door Installation",
      body: "Steel, fiberglass, and wood entry doors with proper flashing, weather sealing, and curb-appeal hardware packages.",
      link: "/services/entry-door-installation",
    },
    {
      icon: faBorderAll,
      title: "Patio & Sliding Doors",
      body: "Patio doors, French doors, and sliding glass doors that open outdoor living without drafts or sticky tracks.",
      link: "/services/patio-sliding-doors",
    },
    {
      icon: faShieldHalved,
      title: "Storm & Impact Windows",
      body: "Impact-rated and storm window solutions for Central Texas wind events, security, and year-round efficiency.",
      link: "/services/storm-impact-windows",
    },
    {
      icon: faWrench,
      title: "Window Repair",
      body: "Fogged glass, failed seals, broken balances, and hardware fixes — when a full replacement is not yet needed.",
      link: "/services/window-repair",
    },
    {
      icon: faLeaf,
      title: "Energy Efficiency Upgrades",
      body: "Low-E retrofits, weatherization, and targeted upgrades that cut cooling costs and improve comfort room by room.",
      link: "/services/energy-efficiency-upgrades",
    },
  ];

  const metrics = [
    { icon: faTrophy,    value: 3500, label: "Window and door installs across Central Texas", suffix: "+", duration: 3 },
    { icon: faClock,     value: 14,   label: "Years of local installation experience",         suffix: "+", duration: 2 },
    { icon: faChartLine, value: 98,   label: "Customer satisfaction rating",                   suffix: "%", duration: 2 },
  ];

  const whyFeatures = [
    {
      icon: faClipboardCheck,
      title: "Flat-Rate Written Quotes",
      description: "You get a firm price after a free in-home measurement. No hourly billing, no surprise add-ons mid-install.",
    },
    {
      icon: faShieldHalved,
      title: "Factory-Certified Installers",
      description: "Every crew is factory-certified, bonded, and insured. We install to manufacturer specs so product warranties stay valid.",
    },
    {
      icon: faUsers,
      title: "Locally Owned Since 2012",
      description: "We're not a franchise. ClearView was founded in Waco by Daniel Crowe. Every decision is made locally.",
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: "Call or Book Online",
      description: "Phone, text, or the form below — your choice. We'll schedule a free in-home measurement that fits your schedule.",
      icon: faHeadset,
    },
    {
      number: 2,
      title: "Measure & Advise",
      description: "A ClearView specialist measures openings, reviews frame and glass options, and explains trade-offs in plain English.",
      icon: faSearch,
    },
    {
      number: 3,
      title: "You Get a Flat-Rate Quote",
      description: "Written price before any order is placed. You decide — zero pressure to proceed. The quote never changes mid-job.",
      icon: faFileContract,
    },
    {
      number: 4,
      title: "Install & Warranty",
      description: "Factory-certified install, clean job site, Lifetime Product Warranty Support + 10-Year Installation Warranty.",
      icon: faCheckCircle,
    },
  ];

  const expectations = [
    {
      icon: faSearch,
      title: "Honest Product Guidance",
      description: "We recommend the frame and glass package that fits your home and budget — not what's easiest to sell.",
    },
    {
      icon: faWrench,
      title: "Clean, Respectful Install",
      description: "Drop cloths down, openings protected, debris hauled away, home left clean. Every single job.",
    },
    {
      icon: faCheckCircle,
      title: "Upfront Flat-Rate Price",
      description: "Written quote after measurement. The number doesn't change when the job runs long — that's our problem, not yours.",
    },
    {
      icon: faStar,
      title: "Manufacturer-Spec Install",
      description: "Proper flashing, shimming, insulation, and sealing so product warranties stay valid and energy savings show up.",
    },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Home base — fastest scheduling and most available crews in the city.", badge: "Home Base" },
    { town: "Hewitt",       benefit: "Full residential coverage. On our regular route.",                      badge: "" },
    { town: "Woodway",      benefit: "Regular availability for Woodway homes and custom installs.",           badge: "" },
    { town: "Temple",       benefit: "Regular service area — quick turnaround guaranteed.",                   badge: "" },
    { town: "China Spring", benefit: "Rural coverage, no trip charge for most China Spring addresses.",       badge: "" },
    { town: "Killeen",      benefit: "Full coverage for Killeen and Fort Cavazos area customers.",            badge: "" },
  ];

  const faq = [
    {
      question: "How much does window replacement cost in Waco?",
      answer: "Most residential replacements range from $450–$1,200 per window depending on size, frame material, and glass package. Full-home projects are quoted as a package after a free measurement.",
    },
    {
      question: "Do you offer free in-home measurements?",
      answer: "Yes — free in-home measurements and consultations across Waco, Temple, Killeen, Hewitt, Woodway, McGregor, China Spring, and Bellmead. Call (254) 740-3300.",
    },
    {
      question: "How quickly can you start my project?",
      answer: "Most measurements are scheduled within a few days. Install dates depend on product lead times — typically 1–4 weeks after order for common vinyl packages.",
    },
    {
      question: "What window and door services do you offer?",
      answer: "Window replacement, entry door installation, patio & sliding doors, storm & impact windows, window repair, and energy efficiency upgrades.",
    },
    {
      question: "Are your installers certified and insured?",
      answer: "Yes — ClearView Windows & Doors uses factory-certified installers who are bonded and insured. Documentation available on request.",
    },
    {
      question: "Do you offer a warranty?",
      answer: "Yes — Lifetime Product Warranty Support plus a 10-Year Installation Warranty covering workmanship on every install.",
    },
  ];

  return (
    <main className={styles.pageWrapper}>

      <WelcomePage />

      <TrustBar
        headline="Waco's trusted window and door company — factory-certified, insured, and warrantied on every install"
      />

      <div className={styles.section}>
        <ServiceCardComponent
          heading="Windows & Doors Done Right"
          subheading="From full replacements to targeted repairs and energy upgrades — ClearView handles it all."
          cards={services}
        />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="Waco" />
      </div>

      <div className={styles.section}>
        <WhyChooseUs cityName="Waco" features={whyFeatures} />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} />
      </div>

      <div className={styles.section}>
        <WhatToExpect expectations={expectations} />
      </div>

      <div className={styles.section}>
        <Testimonials testimonials={reviews} />
      </div>

      <div className={styles.section}>
        <GuaranteeSection />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas cityName="Waco" areas={localAreas} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="Waco" faq={faq} />
      </div>

      <CTABanner
        headline="Ready for Clearer Views and Lower Energy Bills?"
        subline="Free in-home measurement. Flat-rate quotes. Factory-certified installers. Lifetime Product Warranty Support + 10-Year Installation Warranty."
        primaryText="Call (254) 740-3300"
        primaryLink="tel:+12547403300"
        secondaryText="Free Estimate"
        secondaryLink="/contact"
      />

      <div className={styles.section}>
        <BlogPreviewGrid />
      </div>

      <div className={styles.section}>
        <Variant4 title="Request Your Free Window & Door Estimate" cityName="Waco" slug="home" spot="home-page-form" formVariant={1} />
      </div>
    </main>
  );
}
