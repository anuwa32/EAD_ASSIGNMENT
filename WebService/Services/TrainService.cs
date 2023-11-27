/***************************************************************
 * Filename: TrainService.cs
 * Author: Dilanka Weerasekara
 * Date: 30/09/2023
 *
 * Description: This file contains the TrainService class,
 * which is responsible for managing train schedules in the
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

// Core Service -02 - Train Service management
namespace TransportManagmentSystemAPI.Services
{
    public class TrainService : ITrainService
    {
        private readonly IMongoCollection<Train> _trainsList;
        private readonly IMongoCollection<Schedule> _schedulesList;
        private readonly IMongoCollection<Booking> _bookingList;

        // Constructor that initializes the service with database settings and schema
        public TrainService(IDatabaseSettings _settings, ISchema _schema)
        {
            var client = new MongoClient(_settings.ConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);
            _trainsList = database.GetCollection<Train>(_schema.TrainSchema);
            _schedulesList = database.GetCollection<Schedule>(_schema.ScheduleSchema);
            _bookingList = database.GetCollection<Booking>(_schema.ReservationSchema);
        }

        // Method to create or update a train with schedules
        public Train CreateTrainSchedule(Train train)
        {
            var schedules = train.ScheduleList;

            if (train.Id == null)
            {
                if (schedules != null && schedules.Count > 0)
                {
                    foreach (Schedule schedule in schedules)
                    {
                        _schedulesList.InsertOne(schedule);
                    }
                }
                _trainsList.InsertOne(train);
                return train;
            }
            else
            {
                if (schedules != null && schedules.Count > 0)
                {
                    foreach (Schedule schedule in schedules)
                    {
                        _schedulesList.ReplaceOne(sch => sch.Id == schedule.Id, schedule);
                    }
                }
                if (train.IsCancelled)
                {
                    var bookingCount = _bookingList.Find(res => res.Id == train.Id).ToList().Count;
                    if (bookingCount > 0)
                    {
                        return null;
                    }
                }
                _trainsList.ReplaceOne(tra => tra.Id == train.Id, train);
                return train;
            }
        }

        // Method to get all active trains with schedules
        public List<Train> GetActiveTrainsSchedules()
        {
            return _trainsList.Find(train => train.IsActive).ToList();
        }

        // Method to cancel a train and check for existing reservations
        public string CancelTrain(string id, Train train)
        {
            var bookingCount = _bookingList.Find(res => res.Train == id).ToList().Count;

            if (bookingCount > 0)
            {
                return "Already Reserved train";
            }
            else
            {
                train.IsCancelled = true;
                _trainsList.ReplaceOne(tra => tra.Id == train.Id, train);
                return "Train Cancelled";
            }
        }

        // Method to add a new schedule for an existing train
        public Train AddNewSchedules(string trainId, Schedule schedule)
        {
            var selectedTrain = _trainsList.Find(tra => tra.Id == trainId).ToList().FirstOrDefault();

            if (selectedTrain != null)
            {
                var existingList = selectedTrain.ScheduleList;
                _schedulesList.InsertOne(schedule);
                existingList.Add(schedule);
                _trainsList.ReplaceOne(tra => tra.Id == trainId, selectedTrain);

                return selectedTrain;
            }
            else
            {
                return null;
            }
        }
    }
}
