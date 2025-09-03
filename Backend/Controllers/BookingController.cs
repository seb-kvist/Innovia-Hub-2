using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingController(AppDbContext context)
    {
        _context = context;
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
}