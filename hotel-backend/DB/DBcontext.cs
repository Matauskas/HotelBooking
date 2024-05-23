using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{


    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<Hotel> Hotels { get; set; }
    public DbSet<Booking> Bookings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {


       
        modelBuilder.Entity<Hotel>().HasData(
            new Hotel { Id = 1, Name = "Hotel Sunshine", Location = "Paris", PictureUrl = "https://cdn-icons-png.flaticon.com/512/753/753910.png" },
            new Hotel { Id = 2, Name = "Hotel MoonShine", Location = "London", PictureUrl = "https://static.vecteezy.com/system/resources/thumbnails/018/245/897/small/hotel-building-tower-with-five-stars-icon-png.png" },
            new Hotel { Id = 3, Name = "Hotel Fridge", Location = "Latvia", PictureUrl = "https://img.pikbest.com/origin/09/28/53/81KpIkbEsT5nV.png!sw800" },
            new Hotel { Id = 4, Name = "Hotel Door", Location = "Lithuania", PictureUrl = "https://static.vecteezy.com/system/resources/thumbnails/011/893/768/small/shop-store-city-atl-png.png" },
            new Hotel { Id = 5, Name = "Hotel Awesome", Location = "Paris", PictureUrl = "https://www.pngall.com/wp-content/uploads/5/Hotel-Building-PNG-Free-Image.png" }
        );

       
        modelBuilder.Entity<Booking>().HasData(new Booking[0]);

    }
}
