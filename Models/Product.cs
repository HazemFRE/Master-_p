using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public int StockQuantity { get; set; }

    public int? CategoryId { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Categorie? Category { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Supplier> Suppliers { get; set; } = new List<Supplier>();
}
