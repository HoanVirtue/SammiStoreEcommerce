using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Infrastructure.Queries.ProductCategorys;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers.ProductCategorys
{
    [Route("api/product-category")]
    public class ProductCategorysController : CustomBaseController
    {
        private readonly IProductCategoryQueries _categoryQueries;
        private readonly IProductCategoryRepository _categoryRepository;
        public ProductCategorysController(
            IProductCategoryQueries categoryQueries,
            IProductCategoryRepository categoryRepository,
            IMediator mediator,
            ILogger<ProductCategorysController> logger) : base(mediator, logger)
        {
            _categoryQueries = categoryQueries;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
            {
                return Ok(await _categoryQueries.GetAll(request));
            }
            else if (request.Type == RequestType.Selection)
            {
                return Ok(await _categoryQueries.GetSelectionList(request));
            }
            return Ok(await _categoryQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _categoryQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUProductCategoryCommand request)
        {
            if (request.Id != 0)
            {
                return BadRequest();
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CUProductCategoryCommand request)
        {
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }
            if (!_categoryRepository.IsExisted(id))
            {
                return BadRequest("Danh mục sản phẩm không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_categoryRepository.IsExisted(id))
            {
                return BadRequest("Loại sản phẩm không tồn tại.");
            }
            return Ok(_categoryRepository.DeleteAndSave(id));
        }

        [HttpDelete]
        public IActionResult DeleteRange([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            if (!ids.All(id => _categoryRepository.IsExisted(id)))
            {
                actErrorResponse.AddError("Một số danh mục sản phẩm không tồn tại.");
                return BadRequest(actErrorResponse);
            }
            
            return Ok(_categoryRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastId()
        {
            return Ok(await _categoryQueries.GetCodeByLastId());
        }
    }
}
