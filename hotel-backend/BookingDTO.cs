using System.ComponentModel.DataAnnotations;

public class BookingRequestDto
{
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
}
