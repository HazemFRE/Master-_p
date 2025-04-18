using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Orderss
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateOnly OrderDate { get; set; }

    public decimal TotalAmount { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Shippingg> Shippinggs { get; set; } = new List<Shippingg>();

    public virtual Userss User { get; set; } = null!;
}
