using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MyTripAPI.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public long Mobile { get; set; }
        public string? Type { get; set; }
        public string? Token { get; set; }
    }
}
