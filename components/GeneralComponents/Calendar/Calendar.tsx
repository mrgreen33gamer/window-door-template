"use client";
import { useState, useCallback } from "react";
import styles from "./styles.module.scss";

export interface CalendarDate {
  date: Date;
  iso: string;   // "YYYY-MM-DD"
  label: string; // "Monday, April 14, 2026"
}

interface CalendarProps {
  onDateSelect: (selection: CalendarDate | null) => void;
  initialDate?: Date;
  className?: string;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAYS_OF_WEEK = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function toMidnight(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatLabel(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const Calendar: React.FC<CalendarProps> = ({
  onDateSelect,
  initialDate,
  className = "",
}) => {
  const today = toMidnight(new Date());

  const [viewYear, setViewYear] = useState(
    initialDate ? initialDate.getFullYear() : today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    initialDate ? initialDate.getMonth() : today.getMonth()
  );
  const [selected, setSelected] = useState<Date | null>(
    initialDate ? toMidnight(initialDate) : null
  );

  const goToPrevMonth = useCallback(() => {
    const isCurrentMonth =
      viewYear === today.getFullYear() && viewMonth === today.getMonth();
    if (isCurrentMonth) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewYear, viewMonth, today]);

  const goToNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  const handleDayClick = useCallback(
    (date: Date) => {
      setSelected(date);
      onDateSelect({
        date,
        iso: formatISO(date),
        label: formatLabel(date),
      });
    },
    [onDateSelect]
  );

  const totalDays = daysInMonth(viewYear, viewMonth);
  const startOffset = firstDayOfWeek(viewYear, viewMonth);
  const isCurrentMonth =
    viewYear === today.getFullYear() && viewMonth === today.getMonth();

  return (
    <div className={`${styles.calendar} ${className}`}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <button
          className={styles.navBtn}
          onClick={goToPrevMonth}
          disabled={isCurrentMonth}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className={styles.monthLabel}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          className={styles.navBtn}
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* ── DAY-OF-WEEK ROW ── */}
      <div className={styles.dowRow}>
        {DAYS_OF_WEEK.map((d) => (
          <span key={d} className={styles.dowLabel}>
            {d}
          </span>
        ))}
      </div>

      {/* ── DAYS GRID ── */}
      <div className={styles.daysGrid}>
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className={styles.emptyCell} />
        ))}

        {/* Day buttons */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const dayNum = i + 1;
          const date = toMidnight(new Date(viewYear, viewMonth, dayNum));
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isSelected = selected !== null && date.getTime() === selected.getTime();
          const isDisabled = isPast && !isToday;

          return (
            <button
              key={dayNum}
              className={[
                styles.dayBtn,
                isToday ? styles.today : "",
                isSelected ? styles.selected : "",
                isDisabled ? styles.disabled : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => !isDisabled && handleDayClick(date)}
              disabled={isDisabled}
              aria-label={formatLabel(date)}
              aria-pressed={isSelected}
              aria-current={isToday ? "date" : undefined}
            >
              {dayNum}
            </button>
          );
        })}
      </div>

      {/* ── SELECTED DATE FOOTER ── */}
      <div className={styles.footer}>
        <span className={styles.footerLabel}>Selected</span>
        <span className={styles.footerDate}>
          {selected ? formatLabel(selected) : "No date selected"}
        </span>
      </div>
    </div>
  );
};

export default Calendar;