using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class KhachHang
    {
        [Key]
        public string MaKhachHang { get; set; }
        public string HoTenKhachHang { get; set; }
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string LoaiKH { get; set; }
        public string DiemTichLuy { get; set; }
    }
}