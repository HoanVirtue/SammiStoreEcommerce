using AutoMapper;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Application.CommandHandlers.OrderBuy
{
    public class CreateCartCommandHandler : CustombaseCommandHandler<CreateCartDetailCommand, CartDetailDTO>
    {
        private readonly ICartRepository _cartRepository;
        private readonly ICartDetailRepository _cartDetailRepository;
        private readonly IProductRepository _productRepository;
        private readonly IConfiguration _config;
        private readonly ICartDetailQueries _detailQueries;
        public CreateCartCommandHandler(
            ICartRepository cartRepository,
            ICartDetailRepository cartDetailRepository,
            IProductRepository productRepository,
            IConfiguration config,
            UserIdentity currentUser,
            IMapper mapper) : base(currentUser, mapper)
        {
            _cartRepository = cartRepository;
            _cartDetailRepository = cartDetailRepository;
            _productRepository = productRepository;
            _config = config;
        }

        private string GetCartKey(int userId) => $"{_config["RedisOptions:cart_key"]}{userId}";

        public override async Task<ActionResponse<CartDetailDTO>> Handle(CreateCartDetailCommand request, CancellationToken cancellationToken)
        {
            var actResponse = new ActionResponse<CartDetailDTO>();
            if (_currentUser.Id == null && request.Id == 0)
            {
                actResponse.AddError("Vui lòng đăng nhập hệ thống");
                return actResponse;
            }
            if (!_productRepository.IsExisted(request.ProductId))
            {
                actResponse.AddError("Sản phẩm không tồn tại.");
                return actResponse;
            }

            Cart cart = await _cartRepository.GetByCustomerId(_currentUser.Id);
            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId = _currentUser.Id,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "System"
                };
                actResponse.Combine(await _cartRepository.CreateAndSave(cart));
                if (!actResponse.IsSuccess)
                {
                    return actResponse;
                }
            }

            var detail = await _cartDetailRepository.GetByCartIdAndProductId(cart.Id, request.ProductId);
            if (detail == null)
            {
                request.CartId = cart.Id;
                request.CreatedDate = DateTime.Now;
                request.CreatedBy = "System";

                var createResponse = await _cartDetailRepository.CreateAndSave(request);
                actResponse.Combine(createResponse);
                if (!actResponse.IsSuccess)
                {
                    return actResponse;
                }

                actResponse.SetResult(_mapper.Map<CartDetailDTO>(createResponse.Result));
            }
            else
            {
                if (request.Operation == OperationTypeEnum.Add)
                {
                    detail.Quantity += request.Quantity;
                }
                else if (request.Operation == OperationTypeEnum.Subtract)
                {
                    int quantity = detail.Quantity - request.Quantity;
                    if (quantity < 1)
                    {
                        quantity = 1;
                    }
                    detail.Quantity = quantity;
                }
                else if (request.Operation == OperationTypeEnum.Replace)
                {
                    if (request.Quantity < 1)
                        request.Quantity = 1;
                    detail.Quantity = request.Quantity;
                }

                request.UpdatedDate = DateTime.Now;
                request.UpdatedBy = "System";
                var updateRes = await _cartRepository.UpdateAndSave(request);
                actResponse.Combine(updateRes);
                actResponse.SetResult(_mapper.Map<CartDetailDTO>(updateRes.Result));
            }
            _detailQueries.CacheCart(_currentUser.Id);
            return actResponse;
        }
    }
}
