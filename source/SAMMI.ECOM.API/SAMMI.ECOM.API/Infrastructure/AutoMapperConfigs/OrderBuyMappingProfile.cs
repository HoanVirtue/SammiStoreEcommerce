using AutoMapper;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;

namespace SAMMI.ECOM.API.Infrastructure.AutoMapperConfigs
{
    public class OrderBuyMappingProfile : Profile
    {
        public OrderBuyMappingProfile()
        {
            CreateMap<CreateCartDetailCommand, CartDetail>();
            CreateMap<CartDetail, CartDetailDTO>();
        }
    }
}
