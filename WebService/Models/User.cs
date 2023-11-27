/***************************************************************
 * Filename: User.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file defines the User class, which represents
 * a user in the transport management system.
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
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nic { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
