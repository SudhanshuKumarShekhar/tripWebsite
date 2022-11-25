using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyTripAPI.Data;
using MyTripAPI.Models;

namespace MyTripAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationDetailsController : ControllerBase
    {
        private readonly LocationDetailsDbContext _context;

        public LocationDetailsController(LocationDetailsDbContext context)
        {
            _context = context;
        }

        // GET: api/LocationDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationDetails>>> GetLocationDetails()
        {
            return await _context.LocationDetails.ToListAsync();
        }

        // GET: api/LocationDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationDetails>> GetLocationDetails(long id)
        {
            var locationDetails = await _context.LocationDetails.FindAsync(id);

            if (locationDetails == null)
            {
                return NotFound();
            }

            return locationDetails;
        }

        // PUT: api/LocationDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocationDetails(long id, LocationDetails locationDetails)
        {
            if (id != locationDetails.Id)
            {
                return BadRequest();
            }

            _context.Entry(locationDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/LocationDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LocationDetails>> PostLocationDetails(LocationDetails locationDetails)
        {
            _context.LocationDetails.Add(locationDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocationDetails", new { id = locationDetails.Id }, locationDetails);
        }

        // DELETE: api/LocationDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocationDetails(long id)
        {
            var locationDetails = await _context.LocationDetails.FindAsync(id);
            if (locationDetails == null)
            {
                return NotFound();
            }

            _context.LocationDetails.Remove(locationDetails);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationDetailsExists(long id)
        {
            return _context.LocationDetails.Any(e => e.Id == id);
        }
    }
}
