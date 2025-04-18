using Microsoft.AspNetCore.Mvc;

namespace Master__p.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
