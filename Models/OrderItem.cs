using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class OrderItem
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public decimal Price { get; set; }

    public virtual Orderss Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
