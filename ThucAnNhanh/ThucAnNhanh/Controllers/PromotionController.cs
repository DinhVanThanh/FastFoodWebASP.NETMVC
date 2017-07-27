using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class PromotionController : Controller
    {
        // GET: Promotion
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult PromotionList()
        {
            List<Models.KhuyenMai> PromotionList = new List<Models.KhuyenMai>();
            Database db = new Database();
            DataTable dt = db.Query("select * from KhuyenMai ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.KhuyenMai Promotion = new Models.KhuyenMai();
                Promotion.MaKhuyenMai = dt.Rows[i]["MaSuKien"].ToString();
                Promotion.TenSuKien = dt.Rows[i]["TenSuKien"].ToString();
                Promotion.NoiDung = dt.Rows[i]["NoiDung"].ToString();
                Promotion.ChietKhau = Double.Parse(dt.Rows[i]["ChietKhau"].ToString());
                Promotion.ThoiGianBD = dt.Rows[i]["ThoiGianBatDau"].ToString();
                Promotion.ThoiGianKT = dt.Rows[i]["ThoiGianKetThuc"].ToString();
                Promotion.Hinh = dt.Rows[i]["HinhAnh"].ToString();
                PromotionList.Add(Promotion);
            }

            return Json(PromotionList);
        }
        [HttpPost]
        public void AddPromotion(Models.KhuyenMai a)
        {
            Database db = new Database();
            db.Insert("insert into KhuyenMai values (N'" + a.TenSuKien + "', " + a.ChietKhau + ", '" + a.ThoiGianBD + "','" + a.ThoiGianKT + "', N'"+a.NoiDung+"', '"+a.Hinh+"');");

        }
        [HttpPost]
        public void UpdatePromotion(List<ListPormotion> a)
        {

            Database db = new Database();
            foreach (ListPormotion item in a)
            {
                if (item.TenSuKien != null)
                    db.Update("update KhuyenMai set TenSuKien = N'" + item.TenSuKien + "' where MaSuKien = " + item.recid + "; ");
                if (item.NoiDung != null)
                    db.Update("update KhuyenMai set NoiDung = N'" + item.NoiDung + "' where MaSuKien = " + item.recid + "; ");
                if (item.ChietKhau != 0.0 )
                    db.Update("update KhuyenMai set ChietKhau = " + item.ChietKhau + " where MaSuKien = " + item.recid + "; ");
                if (item.ThoiGianBD != null)
                    db.Update("update KhuyenMai set ThoiGianBatDau = '" + item.ThoiGianBD + "' where MaSuKien = " + item.recid + "; ");
                if (item.ThoiGianKT != null)
                    db.Update("update KhuyenMai set ThoiGianKetThuc = '" + item.ThoiGianKT + "' where MaSuKien = " + item.recid + "; ");
                if (item.Hinh != null)
                    db.Update("update KhuyenMai set HinhAnh = '" + item.Hinh + "' where MaSuKien = " + item.recid + "; ");

            }

        }
       
        [HttpPost]
        public void DeletePromotion(int a)
        {
            Database db = new Database();
            db.Delete("delete KhuyenMai where MaSuKien = " + a + "");
        }
    }
    public class ListPormotion
    {
        public int recid { get; set; }
        public string TenSuKien { get; set; }
        public string NoiDung { get; set; }
        public double ChietKhau { get; set; }
        public string ThoiGianBD { get; set; }
        public string ThoiGianKT { get; set; }
        public string Hinh { get; set; }
    }
}