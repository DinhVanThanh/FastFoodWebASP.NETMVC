using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class StaffController : Controller
    {
        // GET: Staff
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult StaffList()
        {
            List<Models.NhanVien> listStaff = new List<Models.NhanVien>();
            Database db = new Database();
            DataTable dt = db.Query("select * from NhanVien ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NhanVien Staff = new Models.NhanVien();
                Staff.MaNhanVien = dt.Rows[i]["MaNV"].ToString();
                Staff.HoTen = dt.Rows[i]["TenNV"].ToString();
                Staff.NgaySinh = dt.Rows[i]["NamSinh"].ToString();
                Staff.SDT = dt.Rows[i]["SDT"].ToString();
                Staff.DiaChi = dt.Rows[i]["DiaChi"].ToString();
                Staff.Email = dt.Rows[i]["Email"].ToString();
                Staff.CMND = dt.Rows[i]["CMND"].ToString();
                Staff.GioiTinh = dt.Rows[i]["GioiTinh"].ToString();
                listStaff.Add(Staff);
            }
            return Json(listStaff);
        }
        [HttpPost]
        public void AddStaff(Models.NhanVien a)
        {
            Database db = new Database();
            db.Insert("insert into NhanVien values (N'" + a.HoTen + "','" + a.NgaySinh + "', '" + a.GioiTinh + "','" + a.CMND + "', N'"+a.DiaChi+"', '"+a.SDT+"','"+a.Email+"');");

        }
        [HttpPost]
        public void UpdateStaff(List<ListStaff> a)
        {
            Database db = new Database();
            foreach (ListStaff item in a)
            {
                if (item.HoTen != null)
                    db.Update("update NhanVien set TenNV = N'" + item.HoTen + "' where MaNV = " + item.recid + "; ");
                if (item.SDT != null)
                    db.Update("update NhanVien set SDT = '" + item.SDT + "' where MaNV = " + item.recid + "; ");
                if (item.DiaChi != null)
                    db.Update("update NhanVien set DiaChi = N'" + item.DiaChi + "' where MaNV = " + item.recid + "; ");
                if (item.Email != null)
                    db.Update("update NhanVien set Email = '" + item.Email + "' where MaNV = " + item.recid + "; ");
                if (item.CMND != null)
                    db.Update("update NhanVien set CMND = '" + item.CMND + "' where MaNV = " + item.recid + "; ");
                if (item.GioiTinh != null)
                    db.Update("update NhanVien set GioiTinh = N'" + item.GioiTinh.id + "' where MaNV = " + item.recid + "; ");
                if (item.NgaySinh != null)
                    db.Update("update NhanVien set NamSinh = '" + item.NgaySinh + "' where MaNV = " + item.recid + "; ");

            }
        }
        [HttpPost]
        public void DeleteStaff(int a)
        {
            Database db = new Database();
            db.Delete("delete NhanVien where MaNV = " + a + "");
        }
        [HttpPost]
        public JsonResult PositionList()
        {
            List<Models.ChucVu> liposition = new List<Models.ChucVu>();
            Database db = new Database();
            DataTable dt = db.Query("select * from ChucVu ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.ChucVu position = new Models.ChucVu();
                position.MaChucVu = dt.Rows[i]["MaCV"].ToString();
                position.TenChucVu = dt.Rows[i]["TenCV"].ToString();
                position.MucLuong = dt.Rows[i]["MucLuong"].ToString();
                liposition.Add(position);
            }
            return Json(liposition);
        }
        [HttpPost]
        public void AddPosition(Models.ChucVu a)
        {
            Database db = new Database();
            db.Insert("insert into ChucVu values (N'" + a.TenChucVu + "'," + a.MucLuong + ");");

        }
        [HttpPost]
        public void UpdatePosition(List<ListPosition> a)
        {
            Database db = new Database();
            foreach (ListPosition item in a)
            {
                if (item.TenChucVu != null)
                    db.Update("update ChucVu set TenCV = N'" + item.TenChucVu + "' where MaCV = " + item.recid + "; ");
                if (item.MucLuong != null)
                    db.Update("update ChucVu set MucLuong = " + item.MucLuong + " where MaCV = " + item.recid + "; ");
                
            }
        }
        [HttpPost]
        public void DeletePosition(int a)
        {
            Database db = new Database();
            db.Delete("delete ChucVu where MaCV = " + a + "");
        }
    }

    public class ListStaff
    {
        public int recid { get; set; }
        public string HoTen { get; set; }
        public string NgaySinh { get; set; }
        public Models.ListW2UI GioiTinh { get; set; }
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public string CMND { get; set; }
        public string Email { get; set; }
    }
    public class ListPosition
    {
        public int recid { get; set; }
        public string TenChucVu { get; set; }
        public string MucLuong { get; set; }
    }
}