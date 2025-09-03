using System;

namespace Backend.Models;

public class Resource
{
    public int Id { get; set; }
    public required string ResourceName { get; set; }// ex kontor 1
    public bool IsBookable { get; set; } = true;// admin kan sätta till false

    //Relations
    public int ResourceTypeId { get; set; }
    public required ResourceType ResourceType { get; set; }

    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
