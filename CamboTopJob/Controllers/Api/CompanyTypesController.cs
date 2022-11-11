using AutoMapper;
using CamboTopJob.Dtos;
using CamboTopJob.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace CamboTopJob.Controllers.Api
{
    public class CompanyTypesController : ApiController
    {
        private ApplicationDbContext _context;

        //Open Connection
        public CompanyTypesController()
        {
            _context = new ApplicationDbContext();
        }

        //Clase Connection
        protected override void Dispose(bool disposing)
        {
            _context.Dispose();
        }

        //GET: /api/companyTypes = Show All Data 
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetCompanyTypes()
        {
            var companyTypes = _context.CompanyTypes.ToList().Select(Mapper.Map<CompanyType, CompanyTypeDto>);
            return Ok(companyTypes);

        }


        //GET: /api/companyTypes/{id} = Show Data by id
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetCompanyType(int id)
        {
            //Get all Data in Database
            var companyType = _context.CompanyTypes.SingleOrDefault(c => c.Id == id);

            if (companyType == null)
                return NotFound();

            return Ok(Mapper.Map<CompanyType, CompanyTypeDto>(companyType));
        }

        //POST: /api/companyTypes = Save Data into Database
        [System.Web.Http.HttpPost]
        public IHttpActionResult PostCompanyType(CompanyTypeDto companyTypeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            //Data Exist not insert into Database
            var isExists = _context.CompanyTypes.SingleOrDefault(c => c.Name == companyTypeDto.Name);
            if (isExists != null)
                return BadRequest();

            //Convert from CompanyTypeDto to CompanyType
            var companyType = Mapper.Map<CompanyTypeDto, CompanyType>(companyTypeDto);
            _context.CompanyTypes.Add(companyType);
            _context.SaveChanges();
            companyTypeDto.Id = companyType.Id;

            return Created(new Uri(Request.RequestUri +"/"+ companyTypeDto.Id), companyTypeDto);
        }

        //PUT: /api/companyTypes/{id} = Updata Data by id
        [System.Web.Http.HttpPut]
        public IHttpActionResult PutCompanyType(int id, CompanyTypeDto companyTypeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            //Data Exist not insert into Database
            var isExists = _context.CompanyTypes.SingleOrDefault(c => c.Name == companyTypeDto.Name && c.Id != companyTypeDto.Id);
            if (isExists != null)
                return BadRequest();

            //Update data in Database
            var companyTypeInDb = _context.CompanyTypes.SingleOrDefault(c => c.Id == id);
            Mapper.Map(companyTypeDto, companyTypeInDb);
            _context.SaveChanges();

            return Ok(companyTypeDto);
        }

        //DELETE: /api/companyTypes/{id} = Delete Data by id
        [System.Web.Http.HttpDelete]
        public IHttpActionResult DeleteCompanyType(int id)
        {
            //Check Data in Database
            var companyTypeInDb = _context.CompanyTypes.SingleOrDefault(c => c.Id == id);
            if (companyTypeInDb == null)
                return NotFound();

            _context.CompanyTypes.Remove(companyTypeInDb);
            _context.SaveChanges();
            return Ok(new { });
        }
    }
}
