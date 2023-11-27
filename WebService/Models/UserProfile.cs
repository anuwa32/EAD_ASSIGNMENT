/***************************************************************
 * Filename: UserProfile.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file defines the UserProfile class, which represents
 * a user profile in the transport management system.
 *
 ***************************************************************/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransportManagmentSystemAPI.Models
{
    public class UserProfile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nic { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public bool AccStatus { get; set; }
        public DateTime CreatedDate { get; set; }

        [BsonIgnore]
        public User UserInfo { get; set; }
    }
}
