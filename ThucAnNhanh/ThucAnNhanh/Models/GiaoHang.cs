using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class GiaoHang
    {
        [Key]
        public string MaGiaoHang { get; set; }
        public string MaDonHang { get; set; }
        public string NguoiGiaoHang { get; set; }
        public string ThoiGianGiaoHang { get; set; }
    }
}