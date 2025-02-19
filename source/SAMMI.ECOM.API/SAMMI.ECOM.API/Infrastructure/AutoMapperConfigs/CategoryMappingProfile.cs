using AutoMapper;
using SAMMI.ECOM.Domain.AggregateModels.AddressCategory;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Commands;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.DomainModels.Auth;
using SAMMI.ECOM.Domain.DomainModels.CategoryAddress;
using SAMMI.ECOM.Domain.DomainModels.Products;

namespace SAMMI.ECOM.API.Infrastructure.AutoMapperConfigs
{
    public class CategoryMappingProfile : Profile
    {
        public CategoryMappingProfile()
        {
            CreateMap<CUProvinceCommand, Province>();
            CreateMap<Province, ProvinceDTO>();

            CreateMap<CUDistrictCommand, District>();
            CreateMap<District, DistrictDTO>();

            CreateMap<CUWardCommand, Ward>();
            CreateMap<Ward, WardDTO>();

            CreateMap<RefreshToken, RefreshTokenDTO>();


            //product
            CreateMap<CUProductCommand, Product>();
            CreateMap<Product, ProductDTO>();

            // image
            CreateMap<CreateImageCommand, Image>();
            CreateMap<Image, ImageDTO>();

            //CreateMap<>();
            //CreateMap<>();
            //CreateMap<>();
            //CreateMap<>();
            //CreateMap<>();
            //CreateMap<>();
        }
    }
}
