using Microsoft.EntityFrameworkCore;
using MyTripAPI.Models;

using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace MyTripAPI.Data
{
    public class BookingDetailsDbContext:DbContext
    {
        public BookingDetailsDbContext(DbContextOptions<BookingDetailsDbContext> options) : base(options)
        {

        }

        public DbSet<BookingDetails> BookingDetails { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BookingDetails>().ToTable("BookingDetails");
        }
    }
}
