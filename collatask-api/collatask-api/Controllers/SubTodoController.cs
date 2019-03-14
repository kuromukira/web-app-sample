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
    public class SubTodoController : ControllerBase
    {
        /// <summary></summary>
        private ISubTodoRepository SubTodoRepository { get; }

        /// <summary></summary>
        public SubTodoController(ISubTodoRepository repository) => SubTodoRepository = repository;

        /// <summary></summary>
        [Authorize]
        [HttpGet]
        [Route("get")]
        public IActionResult Get(string id)
        {
            try
            {
                return Ok(SubTodoRepository.Get(Guid.Parse(id)));
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
                return Ok(SubTodoRepository.GetAll().OrderBy(o => o.Description).ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary></summary>
        [Authorize]
        [HttpGet]
        [Route("getsubof")]
        public IActionResult GetSubOf(string parentId)
        {
            try
            {
                return Ok(SubTodoRepository.GetSubOf(parentId).OrderBy(o => o.Description).ToList());
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
                SubTodoRepository.Add(todo);
                await SubTodoRepository.Commit();
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
                SubTodoRepository.Modify(todo);
                await SubTodoRepository.Commit();
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
                SubTodoRepository.Complete(Guid.Parse(id));
                await SubTodoRepository.Commit();
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
                SubTodoRepository.Remove(Guid.Parse(id));
                await SubTodoRepository.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}