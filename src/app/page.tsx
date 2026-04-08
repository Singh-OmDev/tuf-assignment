'use client';

import React, { useState, useEffect } from 'react';
import CalendarWall from '@/components/CalendarWall';
import HeroSection from '@/components/HeroSection';
import CalendarGrid from '@/components/CalendarGrid';
import NotesSection from '@/components/NotesSection';
import styles from '@/components/MainContent.module.css';

const HOLIDAYS = [
  { date: new Date(2026, 3, 5), name: 'Easter Sunday' },
  { date: new Date(2026, 3, 12), name: 'Global Adventure Day' },
  { date: new Date(2026, 3, 22), name: 'Earth Day' },
];

export default function Home() {
  const [selectedStart, setSelectedStart] = useState<Date | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<Date | null>(null);
  const [theme, setTheme] = useState('adventure');
  const [dailyNotes, setDailyNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedStart = localStorage.getItem('calendar-selection-start');
    const savedEnd = localStorage.getItem('calendar-selection-end');
    const savedTheme = localStorage.getItem('calendar-theme');
    const savedDailyNotes = localStorage.getItem('calendar-daily-notes');

    if (savedStart) setSelectedStart(new Date(savedStart));
    if (savedEnd) setSelectedEnd(new Date(savedEnd));
    if (savedTheme) setTheme(savedTheme);
    if (savedDailyNotes) setDailyNotes(JSON.parse(savedDailyNotes));
  }, []);

  const handleRangeSelect = (start: Date | null, end: Date | null) => {
    setSelectedStart(start);
    setSelectedEnd(end);
    if (start) localStorage.setItem('calendar-selection-start', start.toISOString());
    else localStorage.removeItem('calendar-selection-start');
    
    if (end) localStorage.setItem('calendar-selection-end', end.toISOString());
    else localStorage.removeItem('calendar-selection-end');
  };

  const handleUpdateDailyNote = (date: Date, text: string) => {
    const key = date.toISOString().split('T')[0];
    const newNotes = { ...dailyNotes, [key]: text };
    setDailyNotes(newNotes);
    localStorage.setItem('calendar-daily-notes', JSON.stringify(newNotes));
  };

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('calendar-theme', newTheme);
  };

  return (
    <main style={{ paddingBottom: '100px' }} data-theme={theme}>
      <div className="theme-switcher">
        <button onClick={() => changeTheme('adventure')}>Adventure</button>
        <button onClick={() => changeTheme('forest')}>Forest</button>
        <button onClick={() => changeTheme('sunset')}>Sunset</button>
        <button className="print-btn" onClick={() => window.print()}>Print / PDF</button>
      </div>

      <CalendarWall>
        <HeroSection theme={theme} />
        <div className={styles.mainContent}>
          <NotesSection 
            selectedStart={selectedStart} 
            selectedEnd={selectedEnd} 
            dailyNotes={dailyNotes}
            onUpdateDailyNote={handleUpdateDailyNote}
            holidays={HOLIDAYS}
          />
          <CalendarGrid 
            onRangeSelect={handleRangeSelect}
            selectedStart={selectedStart}
            selectedEnd={selectedEnd}
            holidays={HOLIDAYS}
            hasNotes={Object.keys(dailyNotes).filter(k => dailyNotes[k].trim() !== '')}
          />
        </div>
      </CalendarWall>


      
      <div style={{ 
        marginTop: '40px', 
        textAlign: 'center', 
        color: '#7f8c8d', 
        fontSize: '0.9rem' 
      }}>
        <p>Tip: Click a date to start selection, click another to set the range.</p>
      </div>
    </main>
  );
}
