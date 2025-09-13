import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { CalendarProps } from "../Interfaces/Props";

const Calendar = ({ selectedDate, onDateChange }: CalendarProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date, event) => {
        if (date) onDateChange(date);
      }}
      minDate={new Date()}
      inline
    />
  );
};
export default Calendar;
