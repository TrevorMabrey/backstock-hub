using backstock_hub.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace backstock_hub.Data
{
    public class backstock_hubDbContext : DbContext
    {
        public backstock_hubDbContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<Item> Items { get; set; }
    }
}
