/***************************************************************
 * Filename: IUserProfileService.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file defines the IUserProfileService interface, which
 * specifies the contract for managing traveler profiles in the transport management system.
 *
 ***************************************************************/

using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.DBconfig;
using TransportManagmentSystemAPI.Models;

namespace TransportManagmentSystemAPI.Interfaces
{
    interface IUserProfileService
    {
        // Method to update a traveler's profile
        UserProfile UpdateUserProfile(UserProfile userProfile);

        // Method to display all active traveler profiles
        List<UserProfile> DisplayAllActiveProfile(bool isActive);

        // Method to delete a traveler's profile
        String DeletedUserProfile(String _Nic);

        // Method to activate a traveler's profile
        UserProfile ActivationUserProfile(string nic, UserProfile userProfile);

        // Method to get a traveler's profile by NIC
        UserProfile GetUserProfileByNic(string _Nic);
    }
}
