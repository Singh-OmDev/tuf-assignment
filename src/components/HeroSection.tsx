import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <div className={styles.heroContainer}>
      <Image 
        src="/hero.png" 
        alt="Mountain Climber" 
        fill
        className={styles.heroImage}
        priority
      />
      <div className={styles.overlayLight} />
      <div className={styles.overlay} />
      <div className={styles.textOverlay}>
        <div className={styles.year}>2026</div>
        <div className={styles.month}>April</div>
      </div>
    </div>
  );
};

export default HeroSection;
