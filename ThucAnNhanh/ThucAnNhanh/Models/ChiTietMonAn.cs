using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class ChiTietMonAn
    {
        [Key]
        public string STT { get; set; }
        public string MonAn { get; set; }
        public string NguyenLieu { get; set; }
        public string SoLuong { get; set; }
    }
}