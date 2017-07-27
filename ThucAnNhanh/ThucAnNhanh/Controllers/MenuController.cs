using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class MenuController : Controller
    {
        // GET: Menu
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult MenuList()
        {
            List<Models.MonAn> MenuList = new List<Models.MonAn>();
            Database db = new Database();
            DataTable dt = db.Query("select * from MonAn ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.MonAn Dish = new Models.MonAn();
                Dish.MaMonAn = dt.Rows[i]["MaKhauPhanAn"].ToString();
                Dish.TenMonAn = dt.Rows[i]["TenKhauPhanAn"].ToString();
                Dish.GiaBan = dt.Rows[i]["Gia"].ToString();
                Dish.SoLuong = dt.Rows[i]["SoLuong"].ToString();
                Dish.Hinh = dt.Rows[i]["HinhAnh"].ToString();
                Dish.GhiChu = dt.Rows[i]["GhiChu"].ToString();
                MenuList.Add(Dish);
            }

            return Json(MenuList);
        }
        [HttpPost]
        public JsonResult DishDetailList()
        {
            List<Models.ChiTietMonAn> DishDetailList = new List<Models.ChiTietMonAn>();
            Database db = new Database();
            DataTable dt = db.Query("select STT, TenKhauPhanAn, TenNguyenLieu, ct.SoLuong as SoLuong from ChiTietMonAn as ct, MonAn as ma, NguyenLieu as nl where ct.MaKhauPhanAn = ma.MaKhauPhanAn and ct.MaNguyenLieu = nl.MaNguyenLieu;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.ChiTietMonAn DishDetail = new Models.ChiTietMonAn();
                DishDetail.STT = dt.Rows[i]["STT"].ToString();
                DishDetail.MonAn = dt.Rows[i]["TenKhauPhanAn"].ToString();
                DishDetail.NguyenLieu = dt.Rows[i]["TenNguyenLieu"].ToString();
                DishDetail.SoLuong = dt.Rows[i]["SoLuong"].ToString();
                DishDetailList.Add(DishDetail);
            }

            return Json(DishDetailList);
        }
        [HttpPost]
        public void AddMenu(Models.MonAn a)
        {
            Database db = new Database();
            db.Insert("insert into MonAn values (N'" + a.TenMonAn + "'," + a.GiaBan + ", " + a.SoLuong + ", N'" + a.GhiChu + "', '"+a.Hinh+"');");

        }
        [HttpPost]
        public void UpdateMenu(List<DishMenu> a)
        {

            Database db = new Database();
            foreach (DishMenu item in a)
            {
                if (item.TenMonAn != null)
                    db.Update("update MonAn set TenKhauPhanAn = N'" + item.TenMonAn + "' where MaKhauPhanAn = " + item.recid + "; ");
                if (item.GiaBan != null)
                    db.Update("update MonAn set Gia = " + item.GiaBan + " where MaKhauPhanAn = " + item.recid + "; ");
                if (item.SoLuong != null)
                    db.Update("update MonAn set SoLuong = " + item.SoLuong + " where MaKhauPhanAn = " + item.recid + "; ");
                if (item.Hinh != null)
                    db.Update("update MonAn set HinhAnh = '" + item.Hinh + "' where MaKhauPhanAn = " + item.recid + "; ");
                if (item.GhiChu != null)
                    db.Update("update MonAn set GhiChu = N'" + item.GhiChu + "' where MaKhauPhanAn = " + item.recid + "; ");
                
            }

        }
        [HttpPost]
        public void DeleteMenu(int a)
        {
            Database db = new Database();
            db.Delete("delete MonAn where MaKhauPhanAn = " + a + "");
        }
        [HttpPost]
        public void AddDishDetail(Models.ChiTietMonAn a)
        {
            Database db = new Database();
            DataTable dtma = db.Query("select MaKhauPhanAn from MonAn where TenKhauPhanAn = N'" + a.MonAn + "';");
            DataTable dtnl = db.Query("select MaNguyenLieu from NguyenLieu where TenNguyenLieu = N'" + a.NguyenLieu + "';");
           
            db.Insert("insert into ChiTietMonAn values (" + dtma.Rows[0]["MaKhauPhanAn"].ToString() + "," + dtnl.Rows[0]["MaNguyenLieu"].ToString() + ", " + a.SoLuong + ");");

        }
        [HttpPost]
        public void UpdateDishDetail(List<DishDetailList> a)
        {

            Database db = new Database();
            foreach (DishDetailList item in a)
            {
                if (item.MonAn != null)
                    db.Update("update ChiTietMonAn set MaKhauPhanAn = " + item.MonAn.id + " where STT = " + item.recid + "; ");
                if (item.NguyenLieu != null)
                    db.Update("update ChiTietMonAn set MaNguyenLieu = " + item.NguyenLieu.id + " where STT = " + item.recid + "; ");
                if (item.SoLuong != null)
                    db.Update("update ChiTietMonAn set SoLuong = " + item.SoLuong + " where STT = " + item.recid + "; ");
               
            }

        }
        [HttpPost]
        public void DeleteDishDetail(int a)
        {
            Database db = new Database();
            db.Delete("delete ChiTietMonAn where STT = " + a + "");
        }
        [HttpPost]
        public JsonResult GetListDish()
        {
            List<Models.MonAn> ListDish = new List<Models.MonAn>();
            Database db = new Database();
            DataTable dt = db.Query("select * from MonAn; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.MonAn Dish = new Models.MonAn();
                Dish.MaMonAn = dt.Rows[i]["MaKhauPhanAn"].ToString();
                Dish.TenMonAn = dt.Rows[i]["TenKhauPhanAn"].ToString();
                ListDish.Add(Dish);
            }

            return Json(ListDish);
        }
        [HttpPost]
        public JsonResult GetListMaterial()
        {
            List<Models.NguyenLieu> ListMaterial = new List<Models.NguyenLieu>();
            Database db = new Database();
            DataTable dt = db.Query("select * from NguyenLieu ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NguyenLieu Material = new Models.NguyenLieu();
                Material.MaNguyenLieu = dt.Rows[i]["MaNguyenLieu"].ToString();
                Material.TenNguyenLieu = dt.Rows[i]["TenNguyenLieu"].ToString();
                ListMaterial.Add(Material);
            }
            return Json(ListMaterial);
        }
    }
    public class DishMenu
    {
        public int recid { get; set; }
        public string TenMonAn { get; set; }
        public string GiaBan { get; set; }
        public string SoLuong { get; set; }
        public string Hinh { get; set; }
        public string GhiChu { get; set; }
    }
    public class DishDetailList
    {
        public int recid { get; set; }
        public dish MonAn { get; set; }
        public material NguyenLieu { get; set; }
        public string SoLuong { get; set; }
    }
    public class dish
    {
        public string id { get; set; }
        public string text { get; set; }
    }
    public class material
    {
        public  string id { get; set; }
        public string text { get; set;}
    }
}