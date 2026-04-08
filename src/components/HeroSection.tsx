import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  theme?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ theme = 'adventure' }) => {
  const images: Record<string, string> = {
    adventure: '/hero.png',
    forest: '/forest.png',
    sunset: '/sunset.png',
  };

  const titles: Record<string, string> = {
    adventure: 'April',
    forest: 'Mist',
    sunset: 'Golden',
  };

  return (
    <div className={styles.heroContainer}>
      <Image 
        src={images[theme] || images.adventure} 
        alt="Theme Image" 
        fill
        className={styles.heroImage}
        priority
      />
      <div className={styles.overlayLight} />
      <div className={styles.overlay} />
      <div className={styles.textOverlay}>
        <div className={styles.year}>2026</div>
        <div className={styles.month}>{titles[theme] || titles.adventure}</div>
      </div>

    </div>
  );
};

export default HeroSection;
