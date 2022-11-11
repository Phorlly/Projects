using AutoMapper;
using CamboTopJob.Dtos;
using CamboTopJob.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CamboTopJob.App_Start
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            //Domain to DTO
            Mapper.CreateMap<CompanyType, CompanyTypeDto>();

            //DTO to Domain
            Mapper.CreateMap<CompanyTypeDto, CompanyType>().ForMember(c => c.Id, opt => opt.Ignore());

        }
    }
}