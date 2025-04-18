using Master__p.Models;
using Microsoft.AspNetCore.Mvc;

namespace Master__p.Controllers
{
    public class PaymentController : Controller
    {
        private readonly MyDbContext _context;

        public PaymentController(MyDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Checkout(int productId, int quantity)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == productId);
            if (product == null)
                return NotFound();

            ViewBag.Quantity = quantity;
            return View(product);
        }
    }
}
