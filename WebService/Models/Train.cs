/***************************************************************
 * Filename: Train.cs
 * Author: Dilanka Weerasekara
 * Date: 30/09/2023
 *
 * Description: This file defines the Train class, which represents
 * a train in the transport management system.
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
    public class Train
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string TrainId { get; set; }
        public string TrainName { get; set; }

        public int ComponentCount { get; set; }
        public bool IsCancelled { get; set; }
        public bool IsActive { get; set; }
        public List<Schedule> ScheduleList { get; set; }
    }
}
