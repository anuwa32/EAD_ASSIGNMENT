/***************************************************************
 * Filename: DatabaseSettings.cs
 * Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the DatabaseSettings class, which
 * represents the configuration settings for the database connection in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransportManagmentSystemAPI.DBconfig
{
    public class DatabaseSettings : IDatabaseSettings
    {
        // Gets or sets the connection string to the database
        public string ConnectionString { get; set; }

        // Gets or sets the name of the database
        public string DatabaseName { get; set; }
    }
}
