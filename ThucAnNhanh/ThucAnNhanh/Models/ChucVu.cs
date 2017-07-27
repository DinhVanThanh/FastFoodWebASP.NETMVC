using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class ChucVu
    {
        [Key]
        public string MaChucVu { get; set; }
        public string TenChucVu { get; set; }
        public string MucLuong { get; set; }
    }
}