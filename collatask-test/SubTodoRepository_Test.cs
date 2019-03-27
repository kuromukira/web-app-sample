using collatask_repository.Interface;
using collatask_repository.Model;
using collatask_repository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace collatask_test
{
    public class SubTodoRepository_Test
    {
        private string LiteDbLocation { get; } = "collatask_test.db";
        private string UserEmail { get; } = "norgelera@outlook.com";

        [Fact]
        public void _AddSubTodo()
        {
            ISubTodoRepository _repository = new SubTodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            Guid _parentId = Guid.NewGuid();

            // Add-Test starts here

            for (int i = 0; i < 5; i++)
                _repository.Add(new TodoModel
                {
                    ParentTodoId = _parentId.ToString(),
                    Description = "Sub Todo # " + i.ToString(),
                    AddedBy = UserEmail
                });

            // change _parentId
            _parentId = Guid.NewGuid();
            for (int i = 0; i < 5; i++)
                _repository.Add(new TodoModel
                {
                    ParentTodoId = _parentId.ToString(),
                    Description = "Sub Todo # " + i.ToString(),
                    AddedBy = UserEmail
                });

            _repository.Commit();

            Assert.Equal(5, _repository.GetSubOf(_parentId.ToString()).Count);
        }

        [Fact]
        public void _EditSubTodo()
        {
            ISubTodoRepository _repository = new SubTodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            Guid _parentId = Guid.NewGuid();
            for (int i = 0; i < 5; i++)
                _repository.Add(new TodoModel
                {
                    ParentTodoId = _parentId.ToString(),
                    Description = "Sub Todo # " + i.ToString(),
                    AddedBy = UserEmail
                });
            _repository.Commit();
            IList<TodoModel> _testData = _repository.GetAll();

            // Edit-Test starts here
            Random _randomIndex = new Random();

            TodoModel _subToUpdate = _repository.Get(_testData[_randomIndex.Next(0, 4)]._id);
            _subToUpdate.Description = "I was updated";
            _repository.Modify(_subToUpdate);
            _repository.Commit();

            Assert.Equal(_subToUpdate.Description, _repository.Get(_subToUpdate._id).Description);
        }

        [Fact]
        public void _DeleteSubTodo()
        {
            ISubTodoRepository _repository = new SubTodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            Guid _parentId = Guid.NewGuid();
            for (int i = 0; i < 5; i++)
                _repository.Add(new TodoModel
                {
                    ParentTodoId = _parentId.ToString(),
                    Description = "Sub Todo # " + i.ToString(),
                    AddedBy = UserEmail
                });
            _repository.Commit();
            IList<TodoModel> _testData = _repository.GetAll();

            // Delete-Test starts here
            Random _randomIndex = new Random();
            int _toDelete = _randomIndex.Next(0, 4);
            IList<int> _indexes = Enumerable.Range(0, 4).OrderBy(x => _randomIndex.Next()).Take(_toDelete).ToList();
            foreach (int _index in _indexes)
                _repository.Remove(_testData[_index]._id);
            _repository.Commit();

            Assert.Equal(_testData.Count - _indexes.Count, _repository.GetAll().Count);
        }

        [Fact]
        public void DropCollection()
        {
            ISubTodoRepository _repository = new SubTodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            Assert.Equal(0, _repository.GetAll().Count);
        }
    }
}
