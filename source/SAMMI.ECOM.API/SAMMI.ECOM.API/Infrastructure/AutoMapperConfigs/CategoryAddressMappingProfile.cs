using AutoMapper;
using SAMMI.ECOM.Domain.AggregateModels.AddressCategory;
using SAMMI.ECOM.Domain.DomainModels.CategoryAddress;

namespace SAMMI.ECOM.API.Infrastructure.AutoMapperConfigs
{
    public class CategoryAddressMappingProfile : Profile
    {
        public CategoryAddressMappingProfile()
        {
            CreateMap<Province, ProvinceDTO>();

            CreateMap<District, DistrictDTO>();

            CreateMap<Ward, WardDTO>();
        }
    }
}
