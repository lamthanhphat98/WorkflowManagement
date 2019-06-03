﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowManagement.Models;

namespace WorkflowManagement.IRepository
{
    public interface IUserOrganizationRepository
    {
        List<User> getMemberByOrganizationId(int organizatonId);
    }
}
