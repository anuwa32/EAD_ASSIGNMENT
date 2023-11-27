/***************************************************************
 * Filename: Schedule.cs
 * Author: Dilanka Weerasekara
 * Date: 30/09/2023
 *
 * Description: This file defines the Schedule class, which represents
 * a schedule in the transport management system.
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
    public class Schedule
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime Starttime { get; set; }
        public string Day { get; set; }
        public string StartStationName { get; set; }
        public string EndStationName { get; set; }
    }
}
