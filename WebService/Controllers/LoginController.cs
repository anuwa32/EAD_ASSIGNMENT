/***************************************************************
 * Filename: LoginController.cs
 * Author: Anupriya Thenakoon
 * Date: 23/09/2023
 *
 * Description: This file defines the LoginController, which is
 * responsible for handling user login-related API endpoints in
 * the transport management system.
 *
 ***************************************************************/

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.DBconfig;
using TransportManagmentSystemAPI.Models;
using TransportManagmentSystemAPI.Services;

namespace TransportManagmentSystemAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginservice;

        public LoginController(LoginService loginService)
        {
            _loginservice = loginService;
        }

        // GET: api/<LoginController>
        [HttpGet]
        public Task<User> Get()
        {
            return null;
        }

        // POST api/<LoginController>
        [HttpPost]
        public ActionResult Post(User user)
        {
            if (user.Nic != null && user.Password != null)
            {
                // Validate user login
                var validatedAccount = _loginservice.MakeLogin(user);
                if (validatedAccount != null)
                {
                    return Ok(validatedAccount);
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return BadRequest("Please enter NIC and Password");
            }
        }
    }
}
