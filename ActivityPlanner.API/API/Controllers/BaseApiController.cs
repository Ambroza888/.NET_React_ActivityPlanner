using API.Extensions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Values != null)
                return Ok(result.Values);
            if (result.IsSuccess && result.Values == null)
                return NotFound();
            return BadRequest(result.Error);
        }
        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Values != null)
            {
                Response.AddPaginationHeader(result.Values.CurrentPage, result.Values.PageSize, result.Values.TotalCount, result.Values.TotalPages);
                return Ok(result.Values);
            }
            if (result.IsSuccess && result.Values == null)
                return NotFound();
            return BadRequest(result.Error);
        }
    }
}