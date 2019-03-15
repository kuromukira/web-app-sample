using collatask_repository.Interface;
using collatask_repository.Model;
using collatask_repository.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace collatask_test
{
    public class TodoRepository_Test
    {
        private string LiteDbLocation { get; } = "collatask_test.db";
        private string UserEmail { get; } = "norgelera@outlook.com";

        [Fact]
        public void _AddTodo()
        {
            ITodoRepository _repository = new TodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            // Add-Test starts here

            for (int i = 0; i < 1000; i++)
                _repository.Add(new TodoModel
                {
                    Description = "Todo # " + i.ToString(),
                    AddedBy = UserEmail,
                    DateAdded = DateTime.Now
                });
            _repository.Commit();

            Assert.Equal(1000, _repository.GetAll().Count);
        }

        [Fact]
        public void _EditTodo()
        {
            ITodoRepository _repository = new TodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            // Create data first for update
            for (int i = 0; i < 1000; i++)
                _repository.Add(new TodoModel
                {
                    Description = "Todo # " + i.ToString(),
                    AddedBy = UserEmail,
                    DateAdded = DateTime.Now
                });
            _repository.Commit();
            IList<TodoModel> _testData = _repository.GetAll();

            // Modify-Test starts here
            Random _randomIndex = new Random();

            TodoModel _toUpdate1 = _testData[_randomIndex.Next(0, 999)]; // Get an item randomly
            _toUpdate1.Description = "Hi I am updated first";
            _repository.Modify(_toUpdate1);

            TodoModel _toUpdate2 = _testData[_randomIndex.Next(0, 999)]; // Get an item randomly
            _toUpdate2.Description = "Hi I am updated second";
            _repository.Modify(_toUpdate2);

            _repository.Commit();

            TodoModel _toUpdate1_Result = _repository.Get(Guid.Parse(_toUpdate1.TodoId));
            Assert.Equal(_toUpdate1_Result.Description, _toUpdate1.Description);

            TodoModel _toUpdate2_Result = _repository.Get(Guid.Parse(_toUpdate2.TodoId));
            Assert.Equal(_toUpdate2_Result.Description, _toUpdate2.Description);
        }

        [Fact]
        public void _DeleteTodo()
        {
            ITodoRepository _repository = new TodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            // Create data first for update
            for (int i = 0; i < 1000; i++)
                _repository.Add(new TodoModel
                {
                    Description = "Todo # " + i.ToString(),
                    AddedBy = UserEmail,
                    DateAdded = DateTime.Now
                });
            _repository.Commit();
            IList<TodoModel> _testData = _repository.GetAll();

            // Delete-Test starts here
            Random _randomIndex = new Random();
            int _toDelete = _randomIndex.Next(0, 999);
            IList<int> _indexes = Enumerable.Range(0, 999).OrderBy(x => _randomIndex.Next()).Take(_toDelete).ToList();
            foreach (int _index in _indexes)
                _repository.Remove(_testData[_index]._id);
            _repository.Commit();

            Assert.Equal(_testData.Count - _indexes.Count, _repository.GetAll().Count);
        }

        [Fact]
        public void MultipleActions()
        {
            ITodoRepository _repository = new TodoRepository(LiteDbLocation);
            _repository.Drop(); // For testing only

            // Create data first for update
            for (int i = 0; i < 10; i++)
                _repository.Add(new TodoModel
                {
                    Description = "Todo # " + i.ToString(),
                    AddedBy = UserEmail,
                    DateAdded = DateTime.Now
                });
            _repository.Commit();
            IList<TodoModel> _testData = _repository.GetAll();

            // Test starts here
            Random _randomIndex = new Random();
            IList<int> _indexes = Enumerable.Range(0, 9).OrderBy(x => _randomIndex.Next()).Take(2).ToList();

            _repository.Add(new TodoModel
            {
                Description = "This has been added.",
                AddedBy = UserEmail,
                DateAdded = DateTime.Now
            });

            _repository.Remove(_testData[_indexes.First()]._id);

            TodoModel _toUpdate = _testData[_indexes.Last()];
            _toUpdate.Description = "I was updated";
            _toUpdate.IsCompleted = true;
            _repository.Modify(_toUpdate);

            _repository.Commit();

            TodoModel _updatedResult = _repository.Get(_toUpdate._id);
            Assert.Equal(_updatedResult.Description, _toUpdate.Description);
            Assert.Equal(_updatedResult.IsCompleted, _toUpdate.IsCompleted);

            Assert.Equal(10, _repository.GetAll().Count);
        }

        [Fact]
        public void DropCollection()
        {
            ITodoRepository _repository = new TodoRepository(LiteDbLocation);
            _repository.Drop();

            Assert.Equal(0, _repository.GetAll().Count);
        }

    }
}
