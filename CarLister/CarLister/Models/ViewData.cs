using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CarLister.Models
{
    public class ViewData
    {
        int carYear { get; set; }
        string carMake { get; set; }
        string carModel { get; set; }
        string carTrim { get; set; }
        string carBodyStyle { get; set; }

        public ViewData(int y, string m, string mo, string t, string b)
        {
            carYear = y;
            carMake = m;
            carModel = mo;
            carTrim = t;
            carBodyStyle = b;

        }
    }
}