using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.GlobalModels.Common;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Queries.Products
{
    public interface IProductQueries : IQueryRepository
    {
        Task<IPagedList<ProductDTO>> GetList(RequestFilterModel filterModel);
        Task<IEnumerable<SelectionItem>> GetSelectionList(RequestFilterModel? request);
        Task<ProductDTO> GetById(int id);
    }
    public class ProductQueries : QueryRepository<Product>, IProductQueries
    {
        public ProductQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public async Task<ProductDTO> GetById(int id)
        {
            return await WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Where("t1.Id = @id", new { id });
                    return conn.QueryFirstOrDefaultAsync<ProductDTO>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
            );
        }

        public Task<IPagedList<ProductDTO>> GetList(RequestFilterModel filterModel)
        {
            return WithPagingTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    var productDirectory = new Dictionary<int, ProductDTO>();

                    sqlBuilder.Select("t2.Id AS ImageId, t2.ProductId, t2.ImageUrl, t2.DisplayOrder");

                    sqlBuilder.LeftJoin("ProductImage t2 ON t1.Id = t2.ProductId AND t2.IsDeleted != 1");
                    return conn.QueryAsync<ProductDTO, ProductImageDTO, ProductDTO>(
                        sqlTemplate.RawSql,
                        (product, image) =>
                        {
                            if (!productDirectory.TryGetValue(product.Id, out var productEntry))
                            {
                                productEntry = product;
                                productEntry.Images = new List<ProductImageDTO>();
                                productDirectory.Add(product.Id, productEntry);
                            }

                            if (image != null)
                            {
                                productEntry.Images ??= new();
                                productEntry.Images.Add(image);
                            }

                            return productEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "ImageId");
                },
                filterModel);
        }

        public Task<IEnumerable<SelectionItem>> GetSelectionList(RequestFilterModel? request)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("t1.Id as Value");
                    sqlBuilder.Select("t1.Name as Text");

                    return conn.QueryAsync<SelectionItem>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }, request
            );
        }
    }
}
