﻿/***************************************************************
 * Filename: ISchema.cs
 * Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the ISchema interface, which
 * specifies the contract for schema (collection) names in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransportManagmentSystemAPI.DBconfig
{
    public interface ISchema
    {
        // Gets or sets the schema name for user data
        public string UsersScheama { get; set; }

        // Gets or sets the schema name for traveler data
        public string TravellerScheama { get; set; }

        // Gets or sets the schema name for train data
        public string TrainScheam { get; set; }

        // Gets or sets the schema name for reservation data
        public string ReservationScheam { get; set; }

        // Gets or sets the schema name for schedule data
        public string ScheduleScheam { get; set; }
    }
}
