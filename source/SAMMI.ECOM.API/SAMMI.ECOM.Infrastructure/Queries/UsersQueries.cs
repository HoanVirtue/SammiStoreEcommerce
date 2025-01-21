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
        Task<EmployeeDTO> GetEmployeeById(int id);
    }
    public class UsersQueries : QueryRepository<User>, IUsersQueries
    {
        public UsersQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public async Task<IEnumerable<EmployeeDTO>> GetEmployeeAll(RequestFilterModel? filterModel = null)
        {
            return await GetUserAll<EmployeeDTO>(filterModel);
        }

        public async Task<EmployeeDTO> GetEmployeeById(int id)
        {
            return await GetUserById<EmployeeDTO>(id);
        }

        public async Task<IPagedList<EmployeeDTO>> GetEmployeeList(RequestFilterModel filterModel)
        {
            return await GetUserList<EmployeeDTO>(filterModel);
        }

        private Task<IEnumerable<T>> GetUserAll<T>(RequestFilterModel? filterModel = null, TypeUserEnum? type = TypeUserEnum.Employee)
        {
            return WithDefaultTemplateAsync(
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

                    sqlBuilder.Where("t1.Type = @type", new { type = type.ToString() });
                    return conn.QueryAsync<T>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
            );
        }

        private async Task<T> GetUserById<T>(int id, TypeUserEnum? type = TypeUserEnum.Employee)
        {
            return await WithDefaultTemplateAsync(
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


                    sqlBuilder.Where("t1.Type = @type", new { type = type.ToString() });
                    sqlBuilder.Where("t1.Id = @id", new { id = id });
                    return conn.QueryFirstOrDefaultAsync<T>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
            );
        }

        private Task<IPagedList<T>> GetUserList<T>(RequestFilterModel filterModel, TypeUserEnum? type = TypeUserEnum.Employee)
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
                    return conn.QueryAsync<T>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                },
                filterModel);
        }
    }
}
