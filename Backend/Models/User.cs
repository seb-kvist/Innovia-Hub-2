using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

/// Identity-användare. Ärver från IdentityUser vilket ger Id, Email, PasswordHash m.m.
public class User : IdentityUser
{
    public string Name { get; set; }

    //Relations
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    //För AnvändarFiltrering då det ej in går i Identity
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}