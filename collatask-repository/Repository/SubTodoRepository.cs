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
            throw new NotImplementedException();
        }

        void ISubTodoRepository.Complete(Guid id)
        {
            throw new NotImplementedException();
        }

        TodoModel ISubTodoRepository.Get(Guid id)
        {
            throw new NotImplementedException();
        }

        IList<TodoModel> ISubTodoRepository.GetSubOf(string parentId)
        {
            throw new NotImplementedException();
        }

        void ISubTodoRepository.Modify(TodoModel todo)
        {
            throw new NotImplementedException();
        }

        void ISubTodoRepository.Remove(Guid id)
        {
            throw new NotImplementedException();
        }

        async Task ISubTodoRepository.Commit() => await SubTodoUOW.Commit();

        void ISubTodoRepository.Drop() => SubTodoUOW.Drop();
    }
}
