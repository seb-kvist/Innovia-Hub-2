using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Interfaces.IRepositories;
using System.Xml;
using Backend.DTOs.Booking;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IBookingRepository _bookingRepository;

    public BookingController(AppDbContext context, IBookingRepository bookingRepository)
    {
        _context = context;
        _bookingRepository = bookingRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllBookings()
    {
        var bookings = await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.Resource)
            .ToListAsync();

        return Ok(bookings);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserBookings(string userId)
    {
        var userBookings = await _context.Bookings
            .Where(b => b.UserId == userId)
            .Include(b => b.Resource)
            .ToListAsync();

        if (!userBookings.Any())
        {
            return NotFound(new { message = "No bookings found for this user" });
        }

        return Ok(userBookings);
    }
    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] DTOCreateBooking dto)
    {
           try
        {
            var booking = await _bookingRepository.AddBookingAsync(dto);
            return Ok(booking);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}