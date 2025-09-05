using System;
using Backend.DTOs.Booking;
using Backend.Interfaces.IRepositories;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _context;
    public BookingRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Booking> AddBookingAsync(DTOCreateBooking booking)
    {
        var resourcesList = await GetAvailableResourcesAsync(booking.ResourceTypeId, booking.Date, booking.TimeSlot);
        var resource = GetResourceByIdAsync(resourcesList);

      
        var newBooking = new Booking
        {
            Date = booking.Date,
            TimeSlot = booking.TimeSlot,
            ResourceTypeId = booking.ResourceTypeId,
            UserId = booking.UserId,
            ResourceId = resource!.Id,
        };

        _context.Bookings.Add(newBooking);
        await _context.SaveChangesAsync();
        return newBooking;
    }
    public async Task<List<Resource>> GetAvailableResourcesAsync(
                int resourceTypeId, DateTime date, string timeSlot)
            {
            var availableResources = await _context.Resources
        .Where(r => r.IsBookable
                 && r.ResourceTypeId == resourceTypeId
                 && !r.Bookings.Any(b =>
                        b.Date.Date == date.Date &&
                        b.TimeSlot == timeSlot))
        .ToListAsync();

            return availableResources;
        }

    public  Resource? GetResourceByIdAsync(List<Resource> resources)
    {
          return  resources.FirstOrDefault();
            
    }

    public async Task<bool> DeleteBooking(int bookingId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return false;

        _context.Bookings.Remove(booking);
        await _context.SaveChangesAsync();
        return true;
    }
}
