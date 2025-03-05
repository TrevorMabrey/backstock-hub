using backstock_hub.Data;
using backstock_hub.Models;
using backstock_hub.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backstock_hub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly backstock_hubDbContext dbContext;

        public ItemsController(backstock_hubDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllItems()
        {
            var contacts = dbContext.Items.ToList();
            return Ok(contacts);
        }

        [HttpPost]
        public IActionResult AddItem(AddItemRequestDTO request)
        {
            var domainModelItem = new Item
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Stock = request.Stock,
                Category = request.Category,
                ItemsInBox = request.ItemsInBox
            };

            dbContext.Items.Add(domainModelItem);
            dbContext.SaveChanges();

            return Ok(domainModelItem);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteItem(Guid id)
        {
            var item = dbContext.Items.Find(id);

            if (item is not null)
            {
                dbContext.Items.Remove(item);
                dbContext.SaveChanges();
            }
            return Ok();

        }
    }
}
