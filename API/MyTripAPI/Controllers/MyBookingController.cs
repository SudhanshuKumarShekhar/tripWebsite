using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyTripAPI.Data;
using MyTripAPI.Models;
using System.Collections.Generic;

namespace MyTripAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyBookingController : ControllerBase
    {
        private readonly MyBookingDbContext _context;
        public MyBookingController(MyBookingDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyBooking>>> GetAllBookingDetails()
        {
            //b.id, t.Name, t.Address, b.Name,b.Mobile,b.Date,b.Person,b.TotalPrice
            try
            {
                var result = (from t in _context.LocationDetails
                              join b in _context.BookingDetails on t.Id equals b.LocationId
                              select new MyBooking
                              {
                                  Id = b.Id,
                                  Location = t.Name,
                                  Address = t.Address,
                                  Name = b.Name,
                                  Mobile = b.Mobile,
                                  Date = b.Date,
                                  Person = b.Person,
                                  TotalPrice = b.TotalPrice

                              }).ToListAsync();
                return await result;
            }
            catch (Exception ex)
            {
                return new List<MyBooking>();
            }

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MyBooking>>> GetAllBookingDetails(int id)
        {
            // b.id, t.Name, t.Address, b.Name,b.Mobile,b.Date,b.Person,b.TotalPrice from dbo.BookingDetails b
            // join dbo.TripDetails t  on t.id = b.LocationId where b.logginUserId = " + id
            try
            {
                var result = (from t in _context.LocationDetails
                              join b in _context.BookingDetails on t.Id equals b.LocationId where b.logginUserId == id
                              select new MyBooking
                              {
                                  Id = b.Id,
                                  Location = t.Name,
                                  Address = t.Address,
                                  Name = b.Name,
                                  Mobile = b.Mobile,
                                  Date = b.Date,
                                  Person = b.Person,
                                  TotalPrice = b.TotalPrice

                              }).ToListAsync();
                return await result;
            }
            catch (Exception ex)
            {
                return new List<MyBooking>();
            }
        }
    }
}
