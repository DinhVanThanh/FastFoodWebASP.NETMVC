using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class MonAn
    {
        [Key]
        public string MaMonAn { get; set; }
        public string TenMonAn { get; set; }
        public string GiaBan { get; set; }
        public string SoLuong { get; set; }
        public string Hinh { get; set; }
        public string GhiChu { get; set; }
    }
}