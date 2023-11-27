/***************************************************************
 * Filename: BookingController.cs
 * Author: Dilanka Weerasekara
 * Date: 23/09/2023
 *
 * Description: This file defines the BookingController, which is
 * responsible for handling booking-related API endpoints in
 * the transport management system.
 *
 ***************************************************************/

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.Models;
using TransportManagmentSystemAPI.Services;

namespace TransportManagmentSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly TicketBookingService _bookingService;

        public BookingController(TicketBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        // GET: api/<BookingController>
        [HttpGet]
        public ActionResult Get()
        {
            // Retrieve a list of bookings
            List<Booking> bookingList =  _bookingService.DisplayAllBookings(null);
            if (bookingList != null)
            {
                return Ok(bookingList);
            }
            else 
            {
               return  NotFound();
            }
        }

        // GET api/<BookingController>/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            // Retrieve bookings for a specific traveler
            List<Booking> bookingList = _bookingService.DisplayAllBookings(id);
            if (bookingList != null)
            {
                return Ok(bookingList);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<BookingController>
        [HttpPost]
        public ActionResult Post(Booking booking)
        {
            // Create a new booking
            var bookingResult = _bookingService.CreateBookings(booking);
            if (bookingResult.ContainsKey(100))
            {
                return BadRequest(bookingResult[100]);
            }
            else if (bookingResult.ContainsKey(200))
            {
                return BadRequest(bookingResult[200]);
            }
            else if (bookingResult.ContainsKey(400))
            {
                return Ok(bookingResult[400]);
            }
            else 
            {
                return BadRequest();
            }
        }

        // PUT api/<BookingController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, Booking booking)
        {
            // Cancel a booking
            var bookingResult = _bookingService.CancelledBooking(id, booking);
            if (bookingResult.ContainsKey(100))
            {
                return Ok(bookingResult[100]);
            }
            else 
            {
                return BadRequest(bookingResult[500]);
            }
        }
    }
}
