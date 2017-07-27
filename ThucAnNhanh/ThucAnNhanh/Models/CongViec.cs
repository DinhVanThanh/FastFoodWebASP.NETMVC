using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class CongViec
    {
        [Key]
        public string MaCongViec { get; set;}
        public string ChiNhanh { get; set; }
        public string NhanVien { get; set; }
        public string ChucVu { get; set; }
        public string GhiChu { get; set; }
    }
}