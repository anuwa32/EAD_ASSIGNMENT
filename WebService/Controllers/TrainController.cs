/***************************************************************
 * Filename: TrainController.cs
 * Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the TrainController, which is responsible for handling API endpoints related to train management in the transport management system.
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
    public class TrainController : ControllerBase
    {
        private readonly TrainService trainService;

        public TrainController(TrainService _trainService)
        {
            trainService = _trainService;
        }

        // GET: api/<TrainController>
        [HttpGet]
        public ActionResult Get()
        {
            // Retrieve and return a list of all trains
            return Ok(trainService.GetActiveTrainsSchedules());
        }

        // GET api/<TrainController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TrainController>
        [HttpPost]
        public ActionResult Post(Train train)
        {
            // Create a new train schedule and return the result
            var createdTrain = trainService.CreateTrainSchedule(train);
            if (createdTrain != null)
            {
                return Ok(createdTrain);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<TrainController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, Schedule schedule)
        {
            // Add a new schedule to an existing train and return the result
            return Ok(trainService.AddNewSchedules(id, schedule));
        }

        // DELETE api/<TrainController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id, Train train)
        {
            // Cancel a train and return the result
            return Ok(trainService.CancelTrain(id, train));
        }
    }
}
