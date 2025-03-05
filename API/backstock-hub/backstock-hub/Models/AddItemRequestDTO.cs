namespace backstock_hub.Models
{
    public class AddItemRequestDTO
    {
        public required string Name { get; set; }
        public required int Stock { get; set; }

        public string? Category { get; set; }

        public int? ItemsInBox { get; set; }
    }
}
