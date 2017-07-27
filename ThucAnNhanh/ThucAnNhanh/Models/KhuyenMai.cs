using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class KhuyenMai
    {
        [Key]
        public string MaKhuyenMai { get; set; }
        public string TenSuKien { get; set; }
        public string NoiDung { get; set; }
        public double ChietKhau { get; set; }
        public string ThoiGianBD { get; set; }
        public string ThoiGianKT { get; set; }
        public string Hinh { get; set; }
    }
}