using System.Threading.Tasks;
using Azure;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.API.Services.ElasticSearch;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Infrastructure.Queries.Products;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers.Products
{
    public class ProductsController : CustomBaseController
    {
        private readonly IProductQueries _productQueries;
        private readonly IProductRepository _productRepository;
        private readonly IProductElasticService _productElasticService;
        public ProductsController(
            IProductQueries productQueries,
            IProductRepository productRepository,
            IProductElasticService productElasticService,
            IMediator mediator,
            ILogger<ProductsController> logger) : base(mediator, logger)
        {
            _productQueries = productQueries;
            _productRepository = productRepository;
            _productElasticService = productElasticService;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
            {
                return Ok(await _productQueries.GetAll(request));
            }
            return Ok(await _productQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _productQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateProductCommand request)
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
            //if(_productElasticService != null && await _productElasticService.IsConnected())
            //{
            //    _productElasticService.AddOrUpdateProduct(await _productQueries.GetById(response.Result.Id));
            //}
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateProductCommand request)
        {
            if ((id == 0 || request.Id == 0) || id != request.Id)
            {
                return BadRequest();
            }
            if (!_productRepository.IsExisted(id))
            {
                return BadRequest("Sản phẩm không tồn tại");
            }

            var response = await _mediator.Send(request);
            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }
            //if (_productElasticService != null && await _productElasticService.IsConnected())
            //{
            //    _productElasticService.AddOrUpdateProduct(await _productQueries.GetById(response.Result.Id));
            //}
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (!_productRepository.IsExisted(id))
            {
                return BadRequest("Sản phẩm không tồn tại.");
            }
            if (_productElasticService != null && await _productElasticService.IsConnected())
            {
                _productElasticService.DeleteProduct(id);
            }
            return Ok(_productRepository.DeleteAndSave(id));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteRange([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse<List<string>>();
            var listError = new Dictionary<int, string>();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            if(!ids.All(id => _productRepository.IsExisted(id)))
            {
                actErrorResponse.AddError("Một số sản phẩm không tồn tại.");
                return BadRequest(actErrorResponse);
            }
            _productElasticService.DeleteRangeProduct(ids);
            return Ok(_productRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastId()
        {
            return Ok(await _productQueries.GetCodeByLastId());
        }

        [HttpGet("get-suggest")]
        public async Task<IActionResult> GetDataSuggest([FromQuery]string keyWord, [FromQuery] int size = 5)
        {
            return Ok(await _productElasticService.SuggestProducts(keyWord, size));
        }

        [HttpGet("get-related-products")]
        public async Task<IActionResult> GetRelatedProductsAsync(int productId, int numberTop = 5)
        {
            return Ok(await _productQueries.GetRelated(productId, numberTop));
        }
    }
}
