using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            Database db = new Database();
            DataTable dt =  db.Query("select * from UserLogin");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (username == dt.Rows[i]["Username"].ToString() && password == dt.Rows[i]["Password"].ToString())
                {
                    
                    DataTable dtnv = db.Query("select TenNV from NhanVien where MaNV = "+ dt.Rows[i]["MaNV"].ToString() + "");
                    ViewBag.LoginName = dtnv.Rows[i]["TenNV"].ToString();
                    return View("Admin");
                }
            }
            
            return View("Index");
        }
    }
}