/***************************************************************
 * Filename: IDatabaseSettings.cs
 * Author: Dilanka Weeraekara
 * Date: 23/09/2023
 *
 * Description: This file defines the IDatabaseSettings interface, which
 * specifies the contract for database configuration settings in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TransportManagmentSystemAPI.DBconfig
{
    public interface IDatabaseSettings
    {
        // Gets or sets the connection string to the database
        string ConnectionString { get; set; }

        // Gets or sets the name of the database
        string DatabaseName { get; set; }
    }
}
