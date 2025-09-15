import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { CalendarProps } from "../Interfaces/CalenderProps";
import "../styles/calender.css";

const Calendar = ({
  selectedDate,
  onDateChange,
  variant = "popup",
}: CalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const goToPreviousDay = () => {
    if (!selectedDate) return;
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onDateChange(prevDate);
  };

  const goToNextDay = () => {
    if (!selectedDate) return;
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(nextDate);
  };

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const handleDateChange = (date: Date) => {
    onDateChange(date);
    if (variant === "popup") setShowCalendar(false);
  };

  return (
    <div className={`custom-calendar ${variant}`}>
      <div className="calendar-header">
        <button onClick={goToPreviousDay}>◀</button>

        <button
          onClick={variant === "popup" ? toggleCalendar : undefined}
          className="selected-date">
          {selectedDate
            ? selectedDate.toLocaleDateString("sv-SE", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            : "Välj datum"}
        </button>

        <button onClick={goToNextDay}>▶</button>
      </div>

      {/* Variant handling */}
      {variant === "popup" && showCalendar && (
        <div className="calendar-popup">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && handleDateChange(date)}
            inline
            minDate={new Date()}
          />
        </div>
      )}

      {variant === "full" && (
        <div className="calendar-full">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && handleDateChange(date)}
            inline
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
