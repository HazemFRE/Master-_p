using System.Diagnostics;
using Master__p.Models;
using Microsoft.AspNetCore.Mvc;

namespace Master__p.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly MyDbContext _context; // أضف DbContext

        public HomeController(ILogger<HomeController> logger, MyDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            var products = _context.Products.ToList(); // جيب كل المنتجات
            return View(products); // رجّعهم للـ View
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult AboutUs()
        {
            return View();
        }

        [HttpGet]
        public IActionResult ContactUs()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ContactUs(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Contacts.Add(contact);
                await _context.SaveChangesAsync();
                ViewBag.Success = "تم إرسال الرسالة بنجاح!";
                return View(); // أو RedirectToAction("Index");
            }
            return View(contact);
        }
        [HttpGet]
        [HttpGet]
        public IActionResult AgriculturalConsulting()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AgriculturalConsulting(Contact contact)
        {
            if (ModelState.IsValid)
            {
                _context.Add(contact);
                await _context.SaveChangesAsync();
                ViewBag.Message = "تم إرسال الاستشارة بنجاح!";
                return View();
            }

            return View(contact);
        }




    }

}
