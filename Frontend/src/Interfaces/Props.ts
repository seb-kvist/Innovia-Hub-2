export interface FreeSlotsProps{
    resourceId:number;
    date:string;
}
export interface CalendarProps{
    selectedDate: Date| null;
    onDateChange:(date:Date|null)=>void;
}
export interface ResourceImageAndDateProps{
    imgUrl:string;
    imgAlt:string;
    selectedDate:string;
}