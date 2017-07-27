using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThucAnNhanh.Controllers
{
    public class FeedBackController : Controller
    {
        // GET: FeedBack
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult FeedbackList()
        {
            List<Models.PhanHoi> FeedbackList = new List<Models.PhanHoi>();
            Database db = new Database();
            DataTable dt = db.Query("select * from PhanHoi ;");
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Models.PhanHoi Feedback = new Models.PhanHoi();
                Feedback.MaPhanHoi = dt.Rows[i]["MaPhanHoi"].ToString();
                Feedback.NoiDung = dt.Rows[i]["NoiDung"].ToString();
                Feedback.NguoiGui = dt.Rows[i]["NguoiGui"].ToString();
                Feedback.ChiNhanh = dt.Rows[i]["MaChiNhanh"].ToString();
                Feedback.Email = dt.Rows[i]["Email"].ToString();
                FeedbackList.Add(Feedback);
            }

            return Json(FeedbackList);
        }
    }
}