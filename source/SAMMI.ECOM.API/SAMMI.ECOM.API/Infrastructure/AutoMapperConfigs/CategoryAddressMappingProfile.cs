using AutoMapper;
using SAMMI.ECOM.Domain.AggregateModels.AddressCategory;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Commands;
using SAMMI.ECOM.Domain.DomainModels.Auth;
using SAMMI.ECOM.Domain.DomainModels.CategoryAddress;

namespace SAMMI.ECOM.API.Infrastructure.AutoMapperConfigs
{
    public class CategoryAddressMappingProfile : Profile
    {
        public CategoryAddressMappingProfile()
        {
            CreateMap<CUProvinceCommand, Province>();
            CreateMap<Province, ProvinceDTO>();

            CreateMap<CUDistrictCommand, District>();
            CreateMap<District, DistrictDTO>();

            CreateMap<CUWardCommand, Ward>();
            CreateMap<Ward, WardDTO>();

            CreateMap<RefreshToken, RefreshTokenDTO>();
        }
    }
}
