using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Shippingg
{
    public int Id { get; set; }

    public int? OrderId { get; set; }

    public DateOnly? ShippingDate { get; set; }

    public string? Status { get; set; }

    public virtual Orderss? Order { get; set; }
}
