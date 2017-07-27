using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class NhapNguyenLieu
    {
        [Key]
        public string MaNhap { get; set; }
        public string ChiNhanh { get; set; }
        public string NguyenLieu { get; set; }
        public string NgayNhap { get; set; }
        public string DonVi { get; set; }
        public string SoLuong { get; set; }
        public string DonGia { get; set; }
        public string ThanhTien { get; set; }
 
    }
}