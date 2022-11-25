using System.ComponentModel.DataAnnotations;

namespace MyTripAPI.Models
{
    public class BookingDetails
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Mobile { get; set; }
        public string? Date { get; set; }
        public int Person { get; set; }
        public long LocationId { get; set; }
        public long logginUserId { get; set; }
        public int TotalPrice { get; set; }
    }
}
