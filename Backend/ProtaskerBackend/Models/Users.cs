﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProtaskerBackend.Models
{
    public class Users
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string FirstName { get; set; }

        // Collection containing a user's tasks
        [JsonIgnore]
        public ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
    }
}
