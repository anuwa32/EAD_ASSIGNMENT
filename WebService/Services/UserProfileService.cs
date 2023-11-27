/***************************************************************
 * Filename: UserProfileService.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file contains the UserProfileService class,
 * which is responsible for managing traveler profiles in the
 * transport management system.
 *
 ***************************************************************/

using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.DBconfig;
using TransportManagmentSystemAPI.Models;

// Core Service -01 - traveler profile management
namespace TransportManagmentSystemAPI.Services
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IMongoCollection<UserProfile> _userProfileList;
        private readonly IMongoCollection<User> _userList;
        private readonly IMongoDatabase _database;

        // Constructor that initializes the service with database settings and schema
        public UserProfileService(IDatabaseSettings _settings, ISchema _schema)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _userProfileList = database.GetCollection<UserProfile>(_schema.TravelerSchema);
            _userList = database.GetCollection<User>(_schema.UsersSchema);
        }

        // Method to create or update a traveler profile
        public UserProfile CreateUpdateTravelerProfile(UserProfile travelerProfile)
        {
            try
            {
                // Update process
                if (travelerProfile.Id != null)
                {
                    // Profile update
                    var update = Builders<UserProfile>.Update
                        .Set(upf => upf.FirstName, travelerProfile.FirstName)
                        .Set(upf => upf.LastName, travelerProfile.LastName)
                        .Set(upf => upf.Mobile, travelerProfile.Mobile);

                    var updatedProfile = _userProfileList.UpdateOne(trav => trav.Id == travelerProfile.Id, update);

                    if (travelerProfile?.UserInfo != null && travelerProfile.UserInfo.Password != null)
                    {
                        var updatePassword = Builders<User>.Update
                            .Set(upf => upf.Password, travelerProfile.UserInfo.Password);
                        var passwordReset = _userList.UpdateOne(up => up.Nic == travelerProfile.Nic, updatePassword);
                    }
                    return travelerProfile;
                }
                else
                {
                    // Creating process
                    var uniqueCounts = _userProfileList.Find(trv => trv.Nic == travelerProfile.Nic).ToList().Count;
                    if (uniqueCounts == 0)
                    {
                        travelerProfile.CreatedDate = DateTime.Now;
                        travelerProfile.UserInfo.Nic = travelerProfile.Nic;
                        _userList.InsertOne(travelerProfile.UserInfo);
                        _userProfileList.InsertOne(travelerProfile);
                        return travelerProfile;
                    }
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception("Something went wrong ERRLOGGED! " + e.ToString());
            }
        }

        // Method to delete a traveler profile by NIC (National Identification Card)
        public string DeleteTravelerProfile(string _Nic)
        {
            try
            {
                _userProfileList.DeleteOne(trv => trv.Nic == _Nic);
                return _Nic;
            }
            catch (Exception e)
            {
                throw new Exception("Something went wrong ERRLOGGED! " + e.ToString());
            }
        }

        // Method to display all active traveler profiles
        public List<UserProfile> DisplayAllActiveProfiles(bool isActive)
        {
            try
            {
                var profileList = _userProfileList.Find(trav => trav.AccStatus == isActive).ToList();

                List<UserProfile> secureProfileList = profileList.Select(item =>
                {
                    item.UserInfo = null;
                    return item;
                }).ToList();

                return secureProfileList.Count > 0 ? secureProfileList : null;
            }
            catch (Exception e)
            {
                throw new Exception("Something went wrong ERRLOGGED! " + e.ToString());
            }
        }

        // Method to manage the activation status of a traveler profile
        public UserProfile ManageActivationTravelerProfile(string nic, UserProfile travelerProfile)
        {
            try
            {
                if (nic != null)
                {
                    var updatedStatus = Builders<UserProfile>.Update
                        .Set(upf => upf.AccStatus, travelerProfile.AccStatus);
                    _userProfileList.UpdateOne(trav => trav.Nic == nic, updatedStatus);
                    return travelerProfile;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                throw new Exception("Something went wrong ERRLOGGED! " + e.ToString());
            }
        }

        // Method to get a traveler profile by NIC
        public UserProfile GetTravelerProfileByNic(string _Nic)
        {
            var profile = _userProfileList.Find(pro => pro.Nic == _Nic).ToList().FirstOrDefault();
            if (profile != null)
            {
                return profile;
            }
            else
            {
                return null;
            }
        }
    }
}
