using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Booking
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    public int HotelId { get; set; }

    [Required]
    public string RoomType { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Nights must be at least 1")]
    public int Nights { get; set; }

    [Required]
    public bool BreakfastIncluded { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Number of persons must be at least 1")]
    public int NumberOfPersons { get; set; }

    public decimal TotalCost { get; set; }

    public Hotel Hotel { get; set; }
}
