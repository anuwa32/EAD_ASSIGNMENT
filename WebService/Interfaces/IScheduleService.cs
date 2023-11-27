/***************************************************************
 * Filename: IScheduleService.cs
 * Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the IScheduleService interface, which
 * specifies the contract for managing train schedules in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.Models;

namespace TransportManagmentSystemAPI.Interfaces
{
    public interface IScheduleService
    {
        // Method to add a new schedule to a train
        Schedule AddNewSchedules(string trainId, Schedule schedule);

        // Method to update a train schedule
        Schedule UpdateSchedule(string id, Schedule schedule);
    }
}
