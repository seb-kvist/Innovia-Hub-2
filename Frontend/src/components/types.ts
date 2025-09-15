export interface Booking {
  bookingId: number;
  userName: string;
  resourceName: string;
  date: string;
  timeSlot: string;
  status: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookings?: Booking[];
}

export interface Resource {
  id: number;
  resourceName: string;
  resourceTypeId: string;
  isBookable: boolean;
  updating?: boolean;
}
