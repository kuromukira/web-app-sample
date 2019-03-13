using collatask_repository.Interface;
using collatask_repository.Model;
using collatask_repository.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace collatask_repository.Repository
{
    public class TodoRepository : ITodoRepository
    {
        private UOW<TodoModel> TodoUOW { get; set; }

        public TodoRepository(string liteDbLocation) => TodoUOW = new UOW<TodoModel>(liteDbLocation, "col_todo");

        void ITodoRepository.Add(TodoModel todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Description))
                throw new NullReferenceException("Description is required.");
            else if (string.IsNullOrWhiteSpace(todo.AddedBy))
                throw new NullReferenceException("Added By is required.");
            else
            {
                todo._id = Guid.NewGuid();
                todo.TodoId = todo._id.ToString();
                todo.DateAdded = DateTime.Now;
                TodoUOW.Add(todo);
            }
        }

        void ITodoRepository.Complete(Guid id)
        {
            TodoModel _todo = TodoUOW.Get(id);
            _todo.IsCompleted = true;
            TodoUOW.Modify(_todo);
        }

        TodoModel ITodoRepository.Get(Guid id)
        {
            return TodoUOW.Get(id);
        }

        IList<TodoModel> ITodoRepository.GetAll()
        {
            return TodoUOW.GetAll();
        }

        void ITodoRepository.Modify(TodoModel todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Description))
                throw new NullReferenceException("Description is required.");
            else if (string.IsNullOrWhiteSpace(todo.AddedBy))
                throw new NullReferenceException("Added By is required.");
            else
            {
                todo._id = Guid.Parse(todo.TodoId);
                TodoUOW.Modify(todo);
            }
        }

        void ITodoRepository.Remove(Guid id) => TodoUOW.Remove(id);

        async Task ITodoRepository.Commit() => await TodoUOW.Commit();

        void ITodoRepository.Drop() => TodoUOW.Drop();
    }
}
