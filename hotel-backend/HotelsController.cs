using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<HotelsController> _logger;

    public HotelsController(ApplicationDbContext context, ILogger<HotelsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetHotels()
    {
        try
        {
            var hotels = await _context.Hotels.ToListAsync();
            return Ok(hotels);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching hotels.");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetHotel(int id)
    {
        try
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }
            return Ok(hotel);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching hotel.");
            return StatusCode(500, "Internal server error");
        }
    }
    [HttpGet("search/{location}")]
    public async Task<IActionResult> GetHotelsByLocation(string location)
    {
        try
        {
            var hotels = await _context.Hotels
                .Where(h => h.Location.ToLower().Contains(location.ToLower()))
                .ToListAsync();
            return Ok(hotels);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching hotels by location.");
            return StatusCode(500, "Internal server error");
        }
    }
}
