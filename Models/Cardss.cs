using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Cardss
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string CardNumber { get; set; } = null!;

    public DateOnly ExpiryDate { get; set; }

    public string Cvv { get; set; } = null!;

    public virtual Userss User { get; set; } = null!;
}
