/***************************************************************
 * Filename: ScheduleService.cs
 * Author: Dilanka Weerasekara
 * Date: 30/09/2023
 *
 * Description: This file contains the ScheduleService class,
 * which is responsible for managing schedules in the transport
 * management system.
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

// Core Service -03 - Schedule Management Service
namespace TransportManagmentSystemAPI.Services
{
    public class ScheduleService : IScheduleService
    {
        private readonly IMongoCollection<Schedule> _schedulesList;
        private readonly IMongoCollection<Train> _trainsList;

        // Constructor that initializes the service with database settings and schema
        public ScheduleService(IDatabaseSettings _settings, ISchema _schema)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _schedulesList = database.GetCollection<Schedule>(_schema.ScheduleSchema);
            _trainsList = database.GetCollection<Train>(_schema.TrainSchema);
        }

        // Method to add a new schedule for an existing train
        public Schedule AddNewSchedules(string trainId, Schedule schedule)
        {
            throw new NotImplementedException();
        }

        // Method to update a schedule
        public Schedule UpdateSchedule(string id, Schedule schedule)
        {
            throw new NotImplementedException();
        }
    }
}
