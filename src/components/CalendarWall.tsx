import React from 'react';
import styles from './CalendarWall.module.css';

interface CalendarWallProps {
  children: React.ReactNode;
}

const CalendarWall: React.FC<CalendarWallProps> = ({ children }) => {
  // Create 20 rings for the binder look
  const rings = Array.from({ length: 24 }).map((_, i) => (
    <div key={i} className={styles.ring} />
  ));

  return (
    <div className={styles.wallContainer}>
      <div className={styles.rings}>
        {rings}
      </div>
      <div className={styles.innerContent}>
        {children}
      </div>
    </div>
  );
};

export default CalendarWall;
