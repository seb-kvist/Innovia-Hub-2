import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { CalendarProps } from "../Interfaces/CalendarProps";

const Calendar = ({selectedDate, onDateChange}:CalendarProps) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      inline
    />
  );
};
export default Calendar;
