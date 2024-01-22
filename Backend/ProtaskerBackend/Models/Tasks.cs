using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProtaskerBackend.Models
{
    [Table("Tasks")]
    public class Tasks
    {
        [Required]
        public int Id { get; set; }
        public int? UserId { get; set; }
        [Required]
        public string Text { get; set; }
        [Required]
        public byte Status { get; set; }

        // Reference to User
        public Users? User { get; set; }
    }
}
