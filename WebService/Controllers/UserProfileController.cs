/***************************************************************
 * Filename: UserProfileController.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file defines the UserProfileController, which is
 * responsible for handling user profile-related API endpoints in
 * the transport management system.
 *
 ***************************************************************/

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.Models;
using TransportManagmentSystemAPI.Services;

namespace TransportManagmentSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserProfileService userProfileService;

        public UserProfileController(UserProfileService _userProfile)
        {
            userProfileService = _userProfile;
        }

        // GET: api/<UserProfileController>
        [HttpGet]
        public ActionResult<UserProfile> Get(bool isActive)
        {
            // Retrieve and return a list of active user profiles
            var activeProfile = userProfileService.DisplayAllActiveProfile(isActive);
            if (activeProfile != null)
            {
                return Ok(activeProfile);
            }
            else
            {
                return NotFound();
            }
        }

        // GET api/<UserProfileController>/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            // Retrieve and return a user profile by NIC
            var profile = userProfileService.GetUserProfileByNic(id);
            if (profile != null)
            {
                return Ok(profile);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<UserProfileController>
        [HttpPost]
        public ActionResult Post(UserProfile _userProfile)
        {
            // Update or create a user profile and return the result
            var createdAccount = userProfileService.UpdateUserProfile(_userProfile);
            if (createdAccount != null)
            {
                return Ok(createdAccount);
            }
            else
            {
                return Conflict();
            }
        }

        // PUT api/<UserProfileController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, UserProfile _userProfile)
        {
            // Activate or update a user profile and return the result
            var updatedAccount = userProfileService.ActivationUserProfile(id, _userProfile);
            if (updatedAccount != null)
            {
                return Ok(updatedAccount);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<UserProfileController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            // Delete a user profile by NIC and return the result
            var deletedNic = userProfileService.DeletedUserProfile(id);
            if (deletedNic != null)
            {
                return Ok("Deleted " + deletedNic);
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
