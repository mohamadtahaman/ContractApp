import React, { useMemo } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface DatePickerWheelProps {
  idPrefix: string;
  day: string;
  month: string;
  year: string;
  onChange: (d: { day: string; month: string; year: string }) => void;
  lang: Language;
  minYear?: number;
  maxYear?: number;
  hasError?: boolean;
}

const MONTH_NAMES_DE = [
  '01 - Januar', '02 - Februar', '03 - März', '04 - April',
  '05 - Mai', '06 - Juni', '07 - Juli', '08 - August',
  '09 - September', '10 - Oktober', '11 - November', '12 - Dezember'
];

const MONTH_NAMES_AR = [
  '01 - يناير (كانون 2)', '02 - فبراير (شباط)', '03 - مارس (آذار)', '04 - أبريل (نيسان)',
  '05 - مايو (أيار)', '06 - يونيو (حزيران)', '07 - يوليو (تموز)', '08 - أغسطس (آب)',
  '09 - سبتمبر (أيلول)', '10 - أكتوبر (تشرين 1)', '11 - نوفمبر (تشرين 2)', '12 - ديسمبر (كانون 1)'
];

const MONTH_NAMES_EN = [
  '01 - January', '02 - February', '03 - March', '04 - April',
  '05 - May', '06 - June', '07 - July', '08 - August',
  '09 - September', '10 - October', '11 - November', '12 - December'
];

export const DatePickerWheel: React.FC<DatePickerWheelProps> = ({
  idPrefix,
  day,
  month,
  year,
  onChange,
  lang,
  minYear = 1940,
  maxYear = 2030,
  hasError = false,
}) => {
  const t = translations[lang];

  // Month names localized
  const monthNames = lang === 'ar' ? MONTH_NAMES_AR : lang === 'en' ? MONTH_NAMES_EN : MONTH_NAMES_DE;

  // Compute maximum days in currently selected month and year
  const maxDays = useMemo(() => {
    const y = parseInt(year, 10) || 2000;
    const m = parseInt(month, 10) || 1;
    return new Date(y, m, 0).getDate();
  }, [month, year]);

  const daysList = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= maxDays; i++) {
      arr.push(i < 10 ? `0${i}` : `${i}`);
    }
    return arr;
  }, [maxDays]);

  const yearsList = useMemo(() => {
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) {
      arr.push(`${y}`);
    }
    return arr;
  }, [minYear, maxYear]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ day: e.target.value, month, year });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    const y = parseInt(year, 10) || 2000;
    const m = parseInt(newMonth, 10) || 1;
    const daysInNewMonth = new Date(y, m, 0).getDate();
    let currentDayNum = parseInt(day, 10) || 1;
    if (currentDayNum > daysInNewMonth) {
      currentDayNum = daysInNewMonth;
    }
    const formattedDay = currentDayNum < 10 ? `0${currentDayNum}` : `${currentDayNum}`;
    onChange({ day: formattedDay, month: newMonth, year });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    onChange({ day, month, year: newYear });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2">
        {/* Day Select */}
        <div className="relative">
          <label
            htmlFor={`${idPrefix}-day`}
            className="block text-[11px] font-semibold text-stone-600 mb-1"
          >
            {t.day}
          </label>
          <select
            id={`${idPrefix}-day`}
            value={day || '01'}
            onChange={handleDayChange}
            className={`w-full px-3 py-2 text-sm font-medium rounded-lg border bg-white text-stone-900 wheel-select transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
              hasError ? 'border-red-500 bg-red-50/20' : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            {daysList.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Month Select */}
        <div className="relative">
          <label
            htmlFor={`${idPrefix}-month`}
            className="block text-[11px] font-semibold text-stone-600 mb-1"
          >
            {t.month}
          </label>
          <select
            id={`${idPrefix}-month`}
            value={month || '01'}
            onChange={handleMonthChange}
            className={`w-full px-3 py-2 text-sm font-medium rounded-lg border bg-white text-stone-900 wheel-select transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
              hasError ? 'border-red-500 bg-red-50/20' : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            {monthNames.map((name, index) => {
              const val = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
              return (
                <option key={val} value={val}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>

        {/* Year Select */}
        <div className="relative">
          <label
            htmlFor={`${idPrefix}-year`}
            className="block text-[11px] font-semibold text-stone-600 mb-1"
          >
            {t.year}
          </label>
          <select
            id={`${idPrefix}-year`}
            value={year || '1995'}
            onChange={handleYearChange}
            className={`w-full px-3 py-2 text-sm font-medium rounded-lg border bg-white text-stone-900 wheel-select transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a4d2e] ${
              hasError ? 'border-red-500 bg-red-50/20' : 'border-stone-300 hover:border-stone-400'
            }`}
          >
            {yearsList.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
