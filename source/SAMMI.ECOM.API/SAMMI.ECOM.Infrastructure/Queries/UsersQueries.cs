using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.DomainModels.Users;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Queries
{
    public interface IUsersQueries : IQueryRepository
    {
        Task<IEnumerable<EmployeeDTO>> GetEmployeeAll(RequestFilterModel? filterModel = null);
        Task<IPagedList<EmployeeDTO>> GetEmployeeList(RequestFilterModel filterModel);
    }
    public class UsersQueries : QueryRepository<User>, IUsersQueries
    {
        public UsersQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public Task<IEnumerable<EmployeeDTO>> GetEmployeeAll(RequestFilterModel? filterModel = null)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Where("t1.Type = @type", new { type = TypeUserEnum.Employee });
                    return conn.QueryAsync<EmployeeDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
            );
        }

        public Task<IPagedList<EmployeeDTO>> GetEmployeeList(RequestFilterModel filterModel)
        {
            return WithPagingTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.LeftJoin("Ward t2 ON t1.WardId = t2.Id AND t2.IsDeleted = 0");
                    sqlBuilder.LeftJoin("District t3 ON t2.DistrictId = t3.Id AND t3.IsDeleted = 0");
                    sqlBuilder.LeftJoin("Province t4 ON t3.ProvinceId = t4.Id AND t4.IsDeleted = 0");

                    sqlBuilder.Select("t2.Name AS WardName");
                    sqlBuilder.Select("t3.Id AS DistrictId");
                    sqlBuilder.Select("t3.Name AS DistrictName");
                    sqlBuilder.Select("t4.Id AS ProvinceId");
                    sqlBuilder.Select("t4.Name AS ProvinceName");
                    return conn.QueryAsync<EmployeeDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                },
                filterModel);
        }
    }
}
