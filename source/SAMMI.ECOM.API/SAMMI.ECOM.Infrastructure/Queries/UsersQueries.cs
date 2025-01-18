using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.DomainModels.Users;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Queries
{
    public interface IUsersQueries : IQueryRepository
    {
        Task<IEnumerable<EmployeeDTO>> GetEmployeeAll(RequestFilterModel? filterModel = null);
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
    }
}
