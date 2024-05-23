using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<BookingsController> _logger;

    public BookingsController(ApplicationDbContext context, ILogger<BookingsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetBookings()
    {
        try
        {
            var bookings = await _context.Bookings.Include(b => b.Hotel).ToListAsync();
            return Ok(bookings);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching bookings.");
            return StatusCode(500, "Internal server error");
        }
    }

  [HttpPost]
public async Task<IActionResult> CreateBooking([FromBody] BookingRequestDto bookingRequest)
{
    try
    {

        var booking = new Booking
        {
            HotelId = bookingRequest.HotelId,
            RoomType = bookingRequest.RoomType,
            Nights = bookingRequest.Nights,
            BreakfastIncluded = bookingRequest.BreakfastIncluded,
            NumberOfPersons = bookingRequest.NumberOfPersons
        };

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
    catch (Exception ex)
    {
        _logger.LogError(ex, "Error creating booking.");
        return StatusCode(500, "Internal server error");
    }
}



}