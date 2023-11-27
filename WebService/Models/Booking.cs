/***************************************************************
 * Filename: Booking.cs
 * Author: Dilanka Weerasekara
 * Date: 30/09/2023
 *
 * Description: This file defines the Booking class, which represents
 * a booking in the transport management system.
 *
 ***************************************************************/

using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransportManagmentSystemAPI.Models
{
    public class Booking
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ReferenceId { get; set; }
        public string UserName { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string UserProfile { get; set; }
        public string Mobile { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Train { get; set; }
        public int NoOfPassenger { get; set; }
        public string EmailAddress { get; set; }
        public DateTime bookingDate { get; set; }
        public DateTime BookingCreatedDate { get; set; }
        public bool IsCancelled { get; set; }

        [BsonIgnore]
        public Train BookedTrain { get; set; }

        [BsonIgnore]
        public UserProfile BookedUserProfile { get; set; }
    }
}
