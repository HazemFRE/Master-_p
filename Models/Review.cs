using System;
using System.Collections.Generic;

namespace Master__p.Models;

public partial class Review
{
    public int Id { get; set; }

    public int? ProductId { get; set; }

    public int? UserId { get; set; }

    public int? Rating { get; set; }

    public string? Comment { get; set; }

    public virtual Product? Product { get; set; }

    public virtual Userss? User { get; set; }
}
