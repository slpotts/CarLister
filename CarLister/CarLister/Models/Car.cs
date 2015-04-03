using Insight.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CarLister.Models
{
    public class Car
    {
        [Column("model_year")]
        public int year { get; set; }

        [Column("make")]
        public string makes { get; set; }

        [Column("model_name")]
        public string modelName { get; set; }

        [Column("model_trim")]
        public string modelTrim { get; set; }

        public string body_style { get; set; }
    }
}
