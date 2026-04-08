'use client';

import React, { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isWithinInterval,
  isAfter,
  isBefore,
  eachDayOfInterval
} from 'date-fns';
import styles from './CalendarGrid.module.css';

interface CalendarGridProps {
  onRangeSelect: (start: Date | null, end: Date | null) => void;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  holidays: { date: Date; name: string }[];
  hasNotes: string[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  onRangeSelect, 
  selectedStart, 
  selectedEnd,
  holidays,
  hasNotes
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3)); // April 2026
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const isHoliday = (date: Date) => {
    return holidays.find(h => isSameDay(h.date, date));
  };

  const dayHasNote = (date: Date) => {
    return hasNotes.includes(date.toISOString().split('T')[0]);
  };


  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = [];
  let day = startDate;

  while (day <= endDate) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  const handleDateClick = (clickedDate: Date) => {
    if (!isSameMonth(clickedDate, monthStart)) return;

    if (!selectedStart || (selectedStart && selectedEnd)) {
      onRangeSelect(clickedDate, null);
    } else if (selectedStart && !selectedEnd) {
      if (isBefore(clickedDate, selectedStart)) {
        onRangeSelect(clickedDate, null);
      } else if (isSameDay(clickedDate, selectedStart)) {
        onRangeSelect(null, null);
      } else {
        onRangeSelect(selectedStart, clickedDate);
      }
    }
  };

  const isInRange = (date: Date) => {
    if (selectedStart && selectedEnd) {
      return isWithinInterval(date, { start: selectedStart, end: selectedEnd });
    }
    if (selectedStart && hoverDate && isAfter(hoverDate, selectedStart)) {
       return isWithinInterval(date, { start: selectedStart, end: hoverDate });
    }
    return false;
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.daysHeader}>
        {daysOfWeek.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className={styles.grid}>
        {calendarDays.map((d, i) => {
          const isCurrentMonth = isSameMonth(d, monthStart);
          const isSelectedStart = selectedStart && isSameDay(d, selectedStart);
          const isSelectedEnd = selectedEnd && isSameDay(d, selectedEnd);
          const inRange = isInRange(d);
          const isToday = isSameDay(d, new Date());
          const holiday = isHoliday(d);
          const hasNote = dayHasNote(d);

          return (
            <div 
              key={i}
              className={`${styles.dayCell} ${!isCurrentMonth ? styles.empty : ''} ${isSelectedStart || isSelectedEnd ? styles.isSelected : ''} ${inRange && isCurrentMonth ? styles.isInRange : ''} ${isSelectedStart ? styles.isStart : ''} ${isSelectedEnd ? styles.isEnd : ''} ${isToday ? styles.today : ''}`}
              onClick={() => handleDateClick(d)}
              onMouseEnter={() => isCurrentMonth && setHoverDate(d)}
              onMouseLeave={() => setHoverDate(null)}
            >
              <span className={styles.dayNumber}>{format(d, 'd')}</span>
              {holiday && <span className={styles.holidayIcon} title={holiday.name}>🎉</span>}
              {hasNote && <span className={styles.noteIndicator} />}
            </div>
          );

        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
