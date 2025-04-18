using Microsoft.AspNetCore.Mvc;
using Master__p.Models;
using System.Linq;

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
    }
}