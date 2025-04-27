using Microsoft.AspNetCore.Mvc;
using Master__p.Models;
using System.Linq;
using System.Security.Cryptography;

namespace Master__p.Controllers
{
    public class BlogController : Controller
    {
        private readonly MyDbContext _context;

        public BlogController(MyDbContext context)
        {
            _context = context;
        }

        public IActionResult Blog()
        {
            var posts = _context.Postsses.ToList();
            return View(posts);
        }
        public IActionResult OliveSoap()
        {
            var product = new Postss
            {
                Id = 1,
                Title = "صابون زيت الزيتون الطبيعي",
                Body = "صابون طبيعي 100% مصنوع من زيت الزيتون البكر الممتاز...",
                Image = "https://upload.wikimedia.org/wikipedia/commons/3/34/Olive_oil_soap.jpg",
                Status = "متوفر",
                CreatedAt = DateTime.Now
            };

            return View(product);
        }
        public IActionResult GfOliveOil()
        {
            var product = new Postss
            {
                Id = 2,
                Title = "زيت الزيتون بنكهة الثوم",
                Body = "زيت الزيتون المنكّه بالثوم، يضيف نكهة غنية ومميزة لأطباقك....",
                Image = "https://static.webteb.net/images/content/tbl_articles_article_23441_37097a7b4a6-b80e-4b5a-bc11-d91aa139a51b.jpg",
                Status = "متوفر",
                CreatedAt = DateTime.Now
            };
            return View(product);
        }
    }
    }