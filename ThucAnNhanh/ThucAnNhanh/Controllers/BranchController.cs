using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class BranchController : Controller
    {
        // GET: Branch
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult BranchList()
        {
            List<Models.ChiNhanh> BranchList = new List<Models.ChiNhanh>();
            Database db = new Database();
            DataTable dt = db.Query("select * from ChiNhanh; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.ChiNhanh Branch = new Models.ChiNhanh();
                Branch.MaChiNhanh = dt.Rows[i]["MaChiNhanh"].ToString();
                Branch.TenChiNhanh = dt.Rows[i]["TenchiNhanh"].ToString();
                Branch.DiaChi = dt.Rows[i]["DiaChi"].ToString();
                Branch.Hotline = dt.Rows[i]["HotLine"].ToString();
                BranchList.Add(Branch);
            }

            return Json(BranchList);
        }
        [HttpPost]
        public void AddBranch(Models.ChiNhanh a)
        {
            Database db = new Database();
            db.Insert("insert into ChiNhanh(TenchiNhanh,  DiaChi,HotLine) values (N'" + a.TenChiNhanh + "',N'" + a.DiaChi + "', '" + a.Hotline + "');");

        }
        [HttpPost]
        public void UpdateBranch(List<ListBranch> a)
        {

            Database db = new Database();
            foreach (ListBranch item in a)
            {
                if (item.TenChiNhanh != null)
                    db.Update("update ChiNhanh set TenchiNhanh = N'" + item.TenChiNhanh + "' where MaChiNhanh = " + item.recid + "; ");
                if (item.DiaChi != null)
                    db.Update("update ChiNhanh set DiaChi = N'" + item.DiaChi + "' where MaChiNhanh = " + item.recid + "; ");
                if (item.Hotline != null)
                    db.Update("update ChiNhanh set HotLine = '" + item.Hotline + "' where MaChiNhanh = " + item.recid + "; ");
                
            }

        }
        [HttpPost]
        public void DeleteBranch(int a)
        {
            Database db = new Database();
            db.Delete("delete ChiNhanh where MaChiNhanh = " + a + "");
        }
    }
    public class ListBranch
    {
        public int recid { get; set; }
        public string TenChiNhanh { get; set; }
        public string DiaChi { get; set; }
        public string Hotline { get; set; }
    }
}