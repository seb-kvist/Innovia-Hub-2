using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.Interfaces.IRepositories;
using System.Xml;
using Backend.DTOs.Booking;
using System.Runtime.Versioning;
using Microsoft.AspNetCore.Authorization;

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

    [Authorize (Roles = "admin")]

    [HttpGet]
    public async Task<IActionResult> GetAllBookings()
    {
        var bookings = await _context.Bookings
        .Include(b => b.User)
        .Include(b => b.ResourceType)
        .Include(b => b.Resource)
        .Select(b => new BookingsDto
        {   userName = b.User.UserName,
            date = b.Date.ToString("yyyy-MM-dd"),
            timeSlot = b.TimeSlot,
            resourceType = b.ResourceType.ResourceTypeName,
            resourceName = b.Resource.ResourceName
            
        }).ToListAsync();
           
            

        

        return Ok(bookings);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserBookings(string userId)
    {
        var userBookings = await _context.Bookings
        .Include(b => b.Resource)
        .Select(b => new UserBookingDTO
        {   
            date = b.Date.ToString("yyyy-MM-dd"),
            timeSlot = b.TimeSlot,
            resourceName = b.Resource.ResourceName
            
        }).ToListAsync();

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
            
            return Ok(new UserBookingDTO
            {   
                date = booking.Date.ToString("yyyy-MM-dd"),
                timeSlot = booking.TimeSlot,
                resourceName = booking.Resource!.ResourceName
                
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var success = await _bookingRepository.DeleteBooking(id);
        if (!success) return NotFound();

        return NoContent();
    }

    [HttpPatch("resource/{resourceId}")]
    public async Task<IActionResult> ChangeResourceStatus(int resourceId)
    {
        var resource = await _context.Resources.FindAsync(resourceId);
        if (resource == null)
        {
            return NotFound(new { message = "Resource not found" });
        }

        resource.IsBookable =  !resource.IsBookable;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Resource status is changed" });
    }

    

    // [HttpPost("resource/{resourceId}/block-period")]
    // public async Task<IActionResult> BlockResourceForPeriod(int resourceId, [FromBody]  DTOBlockPeriod blockPeriod)
    // {
    //     var resource = await _context.Resources.FindAsync(resourceId);
    //     if (resource == null)
    //     {
    //         return NotFound(new { message = "Resource not found" });
    //     }

    //     // Create a new booking entry to block the resource for the specified period
    //     var blockBooking = new Booking
    //     {
    //         ResourceId = resourceId,
    //         UserId = "system-userid", 
    //         StartTime = blockPeriod.StartDate,
    //         EndTime = blockPeriod.EndDate
    //     };

    //     _context.Bookings.Add(blockBooking);
    //     await _context.SaveChangesAsync();

    //     return Ok(new { message = "Resource blocked for the specified period" });
    // }
}