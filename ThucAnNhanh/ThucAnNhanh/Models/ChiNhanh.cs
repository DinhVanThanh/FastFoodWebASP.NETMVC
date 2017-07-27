using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class ChiNhanh
    {
        [Key]
        public string MaChiNhanh { get; set; }
        public string TenChiNhanh { get; set; }
        public string DiaChi { get; set; }
        public string Hotline { get; set; }
    }
}