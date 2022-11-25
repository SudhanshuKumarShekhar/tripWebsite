namespace MyTripAPI.Models
{
    public class MyBooking
    {
        public long Id { get; set; }
        public string? Location { get; set; }
        public string? Address { get; set; }
        public string? Name { get; set; }
        public string? Mobile { get; set; }
        public string? Date { get; set; }
        public int Person { get; set; }
        public int TotalPrice { get; set; }
    }
}
