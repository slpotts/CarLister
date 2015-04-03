using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using Insight.Database;
using Microsoft.AspNet.Identity.Owin;
using CarLister.Models.Data_Interfaces;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace CarLister.Controllers
{
    [RoutePrefix("api/cars")]
    public class CarsController : ApiController
    {
        private CarsAccess db;
        
        public CarsController()
        {
            db = HttpContext.Current.GetOwinContext().Get<SqlConnection>().As<CarsAccess>();
        }

        [HttpGet, Route("getCars")]
        public async Task<IHttpActionResult> GetCars(int year, string makes = null, string modelName = null, string modelTrim = null)
        {
            var something = await db.GetCars(year, makes, modelName, modelTrim);
            return Ok(something);
        }

        [HttpGet, HttpPost,Route("getYears")]
        public async Task<IHttpActionResult> GetYears()
        {
            return Ok(await db.GetYears());
        }

        [HttpGet, HttpPost, Route("getMakes")]
        public async Task<IHttpActionResult> GetMakes(int year)
        {
            return Ok(await db.GetMakes(year));
        }

        [HttpGet, HttpPost, Route("getModels")]
        public async Task<IHttpActionResult> GetModels(int year, string makes)
        {
            return Ok(await db.GetModels(year, makes));
        }

        [HttpGet, HttpPost, Route("getModels")]
        public async Task<IHttpActionResult> GetTrims(int year, string makes, string modelName)
        {
            return Ok(await db.GetTrims(year, makes, modelName));
        }
    }
}
