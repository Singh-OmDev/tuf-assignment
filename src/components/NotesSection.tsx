'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import styles from './NotesSection.module.css';

interface NotesSectionProps {
  selectedStart: Date | null;
  selectedEnd: Date | null;
  dailyNotes: Record<string, string>;
  onUpdateDailyNote: (date: Date, text: string) => void;
  holidays: { date: Date; name: string }[];
}

const NotesSection: React.FC<NotesSectionProps> = ({ 
  selectedStart, 
  selectedEnd, 
  dailyNotes, 
  onUpdateDailyNote,
  holidays
}) => {
  const [activeTab, setActiveTab] = useState<'month' | 'day'>('month');
  const [monthNote, setMonthNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('calendar-month-note');
    if (saved) setMonthNote(saved);
  }, []);

  const handleMonthNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setMonthNote(text);
    localStorage.setItem('calendar-month-note', text);
  };

  const selectedDateKey = selectedStart ? selectedStart.toISOString().split('T')[0] : null;
  const currentDailyNote = selectedDateKey ? dailyNotes[selectedDateKey] || '' : '';
  const currentHoliday = selectedStart ? holidays.find(h => h.date.toISOString().split('T')[0] === selectedDateKey) : null;


  const getRangeText = () => {
    if (selectedStart && selectedEnd) {
      return `${format(selectedStart, 'MMM d')} - ${format(selectedEnd, 'MMM d, yyyy')}`;
    }
    if (selectedStart) {
      return `Starting ${format(selectedStart, 'MMM d, yyyy')}`;
    }
    return null;
  };

  return (
    <div className={styles.notesContainer}>
      <div className={styles.tabHeader}>
        <button 
          className={`${styles.tab} ${activeTab === 'month' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('month')}
        >
          General Memos
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'day' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('day')}
          disabled={!selectedStart}
        >
          {selectedStart ? format(selectedStart, 'MMM d') : 'Select Day'} Note
        </button>
      </div>

      <div className={styles.paper}>
        {activeTab === 'month' ? (
          <textarea 
            className={styles.textarea}
            placeholder="Jot down your general memos..."
            value={monthNote}
            onChange={handleMonthNoteChange}
          />
        ) : (
          <textarea 
            className={styles.textarea}
            placeholder={`Notes for ${format(selectedStart!, 'MMMM do')}...`}
            value={currentDailyNote}
            onChange={(e) => onUpdateDailyNote(selectedStart!, e.target.value)}
          />
        )}
      </div>
      
      <div className={styles.dateInfo}>
        {currentHoliday && (
          <div className={styles.holidayBadge}>
            🎉 {currentHoliday.name}
          </div>
        )}
        {getRangeText() ? (
          <div className={styles.dateRangeText}>
            Selected: {getRangeText()}
          </div>
        ) : (
          <div className={styles.emptyState}>
            Select a range on the grid to plan your adventure.
          </div>
        )}
      </div>
    </div>
  );
};


export default NotesSection;
