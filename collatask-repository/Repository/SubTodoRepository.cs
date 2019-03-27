using collatask_repository.Interface;
using collatask_repository.Model;
using collatask_repository.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace collatask_repository.Repository
{
    public class SubTodoRepository : ISubTodoRepository
    {
        private UOW<TodoModel> SubTodoUOW { get; set; }

        public SubTodoRepository(string liteDbLocation) => SubTodoUOW = new UOW<TodoModel>(liteDbLocation, "col_subtodo");

        void ISubTodoRepository.Add(TodoModel todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Description))
                throw new NullReferenceException("Description is required.");
            else if (string.IsNullOrWhiteSpace(todo.AddedBy))
                throw new NullReferenceException("Added By is required.");
            else if (string.IsNullOrWhiteSpace(todo.ParentTodoId))
                throw new NullReferenceException("Parent Id is required.");
            else
            {
                todo._id = Guid.NewGuid();
                todo.TodoId = todo._id.ToString();
                todo.DateAdded = DateTime.Now;
                SubTodoUOW.Add(todo);
            }
        }

        void ISubTodoRepository.Complete(Guid id)
        {
            TodoModel _todo = SubTodoUOW.Get(id);
            _todo.IsCompleted = true;
            SubTodoUOW.Modify(_todo);
        }

        TodoModel ISubTodoRepository.Get(Guid id)
        {
            return SubTodoUOW.Get(id);
        }

        IList<TodoModel> ISubTodoRepository.GetAll()
        {
            return SubTodoUOW.GetAll();
        }

        IList<TodoModel> ISubTodoRepository.GetSubOf(string parentId)
        {
            TodoModel _staticModel = new TodoModel();
            return SubTodoUOW.GetAllBy(nameof(_staticModel.ParentTodoId), parentId);
        }

        void ISubTodoRepository.Modify(TodoModel todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Description))
                throw new NullReferenceException("Description is required.");
            else if (string.IsNullOrWhiteSpace(todo.AddedBy))
                throw new NullReferenceException("Added By is required.");
            else if (string.IsNullOrWhiteSpace(todo.ParentTodoId))
                throw new NullReferenceException("Parent Id is required.");
            else
            {
                todo._id = Guid.Parse(todo.TodoId);
                SubTodoUOW.Modify(todo);
            }
        }

        void ISubTodoRepository.Remove(Guid id) => SubTodoUOW.Remove(id);

        async Task ISubTodoRepository.Commit() => await SubTodoUOW.Commit();

        void ISubTodoRepository.Drop() => SubTodoUOW.Drop();
    }
}
