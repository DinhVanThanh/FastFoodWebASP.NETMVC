using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class NguyenLieu
    {
        [Key]
        public string MaNguyenLieu { get; set; }
        public string TenNguyenLieu { get; set; }
        public string SoLuong { get; set; }
        public string GhiChu { get; set; }

    }
}