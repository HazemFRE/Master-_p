using Master__p.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace Master__p.Controllers
{
    public class ProductController : Controller
    {
        private readonly MyDbContext _context;

        public ProductController(MyDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Allproduct()
        {
            var products = _context.Products.ToList();
            return View(products);
        }

        public IActionResult Details(int id)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == id);
            if (product == null) return NotFound();

            // فورم تلقائي للإضافة للسلة عند فتح التفاصيل
            ViewBag.AutoAddToCart = true;
            return View(product);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddToCart(int productId, int quantity)
        {
            var userIdStr = HttpContext.Session.GetString("UserId");

            if (string.IsNullOrEmpty(userIdStr))
            {
                // زائر ⇒ خزّن بالكوكيز
                var cookie = Request.Cookies["GuestCart"];
                List<(int, int)> cartItems = string.IsNullOrEmpty(cookie)
                    ? new List<(int, int)>()
                    : cookie.Split(',').Select(item =>
                    {
                        var parts = item.Split(':');
                        return (int.Parse(parts[0]), int.Parse(parts[1]));
                    }).ToList();

                var existing = cartItems.FirstOrDefault(i => i.Item1 == productId);
                if (existing != default)
                {
                    cartItems.Remove(existing);
                    cartItems.Add((productId, existing.Item2 + quantity));
                }
                else
                {
                    cartItems.Add((productId, quantity));
                }

                var newCookieValue = string.Join(",", cartItems.Select(i => $"{i.Item1}:{i.Item2}"));
                Response.Cookies.Append("GuestCart", newCookieValue, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(7),
                    HttpOnly = true
                });

                return RedirectToAction("Checkout");
            }

            // مسجل دخول ⇒ قاعدة البيانات
            int userId = int.Parse(userIdStr);
            var existingItem = _context.CartItems.FirstOrDefault(ci => ci.CartId == userId && ci.ProductId == productId);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
                _context.CartItems.Update(existingItem);
            }
            else
            {
                _context.CartItems.Add(new CartItem
                {
                    CartId = userId,
                    ProductId = productId,
                    Quantity = quantity
                });
            }

            _context.SaveChanges();
            return RedirectToAction("Checkout");
        }

        [HttpGet]
        public IActionResult Checkout()
        {
            var userIdStr = HttpContext.Session.GetString("UserId");
            List<CartItem> cartItems = new();

            if (!string.IsNullOrEmpty(userIdStr))
            {
                int userId = int.Parse(userIdStr);
                cartItems = _context.CartItems
                    .Include(ci => ci.Product)
                    .Where(ci => ci.CartId == userId)
                    .ToList();
            }
            else
            {
                var cookie = Request.Cookies["GuestCart"];
                if (!string.IsNullOrEmpty(cookie))
                {
                    var guestItems = cookie.Split(',').Select(item =>
                    {
                        var parts = item.Split(':');
                        return new CartItem
                        {
                            Product = _context.Products.Find(int.Parse(parts[0])),
                            Quantity = int.Parse(parts[1])
                        };
                    }).Where(ci => ci.Product != null).ToList();

                    cartItems = guestItems;
                }
            }

            return View(cartItems);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult PlaceOrder(string method)
        {
            var userIdStr = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userIdStr)) return RedirectToAction("Login", "User");

            int userId = int.Parse(userIdStr);
            var cartItems = _context.CartItems
                .Include(ci => ci.Product)
                .Where(ci => ci.CartId == userId)
                .ToList();

            if (!cartItems.Any()) return RedirectToAction("Checkout");

            decimal total = cartItems.Sum(ci => ci.Product.Price * ci.Quantity);

            var order = new Orderss
            {
                UserId = userId,
                OrderDate = DateOnly.FromDateTime(DateTime.Now),
                TotalAmount = total
            };

            _context.Ordersses.Add(order);
            _context.SaveChanges(); // للحصول على OrderId

            foreach (var item in cartItems)
            {
                _context.OrderItems.Add(new OrderItem
                {
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Product.Price
                });
            }

            _context.Payments.Add(new Payment
            {
                OrderId = order.Id,
                Amount = total,
                PaymentDate = DateOnly.FromDateTime(DateTime.Now),
                Method = method
            });

            _context.CartItems.RemoveRange(cartItems); // تفريغ السلة
            _context.SaveChanges();

            return RedirectToAction("OrderSuccess");
        }

        [HttpGet]
        public IActionResult OrderSuccess()
        {
            return View();
        }

        public void MergeGuestCartWithUserCart(int userId)
        {
            var cookie = Request.Cookies["GuestCart"];
            if (string.IsNullOrEmpty(cookie)) return;

            var guestItems = cookie.Split(',').Select(item =>
            {
                var parts = item.Split(':');
                return (int.Parse(parts[0]), int.Parse(parts[1]));
            });

            foreach (var (productId, quantity) in guestItems)
            {
                var existing = _context.CartItems.FirstOrDefault(c => c.CartId == userId && c.ProductId == productId);
                if (existing != null)
                {
                    existing.Quantity += quantity;
                    _context.CartItems.Update(existing);
                }
                else
                {
                    _context.CartItems.Add(new CartItem
                    {
                        CartId = userId,
                        ProductId = productId,
                        Quantity = quantity
                    });
                }
            }

            _context.SaveChanges();
            Response.Cookies.Delete("GuestCart");
        }
        [HttpGet]
        public IActionResult Antiques()
        {
            var antiquesCategory = _context.Categories.FirstOrDefault(c => c.Name == "Antiques");

            if (antiquesCategory == null)
                return NotFound("لم يتم العثور على كاتيجوري Antiques");

            var antiquesProducts = _context.Products
                .Where(p => p.CategoryId == antiquesCategory.Id)
                .ToList();

            return View(antiquesProducts);
        }
    }
}
