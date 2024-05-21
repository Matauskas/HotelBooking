using Microsoft.EntityFrameworkCore;


public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Hotel> Hotels { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hotel>().HasData(
            new Hotel { Id = 1, Name = "Hotel Sunshine", Location = "Paris", PictureUrl = "url1" },
            new Hotel { Id = 2, Name = "Hotel Rainbow", Location = "London", PictureUrl = "url2" }
        );
    }
}
