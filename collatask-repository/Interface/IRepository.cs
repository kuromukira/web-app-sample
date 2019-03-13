using collatask_repository.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace collatask_repository.Interface
{
    public interface ITodoRepository
    {
        void Add(TodoModel todo);
        void Modify(TodoModel todo);
        void Remove(Guid id);
        void Complete(Guid id);
        IList<TodoModel> GetAll();
        TodoModel Get(Guid id);
        Task Commit();
        void Drop();
    }

    public interface ISubTodoRepository
    {
        void Add(TodoModel todo);
        void Modify(TodoModel todo);
        void Remove(Guid id);
        void Complete(Guid id);
        IList<TodoModel> GetAll();
        IList<TodoModel> GetSubOf(string parentId);
        TodoModel Get(Guid id);
        Task Commit();
        void Drop();
    }
}
