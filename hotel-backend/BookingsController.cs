using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BookingsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetBookings()
    {
        return Ok(await _context.Bookings.Include(b => b.Hotel).ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] Booking booking)
    {
        decimal roomRate = booking.RoomType switch
        {
            "Standard" => 100,
            "Deluxe" => 150,
            "Suite" => 200,
            _ => 0
        };

        decimal breakfastCost = booking.BreakfastIncluded ? 15 * booking.NumberOfPersons * booking.Nights : 0;
        decimal cleaningFee = 20;

        booking.TotalCost = (roomRate * booking.Nights) + breakfastCost + cleaningFee;

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();
        return Ok(booking);
    }
}
