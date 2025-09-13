import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { CalendarProps } from "../Interfaces/Props";
import "../styles/calender.css";

const Calendar = ({ selectedDate, onDateChange }: CalendarProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const goToPreviousDay = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onDateChange(prevDate);
  };

  const goToNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onDateChange(nextDate);
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const handleDateChange = (date: Date) => {
    onDateChange(date);
    setShowCalendar(false);
  };

  return (
    <div className="custom-calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousDay}>◀</button>

        <button onClick={toggleCalendar} className="selected-date">
          {selectedDate.toLocaleDateString("sv-SE", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </button>

        <button onClick={goToNextDay}>▶</button>
      </div>

      {showCalendar && (
        <div className="calendar-popup">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && handleDateChange(date)}
            inline
            minDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
