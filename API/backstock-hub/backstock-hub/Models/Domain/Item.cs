namespace backstock_hub.Models.Domain
{
    public class Item
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required int Stock { get; set; }

        public string? Category { get; set; }

        public int? ItemsInBox { get; set; }

    }
}
