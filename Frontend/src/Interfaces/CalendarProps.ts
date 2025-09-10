export interface CalendarProps{
    selectedDate: Date| null;
    onDateChange:(date:Date|null)=>void;
}