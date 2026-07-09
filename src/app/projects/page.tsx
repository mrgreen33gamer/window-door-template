// src/app/projects/page.tsx
"use client";

import styles from './page.module.scss';

import SectionIntro from "#/PageComponents/SectionIntro/SectionIntro";
import ProjectCardGrid from "#/PageComponents/ProjectCardGrid/ProjectCardGrid";
import Testimonials from "#/PageComponents/Testimonials/Testimonials";
import InsuredBadge from "#/PageComponents/InsuredBadge/InsuredBadge";
import ScottAppsCTA from "#/PageComponents/ScottAppsCTA/ScottAppsCTA";
import Variant1 from "#/PageComponents/ContactForms/Variant1/Form";

import reviews from "&/local-db/reviews";

export default function ProjectsPage() {
  return (
    <main className={styles.pageWrapper}>
      <SectionIntro
        title="Our Projects"
        subtitle="Real results for real Central Texas businesses — see what's possible for your company"
      />

      {/* Project card grid — reads from libs/local-db/projects.ts */}
      <div className={styles.section}>
        <ProjectCardGrid
          title="Selected Projects"
          subtitle="Web design, branding & software built for Central Texas — click any card to see the full story"
        />
      </div>

      {/* Scott Apps invoicing CTA */}
      <div className={styles.section}>
        <ScottAppsCTA
          headline="We Also Build Our Own Software"
          subline="Scott Apps is our own invoicing platform — proof that we don't just talk tech, we ship it. Built for small businesses and freelancers who need clean, fast, professional invoicing."
          variant="full"
        />
      </div>

      {/* Testimonials */}
      <div className={styles.section}>
        <Testimonials testimonials={reviews} />
      </div>

      {/* Insured CTA */}
      <div className={styles.section}>
        <InsuredBadge variant="section" ctaLink="/contact" />
      </div>

      {/* Contact form */}
      <div className={styles.section}>
        <Variant1
          title="Want Results Like These for Your Business?"
          cityName="Waco"
          slug="projects"
          spot="projects-page"
          formVariant={1}
        />
      </div>
    </main>
  );
}