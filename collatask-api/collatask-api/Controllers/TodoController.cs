using collatask_api.TaskHub;
using collatask_repository.Interface;
using collatask_repository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace collatask_api.Controllers
{
    /// <summary></summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : BaseController
    {
        private ITodoRepository TodoRepository { get; }
        private ISubTodoRepository SubTodoRepository { get; }

        /// <summary></summary>
        public TodoController(ITodoRepository todo, ISubTodoRepository subtodo, IHubContext<NotificationHub> context) : base(context)
        {
            TodoRepository = todo;
            SubTodoRepository = subtodo;
        }

        /// <summary></summary>
        [Authorize]
        [HttpGet]
        [Route("get")]
        public IActionResult Get(string id)
        {
            try
            {
                TodoModel _todo = TodoRepository.Get(Guid.Parse(id));
                _todo.Sub = SubTodoRepository.GetSubOf(_todo.TodoId).OrderBy(o => o.Description).ToList();
                return Ok(_todo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpGet]
        [Route("getall")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(TodoRepository.GetAll().OrderBy(o => o.Description).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> Save(TodoModel todo)
        {
            try
            {
                TodoRepository.Add(todo);
                await TodoRepository.Commit();
                await PostNotif(todo.CurrentUser ?? string.Empty, true);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpPut]
        [Route("modify")]
        public async Task<IActionResult> Modify(TodoModel todo)
        {
            try
            {
                TodoRepository.Modify(todo);
                await TodoRepository.Commit();
                await PostNotif(todo.CurrentUser ?? string.Empty, true);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpPost]
        [Route("complete")]
        public async Task<IActionResult> Complete([FromQuery]string id, [FromQuery]string currentUser)
        {
            try
            {
                TodoRepository.Complete(Guid.Parse(id));
                IList<TodoModel> _subTodos = SubTodoRepository.GetSubOf(id);
                foreach (TodoModel _subTodo in _subTodos)
                    SubTodoRepository.Complete(_subTodo._id);
                await TodoRepository.Commit();
                await SubTodoRepository.Commit();
                await PostNotif(currentUser ?? string.Empty, true);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpPut]
        [Route("remove")]
        public async Task<IActionResult> Remove([FromQuery]string id, [FromQuery]string currentUser)
        {
            try
            {
                TodoRepository.Remove(Guid.Parse(id));
                IList<TodoModel> _subTodos = SubTodoRepository.GetSubOf(id);
                foreach (TodoModel _subTodo in _subTodos)
                    SubTodoRepository.Remove(_subTodo._id);
                await TodoRepository.Commit();
                await SubTodoRepository.Commit();
                await PostNotif(currentUser ?? string.Empty, true);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
