import React from "react";
import { format, addDays, subDays, startOfMonth, endOfMonth, isAfter } from "date-fns";

function DateSlider({ selectedDate, onDateChange }) {
  const dateObj = new Date(selectedDate);
  const today = new Date();

  // --- Year handlers ---
  const handlePrevYear = () =>
    onDateChange(format(new Date(dateObj.getFullYear() - 1, dateObj.getMonth(), dateObj.getDate()), "yyyy-MM-dd"));
  const handleNextYear = () => {
    const nextYearDate = new Date(dateObj.getFullYear() + 1, dateObj.getMonth(), dateObj.getDate());
    if (!isAfter(nextYearDate, today)) onDateChange(format(nextYearDate, "yyyy-MM-dd"));
  };

  // --- Month handlers ---
  const handlePrevMonth = () =>
    onDateChange(format(new Date(dateObj.getFullYear(), dateObj.getMonth() - 1, dateObj.getDate()), "yyyy-MM-dd"));
  const handleNextMonth = () => {
    const nextMonthDate = new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate());
    if (!isAfter(nextMonthDate, today)) onDateChange(format(nextMonthDate, "yyyy-MM-dd"));
  };

  // --- Day handlers ---
  const windowSize = 5; // days shown around selected
  const days = [];
  for (let offset = -Math.floor(windowSize / 2); offset <= Math.floor(windowSize / 2); offset++) {
    const day = addDays(dateObj, offset);
    if (!isAfter(day, today)) days.push(day); // only past & today
  }

  const handlePrevDay = () => onDateChange(format(subDays(dateObj, 1), "yyyy-MM-dd"));
  const handleNextDay = () => {
    const nextDay = addDays(dateObj, 1);
    if (!isAfter(nextDay, today)) onDateChange(format(nextDay, "yyyy-MM-dd"));
  };

  const handleDayClick = (day) => onDateChange(format(day, "yyyy-MM-dd"));

  return (
    <div className="flex flex-col gap-2 w-full items-center select-none">
      {/* Year */}
      <div className="flex items-center text-gray-700 dark:text-gray-200 font-semibold text-xl transition-all">
        <span onClick={handlePrevYear} className="cursor-pointer px-4 hover:text-blue-500 transition-colors">&lt;</span>
        <span className="mx-2">{dateObj.getFullYear()}</span>
        <span
          onClick={handleNextYear}
          className={`cursor-pointer px-4 transition-colors ${
            new Date(dateObj.getFullYear() + 1, dateObj.getMonth(), dateObj.getDate()) > today
              ? "text-gray-400 cursor-not-allowed"
              : "hover:text-blue-500"
          }`}
        >
          &gt;
        </span>
      </div>

      {/* Month */}
      <div className="flex items-center text-gray-600 dark:text-gray-300 font-medium text-lg transition-all">
        <span onClick={handlePrevMonth} className="cursor-pointer px-4 hover:text-blue-500 transition-colors">&lt;</span>
        <span className="mx-2">{format(dateObj, "MMMM")}</span>
        <span
          onClick={handleNextMonth}
          className={`cursor-pointer px-4 transition-colors ${
            new Date(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()) > today
              ? "text-gray-400 cursor-not-allowed"
              : "hover:text-blue-500"
          }`}
        >
          &gt;
        </span>
      </div>

      {/* Days */}
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 text-gray-500 dark:text-gray-400 transition-all">
        <span
          onClick={handlePrevDay}
          className="cursor-pointer px-2 hover:text-blue-500 transition-colors"
        >
          &lt;
        </span>
        {days.map((day) => {
          const dayStr = format(day, "yyyy-MM-dd");
          const isSelected = dayStr === selectedDate;
          return (
            <span
              key={dayStr}
              onClick={() => handleDayClick(day)}
              className={`cursor-pointer transition-colors ${
                isSelected ? "text-blue-500 font-bold text-lg" : "hover:text-blue-400"
              }`}
            >
              {format(day, "d")}
            </span>
          );
        })}
        <span
          onClick={handleNextDay}
          className={`cursor-pointer px-2 transition-colors ${
            addDays(dateObj, 1) > today ? "text-gray-400 cursor-not-allowed" : "hover:text-blue-500"
          }`}
        >
          &gt;
        </span>
      </div>
    </div>
  );
}

export default DateSlider;
