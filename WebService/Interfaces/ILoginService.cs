/***************************************************************
 * Filename: ILoginService.cs
 * Author: Anupriya Thennakoon
 * Date: 23/09/2023
 *
 * Description: This file defines the ILoginService interface, which
 * specifies the contract for user login operations in the transport management system.
 *
 ***************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TransportManagmentSystemAPI.Models;

namespace TransportManagmentSystemAPI.Interfaces
{
    public interface ILoginService
    {
        // Method to authenticate a user's login
        User MakeLogin(User user);
    }
}
