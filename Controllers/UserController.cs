using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Master__p.Models;

namespace Master__p.Controllers
{
    public class UserController : Controller
    {
        private readonly MyDbContext _context;

        public UserController(MyDbContext context)
        {
            _context = context;
        }

        // GET: User
        public async Task<IActionResult> Index()
        {
            return View(await _context.Usersses.ToListAsync());
        }

        // GET: User/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var userss = await _context.Usersses
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userss == null)
            {
                return NotFound();
            }

            return View(userss);
        }

        // GET: User/Create
        public IActionResult Register()
        {
            return View();
        }

        // POST: Userss/Register
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(Userss user)
        {
            if (ModelState.IsValid)
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                return View("Login"); // Redirect to the login page after registration
            }
            return View(user);
        }
        // GET: User/Edit/5
        // GET: User/Login
        public IActionResult Login()
        {
            return View();
        }

        // POST: User/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                ViewBag.Error = "يرجى إدخال البريد وكلمة المرور.";
                return View();
            }

            if(email == "Admin@gmail.com" && password == "123")
            {
                return RedirectToAction("Index", "Admin");
            }
            var user = await _context.Usersses
                .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user != null)
            {
                // ✅ خزّن بيانات المستخدم
                HttpContext.Session.SetString("UserEmail", user.Email);
                HttpContext.Session.SetString("UserRole", user.Role ?? "User");
                HttpContext.Session.SetString("UserId", user.Id.ToString());

                // ✅ دمج سلة الزائر (كوكي) مع سلة المستخدم
                var cookie = Request.Cookies["GuestCart"];
                if (!string.IsNullOrEmpty(cookie))
                {
                    var guestItems = cookie.Split(',').Select(item =>
                    {
                        var parts = item.Split(':');
                        return (ProductId: int.Parse(parts[0]), Quantity: int.Parse(parts[1]));
                    });

                    foreach (var item in guestItems)
                    {
                        var existing = _context.CartItems
                            .FirstOrDefault(ci => ci.CartId == user.Id && ci.ProductId == item.ProductId);

                        if (existing != null)
                        {
                            existing.Quantity += item.Quantity;
                            _context.CartItems.Update(existing);
                        }
                        else
                        {
                            _context.CartItems.Add(new CartItem
                            {
                                CartId = user.Id,
                                ProductId = item.ProductId,
                                Quantity = item.Quantity
                            });
                        }
                    }

                    await _context.SaveChangesAsync();
                    Response.Cookies.Delete("GuestCart");
                }

                return RedirectToAction("Index", "Home"); // يمكنك تغييره لوجهة أخرى
            }

            ViewBag.Error = "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
            return View();
        }
        // GET: User/Profile
        public async Task<IActionResult> Profile()
        {
            var userEmail = HttpContext.Session.GetString("UserEmail");

            if (string.IsNullOrEmpty(userEmail))
            {
                return RedirectToAction("Login", "User");
            }

            var user = await _context.Usersses.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }
        // GET: EditProfile
        public async Task<IActionResult> EditProfile()
        {
            var userEmail = HttpContext.Session.GetString("UserEmail");

            if (string.IsNullOrEmpty(userEmail))
            {
                return RedirectToAction("Login", "User");
            }

            var user = await _context.Usersses.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: EditProfile
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditProfile(Userss updatedUser)
        {
            if (!ModelState.IsValid)
            {
                return View(updatedUser);
            }

            var userEmail = HttpContext.Session.GetString("UserEmail");
            var user = await _context.Usersses.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound();
            }

            // تحديث البيانات (اختار الحقول اللي تسمح بتعديلها فقط)
         
            user.Address = updatedUser.Address;
            // ملاحظة: لا تعدل البريد الإلكتروني أو كلمة السر إلا إذا في صفحة خاصة لهم

            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "تم تحديث المعلومات بنجاح!";
            return RedirectToAction("Profile");
        }
        // GET: ChangePassword
        public IActionResult ChangePassword()
        {
            var userEmail = HttpContext.Session.GetString("UserEmail");

            if (string.IsNullOrEmpty(userEmail))
            {
                return RedirectToAction("Login", "User");
            }

            return View();
        }

        // POST: ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ChangePassword(string currentPassword, string newPassword, string confirmPassword)
        {
            var userEmail = HttpContext.Session.GetString("UserEmail");
            var user = await _context.Usersses.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound();
            }

            if (string.IsNullOrEmpty(currentPassword) || string.IsNullOrEmpty(newPassword) || string.IsNullOrEmpty(confirmPassword))
            {
                ModelState.AddModelError("", "جميع الحقول مطلوبة.");
                return View();
            }

            if (currentPassword != user.Password)
            {
                ModelState.AddModelError("", "كلمة السر الحالية غير صحيحة.");
                return View();
            }

            if (newPassword != confirmPassword)
            {
                ModelState.AddModelError("", "كلمة السر الجديدة وتأكيدها غير متطابقين.");
                return View();
            }

            // تحديث كلمة السر
            user.Password = newPassword;
            await _context.SaveChangesAsync();

            TempData["SuccessMessage"] = "تم تغيير كلمة السر بنجاح.";
            return RedirectToAction("Profile");
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // مسح بيانات الجلسة
            return RedirectToAction("Login", "User");
        }


    }
}
