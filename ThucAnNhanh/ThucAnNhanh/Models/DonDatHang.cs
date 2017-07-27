using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class DonDatHang
    {
        [Key]
        public string MaDonDatHang { get; set; }
        public string ChiNhanh { get; set; }
        public string Khachhang { get; set; }
        public string KhuyenMai { get; set; }
        public string MonAn { get; set; }
        public int SoLuong { get; set; }
        public string TinhTrangDonHang { get; set; }
        public string ThanhTien { get; set; }
    }
}