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
using System.Security.Policy;
using CarLister.Models;
using Bing;

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
        public async Task<IHttpActionResult> GetCars(int year, string make = null, string model = null, string trim = null)
        {
            var something = await db.GetCars(year, make, model, trim);
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
        public async Task<IHttpActionResult> GetModels(int year, string make)
        {
            return Ok(await db.GetModels(year, make));
        }

        [HttpGet, HttpPost, Route("getTrims")]
        public async Task<IHttpActionResult> GetTrims(int year, string make, string model)
        {
            return Ok(await db.GetTrims(year, make, model));
        }

        [HttpGet, HttpPost, Route("getRecalls")]
        public async Task<IHttpActionResult> GetRecalls(int year, string make, string model)
        {
            var url = Request.RequestUri.Scheme + "www.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json";
            string content = "";
            HttpResponseMessage response;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.nhtsa.gov");
                try
                {
                    response = await client.GetAsync("/webapi/api/Recalls/vehicle/modelyear/" + year + "/make/" + make + "/model/" + model + "?format=json");
                    content = await response.Content.ReadAsStringAsync();
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
                return Ok(content);
            }

        }

        [HttpGet, HttpPost, Route("getCar")]
        public async Task<IHttpActionResult> GetCar(int Id)
        {
            var car = new CarViewModel
            {
                Car = await db.GetCar(Id),
                Recalls = "",
                Image = ""
            };

            string content = "";
            HttpResponseMessage response;

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.nhtsa.gov");
                try
                {
                    response = await client.GetAsync("/webapi/api/Recalls/vehicle/modelyear/" + car.Car.year + "/make/" + car.Car.make + "/model/" + car.Car.model + "?format=json");
                    content = await response.Content.ReadAsStringAsync();
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
                
            }

            car.Recalls = content;

            var image = new BingSearchContainer(new Uri("https://api.datamarket.azure.com/Bing/search/"));
            image.Credentials = new NetworkCredential("accountKey", "Qgp7t9KvHR6m/dqMWFH7+J8zxxuoRBq4osTY0OV0kEc");
            var marketData = image.Composite(
                "image",
                car.Car.year + " " + car.Car.make + " " + car.Car.model + " " + car.Car.trim,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
                ).Execute();

            var img = marketData.First().Image.First().MediaUrl;
            car.Image = img;
            return Ok(car);
        }
    }
}
