using System.ComponentModel.DataAnnotations;

namespace MyTripAPI.Models
{
    public class LocationDetails
    {
        [Key]
        public long Id { get; set; }
        public string? Name { get; set; }
        public int Price { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? About { get; set; }
        public double Rating { get; set; }
        public string? reviews { get; set; }
    }
}
