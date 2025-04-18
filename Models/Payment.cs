using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public DateOnly PaymentDate { get; set; }

    public decimal Amount { get; set; }

    public string? Method { get; set; }

    public virtual Orderss Order { get; set; } = null!;
}
