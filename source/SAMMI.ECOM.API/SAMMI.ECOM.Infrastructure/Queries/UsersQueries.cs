using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.DomainModels.Auth;
using SAMMI.ECOM.Domain.DomainModels.Users;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;
using SAMMI.ECOM.Utility;
using System.Data;

namespace SAMMI.ECOM.Infrastructure.Queries
{
    public interface IUsersQueries : IQueryRepository
    {
        Task<IEnumerable<EmployeeDTO>> GetEmployeeAll(RequestFilterModel? filterModel = null);
        Task<IPagedList<EmployeeDTO>> GetEmployeeList(RequestFilterModel filterModel);
        Task<EmployeeDTO> GetEmployeeById(int id);
        EmployeeDTO FindByUsername(string username);
        EmployeeDTO FindById(int id);
        Task<IEnumerable<PermissionDTO>> GetPermissionOfUser(int userId);

        Task<IEnumerable<CustomerDTO>> GetCustomerAll(RequestFilterModel? filterModel = null);
        Task<IPagedList<CustomerDTO>> GetCustomerList(RequestFilterModel filterModel);
        Task<CustomerDTO> GetCustomerById(int id);

        Task<IEnumerable<SupplierDTO>> GetSupplierAll(RequestFilterModel? filterModel = null);
        Task<IPagedList<SupplierDTO>> GetSupplierList(RequestFilterModel filterModel);
        Task<SupplierDTO> GetSupplierById(int id);

        Task<string?> GetCodeByLastId(CodeEnum? type = CodeEnum.Employee);
    }
    public class UsersQueries : QueryRepository<User>, IUsersQueries
    {
        public UsersQueries(SammiEcommerceContext context) : base(context)
        {
        }

        private EmployeeDTO Find(int? id = null, string? username = null, string? email = null, TypeUserEnum? type = TypeUserEnum.Employee)
        {
            var cached = new Dictionary<int, EmployeeDTO>();
            return WithDefaultTemplate(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.LeftJoin("UserRole t2 ON t1.Id = t2.UserId AND t2.IsDeleted != 1");

                    sqlBuilder.Select("t2.RoleId AS RoleId");

                    sqlBuilder.Where("t1.Type = @type", new { type = type.ToString() });
                    if (id.HasValue)
                    {
                        sqlBuilder.Where("t1.Id = @id", new { id });
                    }
                    else if (!string.IsNullOrEmpty(username))
                    {
                        sqlBuilder.Where("LOWER(t1.Username) = LOWER(@username)", new { username });
                    }
                    else if (!string.IsNullOrEmpty(email))
                    {
                        sqlBuilder.Where("LOWER(t1.Email) = LOWER(@email)", new { email });
                    }

                    var query = conn.Query<EmployeeDTO, int, EmployeeDTO>(
                        sqlTemplate.RawSql,
                        (user, roleId) =>
                        {
                            if (!cached.TryGetValue(user.Id, out var userModel))
                            {
                                userModel = user;
                                cached.Add(user.Id, userModel);
                            }

                            if (roleId != null && roleId > 0 && (userModel.RoleIds.All(x => x != roleId)))
                            {
                                userModel.RoleIds ??= new();
                                userModel.RoleIds.Add(roleId);
                            }
                            return userModel;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "RoleId");

                    return query.FirstOrDefault();
                });
        }

        public EmployeeDTO FindById(int id)
        {
            return Find(id: id);
        }

        public EmployeeDTO FindByUsername(string username)
        {
            var employee = Find(username: username);
            if (employee == null)
            {
                employee = Find(email: username);
            }
            return employee;
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

                    sqlBuilder.Where("t1.Type = @type", new { type = type.ToString() });
                    return conn.QueryAsync<T>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                },
                filterModel);
        }

        public Task<IEnumerable<PermissionDTO>> GetPermissionOfUser(int userId)
        {
            return WithConnectionAsync(conn => conn.QueryAsync<PermissionDTO>(@"
                SELECT
                t1.UserId,
                t2.Id AS RoleId, t2.Name AS RoleName,
                t3.Allow,
                t4.Id AS PermissionId, t4.Name AS PermissionName
                FROM userrole t1
                LEFT JOIN role t2 ON t1.RoleId = t2.Id AND t2.IsDeleted != 1 AND t2.IsActive = 1
                LEFT JOIN rolepermission t3 ON t2.Id = t3.RoleId AND t3.IsDeleted != 1
                LEFT JOIN permission t4 on t3.PermissionId = t4.Id AND t4.IsDeleted != 1
                WHERE t1.IsDeleted != 1
                AND t1.UserId = @userId
            ",
            new { userId },
            commandType: CommandType.Text));
        }

        public async Task<IEnumerable<CustomerDTO>> GetCustomerAll(RequestFilterModel? filterModel = null)
        {
            return await GetUserAll<CustomerDTO>(filterModel, TypeUserEnum.Customer);
        }

        public async Task<IPagedList<CustomerDTO>> GetCustomerList(RequestFilterModel filterModel)
        {
            return await GetUserList<CustomerDTO>(filterModel, TypeUserEnum.Customer);
        }

        public async Task<CustomerDTO> GetCustomerById(int id)
        {
            return await GetUserById<CustomerDTO>(id, TypeUserEnum.Customer);
        }

        public async Task<IEnumerable<SupplierDTO>> GetSupplierAll(RequestFilterModel? filterModel = null)
        {
            return await GetUserAll<SupplierDTO>(filterModel, TypeUserEnum.Supplier);
        }

        public async Task<IPagedList<SupplierDTO>> GetSupplierList(RequestFilterModel filterModel)
        {
            return await GetUserList<SupplierDTO>(filterModel, TypeUserEnum.Supplier);
        }

        public async Task<SupplierDTO> GetSupplierById(int id)
        {
            return await GetUserById<SupplierDTO>(id, TypeUserEnum.Supplier);
        }

        public async Task<string?> GetCodeByLastId(CodeEnum? type = CodeEnum.Employee)
        {
            int idLast = 0;
            if (type != CodeEnum.Employee &&
                type != CodeEnum.Customer &&
                type != CodeEnum.Supplier)
                return null;
            string code = type.GetDescription();
            idLast = await WithDefaultNoSelectTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("CASE WHEN MAX(t1.Id) IS NOT NULL THEN  MAX(t1.Id) ELSE 0 END");
                    sqlBuilder.OrderDescBy("t1.Id");

                    sqlBuilder.Where("t1.Type = @type", new { type = type.ToString() });
                    return await conn.QueryFirstOrDefaultAsync<int>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
                );

            return $"{code}{(idLast + 1).ToString("D6")}";
        }
    }
}
