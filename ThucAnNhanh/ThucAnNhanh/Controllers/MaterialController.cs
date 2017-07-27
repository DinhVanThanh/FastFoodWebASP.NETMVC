using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class MaterialController : Controller
    {
        // GET: Material
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult ImportMaterialList()
        {
            List<Models.NhapNguyenLieu> ImportMaterialList = new List<Models.NhapNguyenLieu>();
            Database db = new Database();
            DataTable dt = db.Query("select * from NhapNguyenLieu as nnl, NguyenLieu as nl, DonVi as dv, ChiNhanh as cn where nnl.MaChiNhanh = cn.MaChiNhanh and  nnl.MaDV = dv.MaDV and nnl.MaNguyenLieu = nl.MaNguyenLieu;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NhapNguyenLieu ImportMaterial = new Models.NhapNguyenLieu();
                ImportMaterial.MaNhap = dt.Rows[i]["MaNhap"].ToString();
                ImportMaterial.ChiNhanh = dt.Rows[i]["TenchiNhanh"].ToString();
                ImportMaterial.NguyenLieu = dt.Rows[i]["TenNguyenLieu"].ToString();
                ImportMaterial.NgayNhap = dt.Rows[i]["NgayNhap"].ToString();
                ImportMaterial.DonVi = dt.Rows[i]["TenDV"].ToString();
                ImportMaterial.DonGia = dt.Rows[i]["DonGia"].ToString();
                ImportMaterial.SoLuong = dt.Rows[i]["SoLuong"].ToString();
                ImportMaterial.ThanhTien = dt.Rows[i]["ThanhTien"].ToString();
                ImportMaterialList.Add(ImportMaterial);
            }

            return Json(ImportMaterialList);
        }
        [HttpPost]
        public JsonResult MaterialList()
        {
            List<Models.NguyenLieu> MaterialList = new List<Models.NguyenLieu>();
            Database db = new Database();
            DataTable dt = db.Query("select * from NguyenLieu ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NguyenLieu Material = new Models.NguyenLieu();
                Material.MaNguyenLieu = dt.Rows[i]["MaNguyenLieu"].ToString();
                Material.TenNguyenLieu = dt.Rows[i]["TenNguyenLieu"].ToString();
                Material.SoLuong = dt.Rows[i]["SoLuong"].ToString();
                Material.GhiChu = dt.Rows[i]["GhiChu"].ToString();
                MaterialList.Add(Material);
            }

            return Json(MaterialList);
        }
        [HttpPost]
        public JsonResult UnitList()
        {
            List<Models.DonVi> UnitList = new List<Models.DonVi>();
            Database db = new Database();
            DataTable dt = db.Query("select * from DonVi ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.DonVi Unit = new Models.DonVi();
                Unit.MaDonVi = dt.Rows[i]["MaDV"].ToString();
                Unit.TenDonVi = dt.Rows[i]["TenDV"].ToString();
                UnitList.Add(Unit);
            }

            return Json(UnitList);
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
        public JsonResult GetListMaterial()
        {
            List<Models.NguyenLieu> MaterialList = new List<Models.NguyenLieu>();
            Database db = new Database();
            DataTable dt = db.Query("select MaNguyenLieu, TenNguyenLieu from NguyenLieu ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.NguyenLieu Material = new Models.NguyenLieu();
                Material.MaNguyenLieu = dt.Rows[i]["MaNguyenLieu"].ToString();
                Material.TenNguyenLieu = dt.Rows[i]["TenNguyenLieu"].ToString();
                MaterialList.Add(Material);
            }
            return Json(MaterialList);
        }
        [HttpPost]
        public JsonResult GetListUnit()
        {
            List<Models.DonVi> ListUnit = new List<Models.DonVi>();
            Database db = new Database();
            DataTable dt = db.Query("select * from DonVi ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.DonVi Unit = new Models.DonVi();
                Unit.MaDonVi = dt.Rows[i]["MaDV"].ToString();
                Unit.TenDonVi = dt.Rows[i]["TenDV"].ToString();
                ListUnit.Add(Unit);
            }
            return Json(ListUnit);
        }
        [HttpPost]
        public void AddImportMaterial(Models.NhapNguyenLieu a)
        {
            Database db = new Database();
            DataTable dtcn = db.Query("select MaChiNhanh from ChiNhanh where TenchiNhanh = N'" + a.ChiNhanh+"';");
            DataTable dtnl = db.Query("select MaNguyenLieu from NguyenLieu where TenNguyenLieu = N'" + a.NguyenLieu + "';");
            DataTable dtdv = db.Query("select MaDV from DonVi where TenDV = N'" + a.DonVi + "';");

           
            db.Insert("insert into NhapNguyenLieu(MaChiNhanh, MaNguyenLieu, NgayNhap, MaDV, SoLuong, DonGia, ThanhTien) values (" + dtcn.Rows[0]["MaChiNhanh"].ToString() + ","+ dtnl.Rows[0]["MaNguyenLieu"].ToString() + ",'"+a.NgayNhap+"',"+ dtdv.Rows[0]["MaDV"].ToString() + ","+a.SoLuong+","+a.DonGia+", "+a.ThanhTien+" );");

        }
        [HttpPost]
        public void AddMaterial(Models.NguyenLieu a)
        {
            Database db = new Database();

            db.Insert("insert into NguyenLieu values (N'" + a.TenNguyenLieu + "', N'" + a.GhiChu + "'," + a.SoLuong + ");");

        }
        [HttpPost]
        public void AddUnit(Models.DonVi a)
        {
            Database db = new Database();

            db.Insert("insert into DonVi values (N'" + a.TenDonVi + "');");

        }
        [HttpPost]
        public void UpdateImportMaterial(List<ImportMaterialList> a)
        {

            Database db = new Database();
            foreach (ImportMaterialList item in a)
            {
                if (item.ChiNhanh != null)
                    db.Update("update NhapNguyenLieu set MaChiNhanh = " + item.ChiNhanh.MaChiNhanh + " where MaNhap = " + item.recid + "; ");
                if (item.NguyenLieu != null)
                    db.Update("update NhapNguyenLieu set MaNguyenLieu = " + item.NguyenLieu.MaNguyenLieu + " where MaNhap = " + item.recid + "; ");
                if (item.NgayNhap != null)
                    db.Update("update NhapNguyenLieu set NgayNhap = '" + item.NgayNhap + "' where MaNhap = " + item.recid + "; ");
                if (item.DonVi != null)
                    db.Update("update NhapNguyenLieu set MaDV = " + item.DonVi.MaDonVi + " where MaNhap = " + item.recid + "; ");
                if (item.SoLuong != null)
                    db.Update("update NhapNguyenLieu set SoLuong = " + item.SoLuong + " where MaNhap = " + item.recid + "; ");
                if (item.DonGia != null)
                    db.Update("update NhapNguyenLieu set DonGia = " + item.DonGia + " where MaNhap = " + item.recid + "; ");

            }

        }
        [HttpPost]
        public void UpdateMaterial(List<MaterialList> a)
        {

            Database db = new Database();
            foreach (MaterialList item in a)
            {
                if (item.TenNguyenLieu != null)
                    db.Update("update NguyenLieu set TenNguyenLieu = N'" + item.TenNguyenLieu + "' where MaNguyenLieu = " + item.recid + "; ");
                if (item.SoLuong != null)
                    db.Update("update NguyenLieu set SoLuong = " + item.SoLuong + " where MaNguyenLieu = " + item.recid + "; ");
                if (item.GhiChu != null)
                    db.Update("update NguyenLieu set GhiChu = N'" + item.GhiChu + "' where MaNguyenLieu = " + item.recid + "; ");
                
            }

        }
        [HttpPost]
        public void UpdateUnit(List<UnitList> a)
        {

            Database db = new Database();
            foreach (UnitList item in a)
            {
                if (item.TenDonVi != null)
                    db.Update("update DonVi set TenDV = N'" + item.TenDonVi + "' where MaDV = " + item.recid + "; ");
                
            }

        }
        [HttpPost]
        public void DeleteImportMaterial(int a)
        {
            Database db = new Database();
            db.Delete("delete NhapNguyenLieu where MaNhap = " + a + "");
        }
        [HttpPost]
        public void DeleteMaterial(int a)
        {
            Database db = new Database();
            db.Delete("delete NguyenLieu where MaNguyenLieu = " + a + "");
        }
        [HttpPost]
        public void DeleteUnit(int a)
        {
            Database db = new Database();
            db.Delete("delete DonVi where MaDV = " + a + "");
        }
    }
    public class ImportMaterialList
    {
        public int recid { get; set; }
        public Branch ChiNhanh { get; set; }
        public Material NguyenLieu { get; set; }
        public string NgayNhap { get; set; }
        public Unit DonVi { get; set; }
        public string SoLuong { get; set; }
        public string DonGia { get; set; }
        public string ThanhTien { get; set; }
    }
    public class Branch
    {
        public string MaChiNhanh { get; set; }
        public string text { get; set; }
    }
    public class Material
    {
        public string MaNguyenLieu { get; set; }
        public string text { get; set; }
    }
    public class Unit
    {
        public string MaDonVi { get; set; }
        public string text { get; set; }
    }
    public class MaterialList
    {
        public int recid { get; set; }
        public string TenNguyenLieu { get; set; }
        public string SoLuong { get; set; }
        public string GhiChu { get; set; }
    }
    public class UnitList
    {
        public int recid { get; set; }
        public string TenDonVi { get; set; }
    }
}