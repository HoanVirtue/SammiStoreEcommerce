using AutoMapper;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Commands.User;
using SAMMI.ECOM.Domain.DomainModels.Users;

namespace SAMMI.ECOM.API.Infrastructure.AutoMapperConfigs
{
    public class UsersMapperProfile : Profile
    {
        public UsersMapperProfile()
        {
            CreateMap<CreateEmployeeCommand, User>();
            CreateMap<UpdateEmployeeCommand, User>();
            CreateMap<User, EmployeeDTO>();
            CreateMap<User, UserDTO>();

            CreateMap<CUCustomerCommand, User>();
            CreateMap<User, CustomerDTO>();

            CreateMap<CUSupplierCommand, User>();
            CreateMap<User, SupplierDTO>();
        }
    }
}
