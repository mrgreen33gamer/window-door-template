"use client";
import Breadcrumb from "#/PageComponents/Breadcrumb/Breadcrumb";
import styles from "../page.module.scss";

import SectionIntro from "#/PageComponents/SectionIntro/SectionIntro";
import TrustBar from "#/PageComponents/TrustBar/TrustBar";
import IndustryPainPoints from "#/PageComponents/IndustryPainPoints/IndustryPainPoints";
import WhyChooseUs from "#/PageComponents/WhyChooseUs/WhyChooseUs";
import ProcessTimeline from "#/PageComponents/ProcessTimeline/ProcessTimeline";
import ImpactMetrics from "#/PageComponents/ImpactMetrics/ImpactMetrics";
import ServiceCardComponent from "#/PageComponents/ServiceCardComponent/ServiceCardComponent";
import ValueComparison from "#/PageComponents/ValueComparison/ValueComparison";
import FAQ from "#/PageComponents/FAQ/FAQ";
import CTABanner from "#/PageComponents/CTABanner/CTABanner";
import LocalServiceAreas from "#/PageComponents/LocalServiceAreas/LocalServiceAreas";
import Variant4 from "#/PageComponents/ContactForms/Variant4/Form";

import {
  faMobileAlt, faSearch, faStar, faCalendarAlt,
  faCar, faWrench, faClipboardList, faChartBar,
  faRocket, faGlobe, faTrophy, faChartLine, faClock,
  faPalette, faBullhorn, faCode, faTools,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function AutomotiveIndustryPage() {

  const painPoints = [
    {
      icon: faCar,
      problem: "No online inventory or vehicle listing pages",
      consequence: "Buyers search for specific makes, models, and trim levels before they ever set foot on a lot. Without indexed inventory pages, you're invisible to the searches that matter most.",
    },
    {
      icon: faCalendarAlt,
      problem: "Service appointments still booked by phone only",
      consequence: "Customers want to book a service appointment at 10pm. If you don't offer online booking, they book with the shop down the road that does — and you lose a loyal customer before they start.",
    },
    {
      icon: faSearch,
      problem: "Your Google Business Profile isn't optimized for automotive searches",
      consequence: "'Auto repair near me,' 'oil change Waco,' and 'used cars Central Texas' all have GBP as the dominant result. Without an optimized profile, you're absent from the searches driving walk-ins.",
    },
    {
      icon: faStar,
      problem: "No system to collect reviews after service visits",
      consequence: "Automotive is one of the highest-reviewed categories on Google. Shops with 200+ reviews and a 4.8 average get the calls. Most shops get great feedback but never systematically capture it.",
    },
    {
      icon: faMobileAlt,
      problem: "Your website isn't mobile-first or fast enough",
      consequence: "Most automotive searches happen on phones — often from the lot of a competitor or while waiting for a ride. A slow or hard-to-navigate site loses that comparison shopper instantly.",
    },
    {
      icon: faClipboardList,
      problem: "Service history and customer records scattered across systems",
      consequence: "Not knowing a repeat customer's vehicle history creates a poor experience and missed upsell opportunities. A simple CRM built for your shop fixes this permanently.",
    },
  ];

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

  const processSteps = [
    { number: 1, title: "Audit Your Automotive Digital Presence", description: "We review your GBP, website speed, inventory visibility, and local search rankings — identifying every search where a competitor is capturing your customer.", icon: faSearch },
    { number: 2, title: "Build Inventory & Booking Systems",       description: "Vehicle listing pages, online booking, and a GBP optimized for your service menu — deployed as one cohesive digital presence.", icon: faRocket },
    { number: 3, title: "Automate Review Collection",              description: "Post-service review requests that systematically build your Google reputation — turning every completed job into a public trust signal.", icon: faStar },
    { number: 4, title: "Add Customer & Service Tools",            description: "Custom service history, CRM, and customer communication tools when you're ready to streamline your shop operations.", icon: faTools },
  ];

  const metrics = [
    { icon: faTrophy,    value: 45,  label: "Average increase in service bookings after launch", suffix: "%", duration: 2 },
    { icon: faChartLine, value: 290, label: "Average ROI across active automotive campaigns",    suffix: "%", duration: 3 },
    { icon: faClock,     value: 13,  label: "Years serving Texas businesses",                    suffix: "+", duration: 2 },
  ];

  const comparisonRows = [
    { feature: "Indexed inventory/vehicle pages",    us: "✅ SEO-optimized per vehicle",     others: "❌ Generic lot page only" },
    { feature: "Online service booking",             us: "✅ 24/7 booking built in",          others: "❌ Phone only" },
    { feature: "GBP automotive optimization",        us: "✅ Category + service menu focus",  others: "❌ Generic GBP setup" },
    { feature: "Automated review collection",        us: "✅ Post-service system built in",   others: "❌ Manual follow-up only" },
    { feature: "Central Texas market knowledge",     us: "✅ 13+ years local",               others: "❌ Out-of-state agency" },
  ];

  const faq = [
    {
      question: "How do you build vehicle inventory pages that rank on Google?",
      answer: "Each vehicle gets its own SEO-optimized page with structured data markup including make, model, year, price, mileage, and VIN. This allows Google to index individual listings and surface them for specific vehicle searches — which is how buyers actually shop online.",
    },
    {
      question: "Can you integrate online booking with my existing scheduling software?",
      answer: "In most cases yes — we can integrate with common automotive scheduling tools or build a lightweight standalone booking system if you're starting fresh. Either way, customers get a seamless experience and you get fewer inbound calls for routine scheduling.",
    },
    {
      question: "How do you help auto shops rank for 'near me' service searches?",
      answer: "We optimize your GBP with automotive-specific service categories, weekly content updates, photo uploads, and review response management — all of which are direct ranking factors for local automotive map pack results.",
    },
    {
      question: "Can you build a simple CRM for tracking repeat service customers?",
      answer: "Yes — we build lightweight customer and vehicle history tools that give your service advisors instant access to past work, mileage milestones, and scheduled maintenance — creating a better customer experience and more upsell opportunities.",
    },
    {
      question: "Do you work with auto businesses outside of Waco?",
      answer: "Yes — we serve automotive businesses across all of Texas. Inventory SEO and local marketing strategies are calibrated to your specific market and competitive landscape.",
    },
  ];

  const localAreas = [
    { town: "Waco",         benefit: "Active automotive and repair market across McLennan County.", highlight: "Most Requested" },
    { town: "Hewitt",       benefit: "Growing residential community with strong service demand.",   highlight: "" },
    { town: "Robinson",     benefit: "Contractor and family vehicles — steady service volume.",    highlight: "" },
    { town: "Temple",       benefit: "Bell County auto businesses we actively serve.",            highlight: "" },
    { town: "Killeen",      benefit: "Large base of personal and fleet vehicles.",               highlight: "" },
    { town: "Woodway",      benefit: "Premium residential — higher-value vehicles and services.", highlight: "" },
  ];

  const services = [
    { icon: faGlobe,    title: "Automotive Website Design",   body: "Inventory pages, booking systems, and GBP-optimized sites built for auto businesses.",         link: "/services/website-design" },
    { icon: faBullhorn, title: "Automotive Digital Marketing", body: "Google Ads, local SEO, and review systems that drive bays and move inventory.",                 link: "/services/marketing-solutions" },
    { icon: faCode,     title: "Booking & CRM Tools",         body: "Service scheduling and customer history tools built for your shop's workflow.",                  link: "/services/software-engineering" },
    { icon: faPalette,  title: "Automotive Brand & Logo",     body: "Professional branding that builds trust with buyers and service customers.",                    link: "/services/graphic-design" },
  ];

  return (
    <main className={styles.pageWrapper}>

      <Breadcrumb crumbs={[
        { label: "Home", href: "/" },
        { label: "Industries", href: "/industries" },
        { label: "Automotive" },
      ]} />

      <SectionIntro
        title="Web Design & Marketing for Automotive Businesses"
        subtitle="Inventory pages, online booking, and Google optimization built for auto repair shops and dealerships — fill your service bays and move more vehicles."
      />

      <TrustBar headline="Trusted by automotive and service businesses across Central Texas for 13+ years" />

      <IndustryPainPoints
        industry="automotive"
        painPoints={painPoints}
        ctaText="Fix My Auto Business Online"
        ctaLink="/contact"
      />

      <div className={styles.section}>
        <WhyChooseUs
          cityName="automotive businesses"
          features={whyFeatures}
          title="What We Build Differently for Auto Businesses"
        />
      </div>

      <div className={styles.section}>
        <ProcessTimeline steps={processSteps} cityName="your automotive business" />
      </div>

      <div className={styles.section}>
        <ImpactMetrics metrics={metrics} cityName="automotive" />
      </div>

      <div className={styles.section}>
        <ServiceCardComponent
          heading="Every Service Your Automotive Business Needs"
          cards={services}
        />
      </div>

      <div className={styles.section}>
        <LocalServiceAreas
          cityName="Waco"
          areas={localAreas}
          servicePath="industries/automotive"
          title="Serving Automotive Businesses Across Texas"
        />
      </div>

      <div className={styles.section}>
        <ValueComparison rows={comparisonRows} />
      </div>

      <div className={styles.section}>
        <FAQ cityName="automotive" faq={faq} title="Automotive Digital Marketing FAQs" />
      </div>

      <CTABanner
        headline="Ready to Fill Your Service Bays and Move More Inventory?"
        subline="Inventory pages, booking tools, and Google optimization built for automotive businesses in Texas. Free audit."
        primaryText="Get Your Free Auto Audit"
        primaryLink="/contact"
        secondaryText="Call Us Now"
        secondaryLink="tel:+12549002520"
      />

      <div className={styles.section}>
        <Variant4
          title="Tell Us About Your Automotive Business"
          cityName="Waco"
          slug="industries/automotive"
          spot="automotive-industry-page"
          formVariant={4}
        />
      </div>

    </main>
  );
}