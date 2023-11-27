/***************************************************************
 * Filename: ITrainService.cs
 * Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the ITrainService interface, which
 * specifies the contract for managing train-related operations in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.Models;

namespace TransportManagmentSystemAPI.Interfaces
{
    public interface ITrainService
    {
        // Method to create a new train schedule
        Train CreateTrainSchedule(Train train);

        // Method to get all active trains with schedules
        List<Train> GetActiveTrainsSchedules();

        // Method to cancel a train
        string CancelTrain(string id, Train train);

        // Method to add a new schedule to an existing train
        Train AddNewSchedules(string trainId, Schedule schedule);
    }
}
