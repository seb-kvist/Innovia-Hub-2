using System;
using Backend.DTOs.Booking;
using Backend.Interfaces.IRepositories;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories;

public class BookingRepository: IBookingRepository
{
    private readonly AppDbContext _context;
    public BookingRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Booking> AddBookingAsync(DTOCreateBooking booking)
    {
        var available = await IsResourceAvailableAsync(booking.ResourceId, booking.Date, booking.TimeSlot);
        if (!available)
        {
            throw new Exception("Resource is already booked for this timeslot.");
        }
        var newBooking = new Booking
        {
            Date = booking.Date,
            TimeSlot = booking.TimeSlot,
            ResourceId = booking.ResourceId,
            UserId = booking.UserId
        };

        _context.Bookings.Add(newBooking);
        await _context.SaveChangesAsync();
        return newBooking;
    }
    public async Task<bool> IsResourceAvailableAsync(int resourceId, DateTime dateTime, string timeSlot)
    {
        return !await _context.Bookings.AnyAsync(b => b.ResourceId == resourceId && b.Date.Date == dateTime.Date && b.TimeSlot == timeSlot);
    }
    public Task DeleteBooking(int bookingId)
    {
        throw new NotImplementedException();
    }
}
