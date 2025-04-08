using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
using SAMMI.ECOM.Infrastructure.Queries.FavouriteProducts;
using SAMMI.ECOM.Infrastructure.Repositories.Products;
using SAMMI.ECOM.Infrastructure.Services.Caching;

namespace SAMMI.ECOM.API.Controllers.Products
{
    [Route("api/favourite-product")]
    [ApiController]
    public class FavouriteProductsController : CustomBaseController
    {
        private readonly IFavouriteProductQueries _favouriteQueries;
        private readonly IProductRepository _productRepository;
        private readonly IFavouriteProductRepository _favouriteRepository;
        private readonly IRedisService<List<FavouriteProductDTO>>? _redisService;
        private string cacheKey;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public FavouriteProductsController(
            IFavouriteProductQueries favouriteQueries,
            IProductRepository productRepository,
            UserIdentity currentUser,
            IFavouriteProductRepository favouriteRepository,
            IRedisService<List<FavouriteProductDTO>>? redisService,
            IConfiguration config,
            IMapper mapper,
            IMediator mediator,
            ILogger logger) : base(mediator, logger)
        {
            _favouriteQueries = favouriteQueries;
            _productRepository = productRepository;
            UserIdentity = currentUser;
            _favouriteRepository = favouriteRepository;
            _redisService = redisService;
            _config = config;
            cacheKey = $"{_config["RedisOptions:favourite_key"]}{UserIdentity.Id}";
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync(RequestFilterModel request)
        {
            if(request.Type == RequestType.Grid)
            {
                return Ok(await _favouriteQueries.GetList(request));
            }
            else if (request.Type == RequestType.SimpleAll)
            {
                if (_redisService != null && _redisService.IsConnected())
                {
                    var cachedList = _redisService.GetCache<List<FavouriteProductDTO>>(cacheKey);
                    if (cachedList != null)
                    {
                        return Ok(cachedList);
                    }
                }
                return Ok(await _favouriteQueries.GetAll(request));
            }
            return Ok();
        }

        [HttpPost("{productId}")]
        public async Task<IActionResult> PostAsync(int productId)
        {
            if(!_productRepository.IsExisted(productId))
            {
                return BadRequest("Sản phẩm không tồn tại");
            }
            var request = new FavouriteProduct
            {
                ProductId = productId,
                CustomerId = UserIdentity.Id,
                CreatedDate = DateTime.Now,
                CreatedBy = "System"
            };
            var createRes = await _favouriteRepository.CreateAndSave(request);
            if(createRes.IsSuccess)
            {
                if (_redisService != null && _redisService.IsConnected())
                {
                    var cachedList = await _redisService.GetCache<List<FavouriteProductDTO>>(cacheKey);
                    if (cachedList != null)
                    {
                        cachedList.Add(_mapper.Map<FavouriteProductDTO>(createRes.Result));
                        await _redisService.SetCache(cacheKey, cachedList);
                    }
                }
                return Ok(createRes);
            }
            return BadRequest(createRes);
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteAsync(int productId)
        {
            if (!_productRepository.IsExisted(productId))
            {
                return BadRequest("Sản phẩm không tồn tại");
            }
            var favourite = await _favouriteRepository.GetByCustomerAndProduct(UserIdentity.Id, productId);
            var deleteRes = _favouriteRepository.DeleteAndSave(favourite.Id);
            if (deleteRes.IsSuccess)
            {
                if (_redisService != null && _redisService.IsConnected())
                {
                    var cachedList = await _redisService.GetCache<List<FavouriteProductDTO>>(cacheKey);
                    if (cachedList != null)
                    {
                        cachedList.RemoveAll(x => x.CustomerId == UserIdentity.Id && x.ProductId == productId);
                        await _redisService.SetCache(cacheKey, cachedList);
                    }
                }
                return Ok(deleteRes);
            }
            return BadRequest(deleteRes);
        }
    }
}
