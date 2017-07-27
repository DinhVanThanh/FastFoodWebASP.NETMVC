using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class OrderController : Controller
    {
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult OrderList()
        {
            List<Models.DonDatHang> OrderList = new List<Models.DonDatHang>();
            Database db = new Database();
            DataTable dt = db.Query("select ThanhTien, MaDonHang, TenchiNhanh, HoTen, TenSuKien, ddh.SoLuong as SoLuong, TinhTrangDonHang, TenKhauPhanAn from DonDatHang  as ddh, MonAn as ma, KhachHang as kh, ChiNhanh as cn, KhuyenMai as km where ddh.MaChiNhanh = cn.MaChiNhanh and ddh.MaKH = kh.MaKH and ddh.MaSuKien = km.MaSuKien and ddh.MaKhauPhanAn = ma.MaKhauPhanAn;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.DonDatHang Order = new Models.DonDatHang();
                Order.MaDonDatHang = dt.Rows[i]["MaDonHang"].ToString();
                Order.ChiNhanh = dt.Rows[i]["TenchiNhanh"].ToString();
                Order.Khachhang = dt.Rows[i]["HoTen"].ToString();
                Order.KhuyenMai = dt.Rows[i]["TenSuKien"].ToString();
                Order.SoLuong = int.Parse(dt.Rows[i]["SoLuong"].ToString());
                Order.TinhTrangDonHang = dt.Rows[i]["TinhTrangDonHang"].ToString();
                Order.MonAn = dt.Rows[i]["TenKhauPhanAn"].ToString();
                Order.ThanhTien = dt.Rows[i]["ThanhTien"].ToString();
                OrderList.Add(Order);
            }
            return Json(OrderList);
        }
        [HttpPost]
        public JsonResult DeliveryList()
        {
            List<Models.GiaoHang> DeliveryList = new List<Models.GiaoHang>();
            Database db = new Database();
            DataTable dt = db.Query("select MAGH, ddh.MaDonHang as MaDonHang, TenNV, ThoiGian from GiaoHang as gh, NhanVien as nv, DonDatHang as ddh where gh.MaDonHang = ddh.MaDonHang and gh.NguoiGiaoHang = nv.MaNV;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.GiaoHang Delivery = new Models.GiaoHang();
                Delivery.MaDonHang = dt.Rows[i]["MaDonHang"].ToString();
                Delivery.NguoiGiaoHang = dt.Rows[i]["TenNV"].ToString();
                Delivery.ThoiGianGiaoHang = dt.Rows[i]["ThoiGian"].ToString();
                Delivery.MaGiaoHang = dt.Rows[i]["MAGH"].ToString();
                DeliveryList.Add(Delivery);
            }
           
            return Json(DeliveryList);
        }
        [HttpPost]
        public void UpdateOrder(List<ListOrder> a)
        {

            Database db = new Database();
            foreach (ListOrder item in a)
            {
                if (item.ChiNhanh != null)
                    db.Update("update DonDatHang set MaChiNhanh = " + item.ChiNhanh.id + " where MaDonHang = " + item.recid + "; ");
                if (item.Khachhang != null)
                    db.Update("update DonDatHang set MaKH = " + item.Khachhang.id + " where MaDonHang = " + item.recid + "; ");
                if (item.KhuyenMai != null)
                    db.Update("update DonDatHang set MaSuKien = " + item.KhuyenMai.id + " where MaDonHang = " + item.recid + "; ");
                if (item.TinhTrangDonHang != null)
                    db.Update("update DonDatHang set TinhTrangDonHang = N'" + item.TinhTrangDonHang + "' where MaDonHang = " + item.recid + "; ");
                if (item.SoLuong != 0)
                    db.Update("update DonDatHang set SoLuong = " + item.SoLuong + " where MaDonHang = " + item.recid + "; ");
                if (item.MonAn != null)
                    db.Update("update DonDatHang set MaKhauPhanAn = " + item.MonAn.id + " where MaDonHang = " + item.recid + "; ");

            }

        }
        [HttpPost]
        public void AddOrder(Models.DonDatHang a)
        {
            Database db = new Database();
            DataTable dtcn = db.Query("select MaChiNhanh from ChiNhanh where TenchiNhanh = N'" + a.ChiNhanh + "';");
            DataTable dtkh = db.Query("select MaKH from KhachHang where HoTen = N'" + a.Khachhang + "';");
            DataTable dtkm = db.Query("select MaSuKien from KhuyenMai where TenSuKien = N'" + a.KhuyenMai + "';");
            DataTable dtma = db.Query("select MaKhauPhanAn from MonAn where TenKhauPhanAn = N'" + a.MonAn + "';");

            db.Insert("insert into DonDatHang values (" + dtcn.Rows[0]["MaChiNhanh"].ToString() + "," + dtkh.Rows[0]["MaKH"].ToString() + ", " + dtkm.Rows[0]["MaSuKien"].ToString() + "," + a.SoLuong + ", N'"+a.TinhTrangDonHang+"' , " + dtma.Rows[0]["MaKhauPhanAn"].ToString() + " ,  "+a.ThanhTien+" );");

        }
        [HttpPost]
        public void DeleteOrder(int a)
        {
            Database db = new Database();
            db.Delete("delete DonDatHang where MaDonHang = " + a + "");
        }
        [HttpPost]
        public void UpdateDelivery(List<ListDelivery> a)
        {

            Database db = new Database();
            foreach (ListDelivery item in a)
            {
                if (item.MaDonHang != null)
                    db.Update("update GiaoHang set MaDonHang = " + item.MaDonHang.id + " where MAGH = " + item.recid + "; ");
                if (item.NguoiGiaoHang != null)
                    db.Update("update GiaoHang set NguoiGiaoHang = " + item.NguoiGiaoHang.id + " where MAGH = " + item.recid + "; ");
                if (item.ThoiGianGiaoHang != null)
                    db.Update("update GiaoHang set ThoiGian = '" + item.ThoiGianGiaoHang + "' where MAGH = " + item.recid + "; ");
                
            }

        }
        [HttpPost]
        public void AddDelivery(Models.GiaoHang a)
        {
            Database db = new Database();
            DataTable dtnv = db.Query("select MaNV from NhanVien where TenNV = N'" + a.NguoiGiaoHang + "';");
            

            db.Insert("insert into GiaoHang values (" + a.MaDonHang  + "," + dtnv.Rows[0]["MaNV"].ToString() + ", '" + a.ThoiGianGiaoHang + "');");

        }
        [HttpPost]
        public void DeleteDelivery(int a)
        {
            Database db = new Database();
            db.Delete("delete GiaoHang where MAGH = " + a + "");
        }
        [HttpPost]
        public JsonResult GetListBranch()
        {
            List<Models.ChiNhanh> BranchList = new List<Models.ChiNhanh>();
            Database db = new Database();
            DataTable dt = db.Query("select MaChiNhanh, TenchiNhanh from ChiNhanh; ");
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
        public JsonResult GetListCustomer()
        {
            List<Models.KhachHang> CustomerList = new List<Models.KhachHang>();
            Database db = new Database();
            DataTable dt = db.Query("select MaKH, HoTen from KhachHang; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.KhachHang Customer = new Models.KhachHang();
                Customer.MaKhachHang = dt.Rows[i]["MaKH"].ToString();
                Customer.HoTenKhachHang = dt.Rows[i]["HoTen"].ToString();
                CustomerList.Add(Customer);
            }

            return Json(CustomerList);
        }
        [HttpPost]
        public JsonResult GetListPromotion()
        {
            List<Models.KhuyenMai> PromotionList = new List<Models.KhuyenMai>();
            Database db = new Database();
            DataTable dt = db.Query("select MaSuKien, TenSuKien  from KhuyenMai; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.KhuyenMai Promotion = new Models.KhuyenMai();
                Promotion.MaKhuyenMai = dt.Rows[i]["MaSuKien"].ToString();
                Promotion.TenSuKien = dt.Rows[i]["TenSuKien"].ToString();
                PromotionList.Add(Promotion);
            }

            return Json(PromotionList);
        }
        [HttpPost]
        public string GetPromotionInterest(string TenSuKien)
        {
            Database db = new Database();
            DataTable dt = db.Query("select ChietKhau from KhuyenMai where TenSuKien = N'" + TenSuKien + "'; ");
            return dt.Rows[0]["ChietKhau"].ToString();
        }
        [HttpPost]
        public JsonResult GetListDish()
        {
            List<Models.MonAn> DishList = new List<Models.MonAn>();
            Database db = new Database();
            DataTable dt = db.Query("select MaKhauPhanAn, TenKhauPhanAn, Gia from MonAn; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.MonAn Dish = new Models.MonAn();
                Dish.MaMonAn = dt.Rows[i]["MaKhauPhanAn"].ToString();
                Dish.TenMonAn = dt.Rows[i]["TenKhauPhanAn"].ToString();
                Dish.GiaBan = dt.Rows[i]["Gia"].ToString(); 
                DishList.Add(Dish);
            }

            return Json(DishList);
        }
        [HttpPost]
        public string GetDishPrice(string MonAn)
        {
            
            Database db = new Database();
            DataTable dt = db.Query("select Gia from MonAn where TenKhauPhanAn = N'" + MonAn+"'; ");
            return dt.Rows[0]["Gia"].ToString();
            
        }
        [HttpPost]
        public JsonResult GetListOrder()
        {
            List<Models.DonDatHang> ListOrder = new List<Models.DonDatHang>();
            Database db = new Database();
            DataTable dt = db.Query("select MaDonHang from DonDatHang; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.DonDatHang Order = new Models.DonDatHang();
                Order.MaDonDatHang = dt.Rows[i]["MaDonHang"].ToString();
                ListOrder.Add(Order);
            }

            return Json(ListOrder);
        }
        [HttpPost]
        public JsonResult GetListDeliverer()
        {
            List<Models.NhanVien> DelivererList = new List<Models.NhanVien>();
            Database db = new Database();
            DataTable dt = db.Query("select MaNV, TenNV from NhanVien; ");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NhanVien Deliverer = new Models.NhanVien();
                Deliverer.MaNhanVien = dt.Rows[i]["MaNV"].ToString();
                Deliverer.HoTen = dt.Rows[i]["TenNV"].ToString();
                DelivererList.Add(Deliverer);
            }

            return Json(DelivererList);
        }
    }
   
    public class ListOrder
    {
        public int recid { get; set; }
        public Models.ListW2UI ChiNhanh { get; set; }
        public Models.ListW2UI Khachhang { get; set; }
        public Models.ListW2UI KhuyenMai { get; set; }
        public Models.ListW2UI MonAn { get; set; }
        public int SoLuong { get; set; }
        public string TinhTrangDonHang { get; set; }
    }
    
    
    public class ListDelivery
    {
        public int recid { get; set; }
        public Models.ListW2UI MaDonHang { get; set; }
        public Models.ListW2UI NguoiGiaoHang { get; set; }
        public string ThoiGianGiaoHang { get; set; }
    }
}