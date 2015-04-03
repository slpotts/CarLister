using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;

namespace CarLister.Models.Data_Interfaces
{
    public interface CarsAccess
    {
        Task<List<string>> GetYears();

        Task<List<string>> GetMakes(int year);

        Task<List<string>> GetModels(int year, string makes);

        Task<List<string>> GetTrims(int year, string makes, string modelName);

        Task<List<Car>> GetCars(int year, string makes, string modelName, string modelTrim);
    }
}