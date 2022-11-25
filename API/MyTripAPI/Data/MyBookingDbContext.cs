using Microsoft.EntityFrameworkCore;
using MyTripAPI.Models;

namespace MyTripAPI.Data
{
    public class MyBookingDbContext:DbContext
    {
        public MyBookingDbContext(DbContextOptions<MyBookingDbContext> options) : base(options)
        {

        }

        public DbSet<BookingDetails> BookingDetails { get; set; }
        public DbSet<LocationDetails> LocationDetails { get; set; }

    }
}
