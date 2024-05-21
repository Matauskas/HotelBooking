public class Booking
{
    public int Id { get; set; }
    public int HotelId { get; set; }
    public string RoomType { get; set; }
    public int Nights { get; set; }
    public bool BreakfastIncluded { get; set; }
    public int NumberOfPersons { get; set; }
    public decimal TotalCost { get; set; }
    public Hotel Hotel { get; set; }
}