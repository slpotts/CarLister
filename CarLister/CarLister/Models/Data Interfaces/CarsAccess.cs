using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Insight.Database;

namespace CarLister.Models.Data_Interfaces
{
    public interface CarsAccess
    {
        Task<List<string>> GetYears();

        Task<List<string>> GetMakes(int year);

        Task<List<string>> GetModels(int year, string make);

        Task<List<string>> GetTrims(int year, string make, string model);

        Task<List<Car>> GetCars(int year, string make, string model, string trim);

        [Sql("Select * from Cars where Id = @Id")]
        Task<Car> GetCar(int id);
    }
}