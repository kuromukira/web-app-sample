using LiteDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace collatask_repository.Model
{
    /// <summary></summary>
    public class TodoModel
    {
        [BsonId]
        [JsonIgnore]
        /// <summary></summary>
        public Guid _id { get; set; }

        [BsonField]
        /// <summary></summary>
        public string TodoId { get; set; }

        [BsonField]
        /// <summary>Cannot be null if a sub todo</summary>
        public string ParentTodoId { get; set; }

        [BsonField]
        [Required]
        /// <summary></summary>
        public string Description { get; set; }

        [BsonField]
        [Required]
        [EmailAddress]
        /// <summary>Email Address</summary>
        public string AddedBy { get; set; }

        [BsonField]
        [Required]
        /// <summary>Todo Date</summary>
        public DateTime TodoDate { get; set; }

        [BsonIgnore]
        public string CurrentUser { get; set; }

        [BsonField]
        /// <summary></summary>
        public bool IsCompleted { get; set; }

        [BsonField]
        /// <summary></summary>
        public DateTime DateAdded { get; set; }

        [BsonField]
        /// <summary></summary>
        public IList<TodoModel> Sub { get; set; } = new List<TodoModel>();
    }
}
