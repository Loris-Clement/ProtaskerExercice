using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProtaskerBackend.Models;

namespace ProtaskerBackend.Data
{
    public class ProtaskerBackendContext : DbContext
    {
        public ProtaskerBackendContext (DbContextOptions<ProtaskerBackendContext> options)
            : base(options)
        {
        }

        public DbSet<ProtaskerBackend.Models.Users> Users { get; set; } = default!;

        public DbSet<ProtaskerBackend.Models.Tasks>? Tasks { get; set; }
    }
}
