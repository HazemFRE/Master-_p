using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class CartItem
{
    public int Id { get; set; }

    public int CartId { get; set; }

    public int ProductId { get; set; }

    public int Quantity { get; set; }

    public virtual Userss Cart { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
