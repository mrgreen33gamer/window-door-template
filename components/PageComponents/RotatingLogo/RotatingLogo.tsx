// PageComponents/RotatingLogo/RotatingLogo.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './styles.module.scss';

interface RotatingLogoProps {
  size?: number;
  duration?: number;
}

const RotatingLogo: React.FC<RotatingLogoProps> = ({ size = 90, duration = 10 }) => {
  const innerSize = (size * 24) / 90;
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(1);
  }, []);

  return (
    <div className={styles.animatedLogo} style={{ width: size, height: size }}>
      <section className={styles.innerLogo}>
        <Image
          width={innerSize}
          height={innerSize}
          style={{ objectFit: 'contain' }}
          src="/logos/parts/inner.png?v=1"
          alt="Scott Applications – Center Logo"
        />
      </section>
      <motion.section
        key={`outer-logo-${animationKey}`}
        className={styles.outerLogo}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        <Image
          width={size}
          height={size}
          style={{ objectFit: 'contain' }}
          src="/logos/parts/outsideLogo.png?v=3"
          alt="Scott Applications – Outer Logo"
        />
      </motion.section>
    </div>
  );
};

export default RotatingLogo;
