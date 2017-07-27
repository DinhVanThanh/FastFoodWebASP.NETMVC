using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class TaskController : Controller
    {
        // GET: Task
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult TaskList()
        {
            List<Models.CongViec> listTask = new List<Models.CongViec>();
            Database db = new Database();
            DataTable dt = db.Query("select STT, TenNV, TenCV, TenchiNhanh, GhiChu from PhanCongCongViec as pc, NhanVien nv, ChucVu as cv, ChiNhanh as cn where pc.MaChiNhanh = cn.MaChiNhanh and pc.MaCV = cv.MaCV and pc.MaNV = nv.MaNV;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.CongViec Task = new Models.CongViec();
                Task.MaCongViec = dt.Rows[i]["STT"].ToString();
                Task.ChucVu = dt.Rows[i]["TenCV"].ToString();
                Task.ChiNhanh = dt.Rows[i]["TenchiNhanh"].ToString();
                Task.NhanVien = dt.Rows[i]["TenNV"].ToString();
                Task.GhiChu = dt.Rows[i]["GhiChu"].ToString();
                listTask.Add(Task);
            }

            return Json(listTask); ;
        }
        [HttpPost]
        public void AddTask(PhanCongCongViec a)
        {
            Database db = new Database();
            DataTable dtcv = db.Query("select MaCV from ChucVu where TenCV = N'"+a.ChucVu+"';");
            DataTable dtcn = db.Query("select MaChiNhanh from ChiNhanh where TenchiNhanh = N'" + a.ChiNhanh + "';");
            DataTable dtnv = db.Query("select MaNV from NhanVien where TenNV = N'" + a.NhanVien + "';");

            db.Insert("insert into PhanCongCongViec values ('" + dtcn.Rows[0]["MaChiNhanh"].ToString() + "','" + dtnv.Rows[0]["MaNV"].ToString() + "', N'" + dtcv.Rows[0]["MaCV"].ToString() + "', N'"+a.GhiChu+"');");

        }
        [HttpPost]
        public void UpdateTask(List<ListTask> a)
        {

            Database db = new Database();
            foreach (ListTask item in a)
            {
                if (item.ChiNhanh != null)
                    db.Update("update PhanCongCongViec set MaChiNhanh = '" + item.ChiNhanh.id + "' where STT = " + item.recid + "; ");
                if (item.NhanVien != null)
                    db.Update("update PhanCongCongViec set MaNV = '" + item.NhanVien.id + "' where STT = " + item.recid + "; ");
                if (item.ChucVu != null)
                    db.Update("update PhanCongCongViec set MaCV = '" + item.ChucVu.id + "' where STT = " + item.recid + "; ");
                if (item.GhiChu != null)
                    db.Update("update PhanCongCongViec set GhiChu = N'" + item.GhiChu + "' where STT = " + item.recid + "; ");

            }

        }
        [HttpPost]
        public void DeleteTask(int a)
        {
            Database db = new Database();
            db.Delete("delete PhanCongCongViec where STT = " + a + "");
        }
        [HttpPost]
        public JsonResult GetListBranch()
        {
            List<Models.ChiNhanh> BranchList = new List<Models.ChiNhanh>();
            Database db = new Database();
            DataTable dt = db.Query("select * from ChiNhanh; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.ChiNhanh Branch = new Models.ChiNhanh();
                Branch.MaChiNhanh = dt.Rows[i]["MaChiNhanh"].ToString();
                Branch.TenChiNhanh = dt.Rows[i]["TenchiNhanh"].ToString();
                BranchList.Add(Branch);
            }

            return Json(BranchList);
        }
        [HttpPost]
        public JsonResult GetListStaff()
        {
            List<Models.NhanVien> listStaff = new List<Models.NhanVien>();
            Database db = new Database();
            DataTable dt = db.Query("select * from NhanVien ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NhanVien Staff = new Models.NhanVien();
                Staff.MaNhanVien = dt.Rows[i]["MaNV"].ToString();
                Staff.HoTen = dt.Rows[i]["TenNV"].ToString();
                listStaff.Add(Staff);
            }
            return Json(listStaff);
        }
        [HttpPost]
        public JsonResult GetListPosition()
        {
            List< Models.ChucVu > liposition = new List<Models.ChucVu>();
            Database db = new Database();
            DataTable dt = db.Query("select * from ChucVu ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.ChucVu position = new Models.ChucVu();
                position.MaChucVu = dt.Rows[i]["MaCV"].ToString();
                position.TenChucVu = dt.Rows[i]["TenCV"].ToString();
                liposition.Add(position);
            }
            return Json(liposition);
        }
    }
    public class ListTask
    {
        public int recid { get; set; }
        public NhiemVu ChiNhanh { get; set; }
        public NhiemVu NhanVien { get; set; }
        public NhiemVu ChucVu { get; set; }
        public string GhiChu { get; set; }
    }
    public class NhiemVu
    {
        public string id { get; set; }
        public string text { get; set; }
    }
    public class PhanCongCongViec
    {
       public string MaCongViec { get; set; }
        public string ChiNhanh { get; set; }
        public string NhanVien { get; set; }
        public string ChucVu { get; set; }
        public string GhiChu { get; set; }
    }
}