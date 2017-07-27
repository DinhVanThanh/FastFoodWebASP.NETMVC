using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class LoaiKhachHang
    {
        [Key]
        public string MaLoaiKH { get; set; }
        public string LoaiKH { get; set; }
        public string DiemChuan { get; set; }
    }
}