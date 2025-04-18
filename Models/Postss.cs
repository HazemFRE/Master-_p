using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Postss
{
    public int Id { get; set; }

    public string? Title { get; set; }

    public string? Body { get; set; }

    public int? UserId { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Image { get; set; }

    public virtual Userss? User { get; set; }
}
