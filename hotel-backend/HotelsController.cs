using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HotelsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetHotels()
    {
        return Ok(await _context.Hotels.ToListAsync());
    }

    [HttpGet("{location}")]
    public async Task<IActionResult> GetHotelsByLocation(string location)
    {
        return Ok(await _context.Hotels.Where(h => h.Location.ToLower().Contains(location.ToLower())).ToListAsync());
    }
}