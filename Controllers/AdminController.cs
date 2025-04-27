using Master__p.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Master__p.Controllers
{
    public class AdminController : Controller
    {
        private readonly MyDbContext _context;

        public AdminController(MyDbContext context)
        {
            _context = context;
        }
        public IActionResult AdminDashboard()
        {
            return View();
        }
        public IActionResult AdminReviews()
        {
            return View();
        }

        public IActionResult AdminProducts()
        {
            return View();
        }
        public IActionResult AdminCustomers()
        {
            return View();
        }
        public IActionResult AdminOrders()
        {
            return View();
        }
        public IActionResult AdminCategories()
        {
            var categories = _context.Categories.ToList(); // جيب كل الكاتيجوريز
            return View(categories);



        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
            return RedirectToAction("AdminCategories"); // رجعه عالصفحة الرئيسية للتصنيفات
        }


        [HttpGet]
        public IActionResult EditCategory(int id)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == id);
            if (category == null)
            {
                return NotFound();
            }
            return View(category);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditCategory(Categorie category)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Update(category);
                _context.SaveChanges();
                return RedirectToAction("AdminCategories");
            }
            return View(category);
        }
        public IActionResult AddِCategoryAdmin()
        {
            return View();
        }
        // POST: Admin/AddCategory
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddCategory(Categorie model)
        {
            if (ModelState.IsValid)
            {
                _context.Categories.Add(model);
                _context.SaveChanges();
                return RedirectToAction("AdminCategories"); // أو اسم صفحة عرض التصنيفات عندك
            }
            return View(model);
        }
        public async Task<IActionResult> Users()
        {
            var users = await _context.Usersses.ToListAsync();
            return View(users);
        }
    }

}
