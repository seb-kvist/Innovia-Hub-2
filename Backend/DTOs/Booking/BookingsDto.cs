using System;

namespace Backend.DTOs.Booking
{
    public class BookingsDto
    {   public  string userName { get; set; }
        public string date { get; set; }
        public string timeSlot { get; set; }
        public string resourceType { get; set; } 
         public string resourceName { get; set; }
    }
}