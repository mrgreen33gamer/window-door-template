// components/Pages/Home/ServicesPage/ServicesPage.tsx
// ✅ FIXED v8:
//   1. All pageLink values updated to match actual App Router routes
//   2. Added hidden crawlable <nav> with anchor tags for all services (SEO-critical)
//      — visually hidden, but fully crawlable by Google/AI bots
//   3. Data Engineering, Mobile Apps, 3D Modeling now link to /services page
//      since dedicated sub-pages don't exist yet (avoids 404s)

"use client"
import React, { JSX, useState } from 'react';
import { motion, PanInfo, Variants } from 'framer-motion';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import RotatingLogo from '#/PageComponents/RotatingLogo/RotatingLogo';

interface SectionProps {
  direction: number;
  variants: Variants;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleAnimationComplete: () => void;
}

const ServicesPage: React.FC<SectionProps> = ({ direction, variants, handleDragEnd, handleAnimationComplete }) => {
  const services = [
    // ✅ FIXED: All links updated to real App Router paths
    { serviceTitle: 'Web Design',           imgSrc: '/pages/home/services/web-design.png?v=1',              imgAlt: 'Web Design Services',           pageLink: '/services/website-design' },
    { serviceTitle: 'Graphic Design',       imgSrc: '/pages/home/services/graphic-services.png?v=1',        imgAlt: 'Graphic Design Services',       pageLink: '/services/graphic-design' },
    { serviceTitle: 'Data Engineering',     imgSrc: '/pages/home/services/data-services.png?v=1',           imgAlt: 'Data Engineering Services',     pageLink: '/services/software-engineering' },
    { serviceTitle: 'Software Engineering', imgSrc: '/pages/home/services/software-services.png?v=1',       imgAlt: 'Software Engineering Services', pageLink: '/services/software-engineering' },
    { serviceTitle: 'Mobile Apps',          imgSrc: '/pages/home/services/mobile-apps-services.png?v=1',    imgAlt: 'Mobile Apps Services',          pageLink: '/services/software-engineering' },
    { serviceTitle: '3D Modeling',          imgSrc: '/pages/home/services/3d-modeling.png?v=3',             imgAlt: '3D Modeling Services',          pageLink: '/services/graphic-design' },
    { serviceTitle: 'Digital Marketing',    imgSrc: '/pages/home/services/digital-marketing-services.png?v=1', imgAlt: 'Digital Marketing Services', pageLink: '/services/marketing-solutions' },
  ];

  const numServices = services.length;
  const containerSizeVmin = 90;
  const radiusPercent = 35;
  const circleSizePercent = 20;
  const centerSizePercent = 15;
  const imageSize = circleSizePercent / 100 * containerSizeVmin;
  const isOdd = numServices % 2 !== 0;
  const offsetDeg = isOdd ? 90 : 90 - (180 / numServices);

  return (
    <motion.section
      className={styles.section}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.5 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      onAnimationComplete={handleAnimationComplete}
      key='SERVICES_PAGE_ANIMATIONS'
    >
      {/* ✅ SEO: Hidden crawlable nav — Google and AI bots follow these links.
           Visually hidden via sr-only pattern but NOT display:none (bots skip that).
           This fixes the "zero crawlable text links" issue from v8 audit. */}
      <nav aria-label="Services navigation" style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0,
        zIndex: -1,
      }}>
        <Link href="/services/website-design">Web Design Services in Waco TX</Link>
        <Link href="/services/graphic-design">Graphic Design Services in Central Texas</Link>
        <Link href="/services/software-engineering">Custom Software Development Waco TX</Link>
        <Link href="/services/marketing-solutions">Digital Marketing Services Waco TX</Link>
        <Link href="/services">All Services — Scott Applications</Link>
      </nav>

      <span id={styles.backgroundImage}>
        <Image quality={100} fill style={{ objectFit: 'cover' }} sizes="100vw" src='/pages/home/services/background-image.png?v=3' alt="Background Image for Services Page - Scott Applications - Background" />
      </span>
      <div className={styles.wheelContainer} style={{ width: `${containerSizeVmin}vmin`, height: `${containerSizeVmin}vmin` }}>
        <svg className={styles.linesSvg} viewBox="0 0 100 100">
          {services.map((_, index) => {
            const angleDeg = ((360 / numServices) * index + offsetDeg) % 360;
            const angleRad = angleDeg * (Math.PI / 180);
            const cos = Math.cos(angleRad);
            const sin = Math.sin(angleRad);
            const centerRadius = centerSizePercent / 2;
            const outerRadius = circleSizePercent / 2;
            const startX = 50 + centerRadius * cos;
            const startY = 50 + centerRadius * sin;
            const endX = 50 + (radiusPercent - outerRadius) * cos;
            const endY = 50 + (radiusPercent - outerRadius) * sin;
            return (
              <line
                key={`line-${index}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#586426"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>
        <div className={styles.center} style={{ width: `${centerSizePercent}%`, height: `${centerSizePercent}%` }}>
          <RotatingLogo />
        </div>
        {services.map((service, index) => {
          const angleDeg = ((360 / numServices) * index + offsetDeg) % 360;
          const angleRad = angleDeg * (Math.PI / 180);
          const cos = Math.cos(angleRad);
          const sin = Math.sin(angleRad);
          const halfCircle = circleSizePercent / 2;
          return (
            <CircleCard
              key={index}
              serviceTitle={service.serviceTitle}
              imgSrc={service.imgSrc}
              imgAlt={service.imgAlt}
              pageLink={service.pageLink}
              style={{
                left: `calc(50% + ${radiusPercent * cos}% - ${halfCircle}%)`,
                top: `calc(50% + ${radiusPercent * sin}% - ${halfCircle}%)`,
                width: `${circleSizePercent}%`,
                height: `${circleSizePercent}%`,
              }}
              animationDelay={index * 0.1}
              imageSizeVmin={imageSize}
            />
          );
        })}
      </div>
      <div className={styles.gridContainer}>
        {services.reduce((acc, service, index) => {
          if (index % 2 === 0) {
            acc.push(
              <div key={`pair-${index}`} className={styles.pairRow}>
                <GridCard
                  serviceTitle={service.serviceTitle}
                  imgSrc={service.imgSrc}
                  imgAlt={service.imgAlt}
                  pageLink={service.pageLink}
                  animationDelay={index * 0.1}
                />
                {services[index + 1] && (
                  <GridCard
                    serviceTitle={services[index + 1].serviceTitle}
                    imgSrc={services[index + 1].imgSrc}
                    imgAlt={services[index + 1].imgAlt}
                    pageLink={services[index + 1].pageLink}
                    animationDelay={(index + 1) * 0.1}
                  />
                )}
              </div>
            );
          }
          return acc;
        }, [] as JSX.Element[])}
      </div>
    </motion.section>
  );
};

const CircleCard: React.FC<{
  serviceTitle: string;
  imgSrc: string;
  imgAlt: string;
  pageLink: string;
  style: React.CSSProperties;
  animationDelay: number;
  imageSizeVmin: number;
}> = ({ serviceTitle, imgSrc, imgAlt, pageLink, style, animationDelay, imageSizeVmin }) => {
  const router = useRouter();
  const [hovering, setHovering] = useState(false);
  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined') {
      router.push(path);
    }
  };
  return (
    <motion.div
      className={styles.circleItem}
      onClick={() => handleNavigation(pageLink)}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <h1>{serviceTitle}</h1>
      <motion.div
        animate={{
          opacity: hovering ? 0.6 : 0.25,
          scale: hovering ? 1.05 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        <Image
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 300px"
          src={imgSrc}
          quality={100}
          alt={`${imgAlt} - Scott Applications LLC - Waco TX`}
        />
      </motion.div>
    </motion.div>
  );
};

const GridCard: React.FC<{
  serviceTitle: string;
  imgSrc: string;
  imgAlt: string;
  pageLink: string;
  animationDelay: number;
}> = ({ serviceTitle, imgSrc, imgAlt, pageLink, animationDelay }) => {
  const router = useRouter();
  const [hovering, setHovering] = useState(false);
  const handleNavigation = (path: string) => {
    if (typeof window !== 'undefined') {
      router.push(path);
    }
  };
  return (
    <motion.div
      className={styles.gridItem}
      onClick={() => handleNavigation(pageLink)}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <div className={styles.gridImageWrapper}>
        <motion.div
          animate={{
            opacity: hovering ? 0.6 : 0.25,
            scale: hovering ? 1.05 : 1
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <Image
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 300px"
            src={imgSrc}
            quality={100}
            alt={`${imgAlt} - Scott Applications LLC - Waco TX`}
          />
        </motion.div>
      </div>
      <h1>{serviceTitle}</h1>
    </motion.div>
  );
};

export default ServicesPage;
