using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CustomerList()
        {
            List<Models.KhachHang> listCus = new List<Models.KhachHang>();
            Database db = new Database();
            DataTable dt = db.Query("select MaKH, HoTen, SDT, DiaChi, Email, LoaiKH, DiemTichLuy from KhachHang as kh, LoaiKhachHang as lkh where kh.MaLoaiKH = lkh.MaLoaiKH");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.KhachHang cus = new Models.KhachHang();
                cus.MaKhachHang = dt.Rows[i]["MaKH"].ToString();
                cus.HoTenKhachHang = dt.Rows[i]["HoTen"].ToString();
                cus.SDT = dt.Rows[i]["SDT"].ToString();
                cus.DiaChi = dt.Rows[i]["DiaChi"].ToString();
                cus.Email = dt.Rows[i]["Email"].ToString();
                cus.LoaiKH = dt.Rows[i]["LoaiKH"].ToString();
                cus.DiemTichLuy = dt.Rows[i]["DiemTichLuy"].ToString();
                listCus.Add(cus);
            }
            
            return Json(listCus);
        }
        [HttpPost]
        public JsonResult TypeOfCustomerList()
        {
            Database db = new Database();
            List<Models.LoaiKhachHang> listtypeofCus = new List<Models.LoaiKhachHang>();
            DataTable dt = db.Query("select * from LoaiKhachHang");

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.LoaiKhachHang typeofcus = new Models.LoaiKhachHang();
                typeofcus.MaLoaiKH = dt.Rows[i]["MaLoaiKH"].ToString();
                typeofcus.LoaiKH = dt.Rows[i]["LoaiKH"].ToString();
                typeofcus.DiemChuan = dt.Rows[i]["DiemChuan"].ToString();
                listtypeofCus.Add(typeofcus);
            }

            return Json(listtypeofCus);
        }
        [HttpPost]
        public void AddTypeOfCustomerList(Models.LoaiKhachHang a)
        {
            Database db = new Database();
            db.Insert("insert into LoaiKhachHang values (N'"+a.LoaiKH+"',"+a.DiemChuan +")");
        }
        public void UpdateTypeOfCustomerList(List<ListTypeOfCustomer> a)
        {

            Database db = new Database();
            foreach (ListTypeOfCustomer item in a)
            {
                if (item.LoaiKH != null)
                    db.Update("update LoaiKhachHang set LoaiKH = N'" + item.LoaiKH + "' where MaLoaiKH = " + item.recid + "; ");
                if (item.DiemChuan != 0)
                    db.Update("update LoaiKhachHang set DiemChuan = " + item.DiemChuan + " where MaLoaiKH = " + item.recid + "; ");
                
            }

        }
        [HttpPost]
        public void DeleteTypeOfCustomerList(int a)
        {
            Database db = new Database();
            db.Delete("delete LoaiKhachHang where MaLoaiKH = " + a + "");
        }
        [HttpPost]
        public void UpdateCustomer(List<ListCustomer> a)
        {
            
            Database db = new Database();
            foreach (ListCustomer item in a)
            {
                if(item.HoTenKhachHang != null)
                 db.Update("update KhachHang set HoTen = N'"+ item.HoTenKhachHang + "' where MaKH = " + item.recid+"; ");
                if (item.SDT != null)
                    db.Update("update KhachHang set SDT = N'" + item.SDT + "' where MaKH = " + item.recid + "; ");
                if (item.DiaChi != null)
                    db.Update("update KhachHang set DiaChi = N'" + item.DiaChi + "' where MaKH = " + item.recid + "; ");
                if (item.Email != null)
                    db.Update("update KhachHang set Email = N'" + item.Email + "' where MaKH = " + item.recid + "; ");
                if (item.LoaiKH != null)
                    db.Update("update KhachHang set MaLoaiKH = " + item.LoaiKH.MaLoaiKH + " where MaKH = " + item.recid + "; ");
                if (item.DiemTichLuy != -1)
                    db.Update("update KhachHang set DiemTichLuy = " + item.DiemTichLuy + " where MaKH = " + item.recid + "; ");
                
            }
           
        }
        [HttpPost]
        public void AddCustomer(Models.KhachHang a)
        {
            Database db = new Database();
            DataTable dtlkh = db.Query("select MaLoaiKH from LoaiKhachHang where LoaiKH = N'" + a.LoaiKH + "';");

            db.Insert("insert into KhachHang(HoTen,  DiaChi,SDT, Email, MaLoaiKH) values (N'" + a.HoTenKhachHang+ "',N'" + a.DiaChi + "', '" + a.SDT+"','"+a.Email+"', "+ dtlkh.Rows[0]["MaLoaiKH"].ToString() + ");");
            
        }
        [HttpPost]
        public void DeleteCustomer(int a)
        {
            Database db = new Database();
            db.Delete("delete KhachHang where MaKH = "+a+"");
        }
        [HttpPost]
        public JsonResult GetListTypeOfCustomer()
        {
            List<Models.LoaiKhachHang> ListTypeOfCustomer = new List<Models.LoaiKhachHang>();
            Database db = new Database();
            DataTable dt = db.Query("select * from LoaiKhachHang; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.LoaiKhachHang TypeOfCustomer = new Models.LoaiKhachHang();
                TypeOfCustomer.MaLoaiKH = dt.Rows[i]["MaLoaiKH"].ToString();
                TypeOfCustomer.LoaiKH = dt.Rows[i]["LoaiKH"].ToString();
                ListTypeOfCustomer.Add(TypeOfCustomer);
            }

            return Json(ListTypeOfCustomer);
        }
    }
   public class ListCustomer
    {
        public int recid { get; set; }
        public string HoTenKhachHang { get; set; }
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public Models.LoaiKhachHang LoaiKH { get; set; }
        public int DiemTichLuy { get; set; }
    }
    public class ListTypeOfCustomer
    {
        public int recid { get; set; }
        public string LoaiKH { get; set; }
        public int DiemChuan { get; set; }
    }
}