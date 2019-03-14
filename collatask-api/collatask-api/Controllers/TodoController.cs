using collatask_repository.Interface;
using collatask_repository.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace collatask_api.Controllers
{
    /// <summary></summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private ITodoRepository TodoRepository { get; }
        private ISubTodoRepository SubTodoRepository { get; }

        /// <summary></summary>
        public TodoController(ITodoRepository todo, ISubTodoRepository subtodo)
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
        public async Task<IActionResult> Complete([FromQuery]string id)
        {
            try
            {
                TodoRepository.Complete(Guid.Parse(id));
                await TodoRepository.Commit();
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
        public async Task<IActionResult> Remove([FromQuery]string id)
        {
            try
            {
                TodoRepository.Remove(Guid.Parse(id));
                await TodoRepository.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
