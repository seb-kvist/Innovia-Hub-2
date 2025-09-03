using System;

namespace Backend.Models;

public class Booking
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public required string TimeSlot { get; set; } // (08–10)

    // Relations
    public required string UserId { get; set; }
    public User User { get; set; } = null!;

    public int ResourceId { get; set; }
    public Resource Resource { get; set; } = null!;
}
