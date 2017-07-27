using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThucAnNhanh.Models
{
    public class PhanHoi
    {
        [Key]
        public string MaPhanHoi { get; set; }
        public string NoiDung { get; set; }
        public string ChiNhanh { get; set; }
        public string NguoiGui { get; set; }
        public string Email { get; set; }
    }
}