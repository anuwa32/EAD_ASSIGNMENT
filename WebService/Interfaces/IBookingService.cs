/***************************************************************
 * Filename: IBookingService.cs
* Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the IBookingService interface, which
 * specifies the contract for booking management in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.Models;

namespace TransportManagmentSystemAPI.Interfaces
{
    public interface IBookingService
    {
        // Method to create bookings and return a status message
        Dictionary<int, string> CreateBookings(Booking booking);

        // Method to display all bookings for a traveler
        List<Booking> DisplayAllBookings(string travallerId);

        // Method to cancel a booking and return a status message
        Dictionary<int, string> CancelledBooking(string id, Booking booking);
    }
}
