using Microsoft.EntityFrameworkCore;
using MyTripAPI.Models;

namespace MyTripAPI.Data
{
    public class LocationDetailsDbContext :DbContext
    {
        public LocationDetailsDbContext(DbContextOptions<LocationDetailsDbContext> options) : base(options)
        {

        }

        public DbSet<LocationDetails> LocationDetails { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LocationDetails>().ToTable("LocationDetails");
        }
    }
}
