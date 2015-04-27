using Insight.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarLister.Models
{
    public class Car
    {
        public int Id { get; set; }

        [Column("model_year")]
        public int year { get; set; }

        [Column("make")]
        public string make { get; set; }

        [Column("model_name")]
        public string model { get; set; }

        [Column("model_trim")]
        public string trim { get; set; }

        public string body_style { get; set; }
    }

    public class CarViewModel
    {
        public Car Car { get; set; }
        public string Recalls { get; set; }
        public string Image { get; set; }
    }
}
