using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Userss
{
    public int Id { get; set; }

    public string? Username { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Image { get; set; }

    public string? Role { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<Cardss> Cardsses { get; set; } = new List<Cardss>();

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<Orderss> Ordersses { get; set; } = new List<Orderss>();

    public virtual ICollection<Postss> Postsses { get; set; } = new List<Postss>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
