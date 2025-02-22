using Dapper;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Domain.GlobalModels.Common;
using SAMMI.ECOM.Repository.GenericRepositories;
using SAMMI.ECOM.Utility;

namespace SAMMI.ECOM.Infrastructure.Queries.Products
{
    public interface IProductQueries : IQueryRepository
    {
        Task<IPagedList<ProductDTO>> GetList(RequestFilterModel filterModel);
        Task<IEnumerable<SelectionItem>> GetSelectionList(RequestFilterModel? request);
        Task<ProductDTO> GetById(int id);
        Task<IEnumerable<ProductDTO>> GetAll(RequestFilterModel? filterModel = null);
        Task<string?> GetCodeByLastId(CodeEnum? type = CodeEnum.Product);
    }
    public class ProductQueries : QueryRepository<Product>, IProductQueries
    {
        public ProductQueries(SammiEcommerceContext context) : base(context)
        {
        }

        public Task<IEnumerable<ProductDTO>> GetAll(RequestFilterModel? filterModel = null)
        {
            return WithDefaultTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    var productDirectory = new Dictionary<int, ProductDTO>();
                    sqlBuilder.Select("t3.Id AS ImageId, t3.PublicId, t3.TypeImage, t3.ImageUrl, t3.DisplayOrder");

                    sqlBuilder.LeftJoin("ProductImage t2 ON t1.Id = t2.ProductId AND t2.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Image t3 ON t2.ImageId = t3.Id AND t3.IsDeleted != 1");
                    return conn.QueryAsync<ProductDTO, ImageDTO, ProductDTO>(
                        sqlTemplate.RawSql,
                        (product, image) =>
                        {
                            if (!productDirectory.TryGetValue(product.Id, out var productEntry))
                            {
                                productEntry = product;
                                productEntry.Images = new List<ImageDTO>();
                                // format currency
                                productEntry.OldPrice = Math.Round(productEntry.OldPrice ?? 0, 2);
                                productEntry.NewPrice = Math.Round(productEntry.NewPrice, 2);
                                productDirectory.Add(product.Id, productEntry);
                            }
                            if (image != null)
                            {
                                product.Images ??= new();
                                productEntry.Images.Add(image);
                            }

                            return productEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "ImageId");
                }, filterModel
            );
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
                    sqlBuilder.Select("t3.Id AS ImageId, t3.PublicId, t3.TypeImage, t3.ImageUrl, t3.DisplayOrder");

                    sqlBuilder.LeftJoin("ProductImage t2 ON t1.Id = t2.ProductId AND t2.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Image t3 ON t2.ImageId = t3.Id AND t3.IsDeleted != 1");
                    return conn.QueryAsync<ProductDTO, ImageDTO, ProductDTO>(
                        sqlTemplate.RawSql,
                        (product, image) =>
                        {
                            if (!productDirectory.TryGetValue(product.Id, out var productEntry))
                            {
                                productEntry = product;
                                productEntry.Images = new List<ImageDTO>();
                                // format currency
                                productEntry.OldPrice = Math.Round(productEntry.OldPrice ?? 0, 2);
                                productEntry.NewPrice = Math.Round(productEntry.NewPrice, 2);
                                productDirectory.Add(product.Id, productEntry);
                            }
                            if (image != null)
                            {
                                product.Images ??= new();
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

        public async Task<string?> GetCodeByLastId(CodeEnum? type = CodeEnum.Product)
        {
            int idLast = 0;
            string code = type.GetDescription();
            idLast = await WithDefaultNoSelectTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    sqlBuilder.Select("CASE WHEN MAX(t1.Id) IS NOT NULL THEN  MAX(t1.Id) ELSE 0 END");
                    sqlBuilder.OrderDescBy("t1.Id");

                    return await conn.QueryFirstOrDefaultAsync<int>(sqlTemplate.RawSql, sqlTemplate.Parameters);
                }
                );

            return $"{code}{(idLast + 1).ToString("D6")}";
        }
    }
}
