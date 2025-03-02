using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Services.Caching;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : CustomBaseController
    {
        private readonly ICartQueries _cartQueries;
        private readonly ICartDetailQueries _cartDetailQueries;
        private readonly ICartDetailRepository _detailRepository;
        private readonly IRedisService<List<CartDetailDTO>>? _redisService;
        private readonly IConfiguration _config;
        public CartsController(
            ICartQueries cartQueries,
            ICartDetailQueries cartDetailQueries,
            ICartDetailRepository cartDetailRepository,
            UserIdentity userIdentity,
            IRedisService<List<CartDetailDTO>> redisService,
            IConfiguration config,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _cartQueries = cartQueries;
            _cartDetailQueries = cartDetailQueries;
            _detailRepository = cartDetailRepository;
            UserIdentity = userIdentity;
            _redisService = redisService;
            _config = config;
        }

        [HttpGet("get-cart")]
        public async Task<IActionResult> GetCart()
        {
            var cartKey = $"{_config["RedisOptions:cart_key"]}{UserIdentity.Id}";
            if (_redisService != null && _redisService.IsConnected() && _redisService.IsConnected())
            {
                var cachedCart = await _redisService.GetCache<List<CartDetailDTO>>(cartKey);
                if (cachedCart != null && cachedCart.Count > 0)
                {
                    return Ok(cachedCart);
                }
            }

            var cartItems = (await _cartDetailQueries.GetMyCart()).ToList();
            if (cartItems != null && cartItems.Count > 0 && _redisService != null && _redisService.IsConnected())
            {
                await _redisService.SetCache(cartKey, cartItems);
            }
            return Ok(cartItems);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _cartQueries.GetById(id));
        }

        //customer
        [HttpPost("add-to-cart")]
        public async Task<IActionResult> AddToCart([FromBody] CreateCartDetailCommand request)
        {
            if (request.Id != 0)
            {
                return BadRequest();
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                await _cartDetailQueries.CacheCart(UserIdentity.Id);
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProductFromCart(int productId)
        {
            var cartDetail = await _detailRepository.GetByUserIdAndProductId(UserIdentity.Id, productId);
            if (cartDetail == null)
            {
                return BadRequest("Không tồn tại sản phẩm trong giỏ hàng");
            }
            var removeRes = _detailRepository.DeleteAndSave(cartDetail.Id);
            if (!removeRes.IsSuccess)
            {
                return BadRequest(removeRes);
            }
            await _cartDetailQueries.CacheCart(UserIdentity.Id);
            return Ok(removeRes);
        }
    }
}
