/***************************************************************
 * Filename: TicketBookingService.cs
 * Author: Dilanka Weerasekara
 * Date: 30/09/2023
 *
 * Description: This file contains the TicketBookingService class,
 * which is responsible for managing ticket reservations in the
 * transport management system.
 *
 ***************************************************************/

using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.DBconfig;
using TransportManagmentSystemAPI.Interfaces;
using TransportManagmentSystemAPI.Models;

// Core Service -04 - Booking Management
namespace TransportManagmentSystemAPI.Services
{
    public class TicketBookingService : IBookingService
    {
        private readonly IMongoCollection<Booking> _bookingList;
        private readonly IMongoCollection<Train> _trainsList;

        // Constructor that initializes the service with database settings and schema
        public TicketBookingService(IDatabaseSettings _settings, ISchema _schema)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _bookingList = database.GetCollection<Booking>(_schema.ReservationSchema);
            _trainsList = database.GetCollection<Train>(_schema.TrainSchema);
        }

        // Method to create or update ticket bookings
        public Dictionary<int, string> CreateBookings(Booking booking)
        {
            Dictionary<int, string> returnValue = new Dictionary<int, string>();
            var todayDate = DateTime.Now;
            var bookingDate = booking.bookingDate;

            TimeSpan timeDiff = bookingDate - todayDate;

            if (booking.Id != null)
            {
                Booking existingBookings = _bookingList.Find(exres => exres.Id == booking.Id).FirstOrDefault();
                TimeSpan timeDiff = existingBookings.bookingDate - todayDate;

                if (timeDiff.TotalDays < 5)
                {
                    returnValue.Add(100, "Your Booking confirmed and this cannot be updated/Cancelled");
                    return returnValue;
                }
                else if (timeDiff.TotalDays < 0)
                {
                    returnValue.Add(100, "Invalid Booking Date");
                    return returnValue;
                }
                else
                {
                    booking.BookingCreatedDate = todayDate;
                    _bookingList.ReplaceOne(res => res.Id == booking.Id, booking);
                    returnValue.Add(400, "Booking Updated " + booking.Id);
                    return returnValue;
                }
            }
            else
            {
                if (timeDiff.TotalDays >= 30 || timeDiff.TotalDays < 0)
                {
                    returnValue.Add(100, "Booking must be within 30 days from Booking date");
                    return returnValue;
                }
                else
                {
                    var existingBooking = _bookingList.Find(res => res.ReferenceId == booking.ReferenceId && !res.IsCancelled).ToList();
                    var validCount = 0;
                    foreach (Booking ex in existingBooking)
                    {
                        TimeSpan timediffEx = ex.bookingDate - todayDate;
                        if (timediffEx.TotalDays > 0)
                        {
                            validCount++;
                        }
                    }

                    if (validCount > 4)
                    {
                        returnValue.Add(200, "Maximum 4 bookings per reference ID");
                        return returnValue;
                    }
                    else
                    {
                        booking.BookingCreatedDate = todayDate;
                        _bookingList.InsertOne(booking);
                        returnValue.Add(400, "Booking Created " + booking.Id);
                        return returnValue;
                    }
                }
            }
        }

        // Method to display all bookings for a traveler or all bookings
        public List<Booking> DisplayAllBookings(string travelerId)
        {
            var listOfBookings = travelerId != null ? _bookingList.Find(res => res.ReferenceId == travelerId).ToList() : _bookingList.Find(res => true).ToList();
            int index = 0;
            foreach (Booking res in listOfBookings)
            {
                index = index + 1;
                Train gotTrain = _trainsList.Find(tra => tra.Id == res.Train).ToList().FirstOrDefault();
                listOfBookings[index - 1].BookedTrain = gotTrain;
            }
            if (listOfBookings.Count > 0)
            {
                return listOfBookings;
            }
            else
            {
                return null;
            }
        }

        // Method to cancel a booking and check for cancellation restrictions
        public Dictionary<int, string> CancelledBooking(string id, Booking booking)
        {
            Dictionary<int, string> cancel = new Dictionary<int, string>();
            if (booking != null)
            {
                Booking existingBooking = _bookingList.Find(exres => exres.Id == id).FirstOrDefault();
                TimeSpan timeDiff = existingBooking.bookingDate - DateTime.Now;

                if (timeDiff.TotalDays >= 5)
                {
                    var Cancelled = Builders<Booking>.Update
                          .Set(res => res.IsCancelled, booking.IsCancelled);

                    var updatedProfile = _bookingList.UpdateOne(reser => reser.Id == id, Cancelled);
                    cancel.Add(100, "Booking cancelled REF" + existingBooking.ReferenceId);
                    return cancel;
                }
                else
                {
                    cancel.Add(500, "Your Booking is confirmed and this cannot be Cancelled");
                    return cancel;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
