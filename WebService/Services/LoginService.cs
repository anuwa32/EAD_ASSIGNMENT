/***************************************************************
 * Filename: LoginService.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file contains the LoginService class,
 * which is responsible for handling user login in the
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

// Core Service -04 - Login Controller and Service
namespace TransportManagmentSystemAPI.Services
{
    public class LoginService : ILoginService
    {
        private readonly IMongoCollection<User> _userList;
        private readonly IMongoCollection<UserProfile> _userProfileList;

        // Constructor that initializes the service with database settings and schema
        public LoginService(IDatabaseSettings _settings, ISchema _schema)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _userProfileList = database.GetCollection<UserProfile>(_schema.TravellerSchema);
            _userList = database.GetCollection<User>(_schema.UsersSchema);
        }

        // Method to validate and perform user login
        public User MakeLogin(User user)
        {
            if (user.Nic != null && user.Password != null)
            {
                var profile = _userProfileList.Find(pro => pro.Nic == user.Nic && pro.AccStatus).FirstOrDefault();
                if (profile != null)
                {
                    var validUser = _userList.Find(us => us.Nic == user.Nic && us.Password == user.Password).FirstOrDefault();
                    return validUser != null ? validUser : null;
                }
                else
                {
                    return null;
                }
            }
            else
            {
                throw new NullReferenceException("Please enter Nic and password");
            }
        }
    }
}
