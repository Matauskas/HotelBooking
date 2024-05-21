using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

public class ApplicationDbContext : DbContext
{
    private readonly ILogger<ApplicationDbContext> _logger;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ILogger<ApplicationDbContext> logger) : base(options) 
    {
        _logger = logger;
    }

    public DbSet<Hotel> Hotels { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _logger.LogInformation("Seeding initial data...");

        modelBuilder.Entity<Hotel>().HasData(
            new Hotel { Id = 1, Name = "Hotel Sunshine", Location = "Paris", PictureUrl = "https://via.placeholder.com/150" },
            new Hotel { Id = 2, Name = "Hotel Rainbow", Location = "London", PictureUrl = "https://via.placeholder.com/150" }
        );

        _logger.LogInformation("Seeding completed.");
    }
}
