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
                    sqlBuilder.Select("t3.Id, t3.PublicId, t3.TypeImage, t3.ImageUrl, t3.DisplayOrder");
                    sqlBuilder.Select("t4.Code AS CategoryCode, t4.Name AS CategoryName");
                    sqlBuilder.Select("t5.Code AS BrandCode, t5.Name AS BrandName");

                    sqlBuilder.LeftJoin("ProductImage t2 ON t1.Id = t2.ProductId AND t2.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Image t3 ON t2.ImageId = t3.Id AND t3.IsDeleted != 1");
                    sqlBuilder.LeftJoin("ProductCategory t4 ON t1.CategoryId = t4.Id AND t4.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Brand t5 ON t1.BrandId = t5.Id AND t5.IsDeleted != 1");
                    return conn.QueryAsync<ProductDTO, ImageDTO, string?, string?, string?, string?, ProductDTO>(
                        sqlTemplate.RawSql,
                        (product, image, categoryCode, categoryName, brandCode, brandName) =>
                        {
                            //Console.WriteLine($"Category: {category?.CategoryCode}, Brand: {brand?.BrandCode}");
                            if (!productDirectory.TryGetValue(product.Id, out var productEntry))
                            {
                                productEntry = product;
                                productEntry.CategoryCode = categoryCode;
                                productEntry.CategoryName = categoryName;
                                productEntry.BrandCode = brandCode;
                                productEntry.BrandName = brandName;
                                productEntry.Images = new List<ImageDTO>();
                                // format currency
                                if ((productEntry.StartDate != null && productEntry.EndDate != null) && (productEntry.StartDate <= DateTime.Now && productEntry.EndDate >= DateTime.Now))
                                    productEntry.NewPrice = Math.Round((decimal)(productEntry.Price * (1 - productEntry.Discount)), 2);
                                else
                                    productEntry.NewPrice = Math.Round(productEntry.Price ?? 0, 2);
                                productDirectory.Add(product.Id, productEntry);
                            }
                            if (image != null && productEntry.Images.All(i => i.Id != image.Id))
                            {
                                productEntry.Images ??= new();
                                productEntry.Images.Add(image);
                            }

                            return productEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id,Id,CategoryCode,CategoryName,BrandCode,BrandName");
                }
            );
        }

        public async Task<ProductDTO> GetById(int id)
        {
            return await WithDefaultTemplateAsync(
                async (conn, sqlBuilder, sqlTemplate) =>
                {
                    var productDirectory = new Dictionary<int, ProductDTO>();
                    sqlBuilder.Select("t3.Id, t3.PublicId, t3.TypeImage, t3.ImageUrl, t3.DisplayOrder");
                    sqlBuilder.Select("t4.Code AS CategoryCode, t4.Name AS CategoryName");
                    sqlBuilder.Select("t5.Code AS BrandCode, t5.Name AS BrandName");

                    sqlBuilder.LeftJoin("ProductImage t2 ON t1.Id = t2.ProductId AND t2.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Image t3 ON t2.ImageId = t3.Id AND t3.IsDeleted != 1");
                    sqlBuilder.LeftJoin("ProductCategory t4 ON t1.CategoryId = t4.Id AND t4.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Brand t5 ON t1.BrandId = t5.Id AND t5.IsDeleted != 1");

                    sqlBuilder.Where("t1.Id = @id", new { id });
                    var products = await conn.QueryAsync<ProductDTO, ImageDTO, string?, string?, string?, string?, ProductDTO>(
                        sqlTemplate.RawSql,
                        (product, image, categoryCode, categoryName, brandCode, brandName) =>
                        {
                            if (!productDirectory.TryGetValue(product.Id, out var productEntry))
                            {
                                productEntry = product;
                                productEntry.CategoryCode = categoryCode;
                                productEntry.CategoryName = categoryName;
                                productEntry.BrandCode = brandCode;
                                productEntry.BrandName = brandName;
                                productEntry.Images = new List<ImageDTO>();
                                // format currency
                                if ((productEntry.StartDate != null && productEntry.EndDate != null) && (productEntry.StartDate <= DateTime.Now && productEntry.EndDate >= DateTime.Now))
                                    productEntry.NewPrice = Math.Round((decimal)(productEntry.Price * (1 - productEntry.Discount)), 2);
                                else
                                    productEntry.NewPrice = Math.Round(productEntry.Price ?? 0, 2);
                                productDirectory.Add(product.Id, productEntry);
                            }
                            if (image != null && productEntry.Images.All(i => i.Id != image.Id))
                            {
                                productEntry.Images ??= new();
                                productEntry.Images.Add(image);
                            }

                            return productEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id,Id,CategoryCode,CategoryName,BrandCode,BrandName");
                    return products.FirstOrDefault();
                }
            );
        }

        public Task<IPagedList<ProductDTO>> GetList(RequestFilterModel filterModel)
        {
            return WithPagingTemplateAsync(
                (conn, sqlBuilder, sqlTemplate) =>
                {
                    var productDirectory = new Dictionary<int, ProductDTO>();
                    sqlBuilder.Select("t3.Id, t3.PublicId, t3.TypeImage, t3.ImageUrl, t3.DisplayOrder");
                    sqlBuilder.Select("t4.Code AS CategoryCode, t4.Name AS CategoryName");
                    sqlBuilder.Select("t5.Code AS BrandCode, t5.Name AS BrandName");

                    sqlBuilder.LeftJoin("ProductImage t2 ON t1.Id = t2.ProductId AND t2.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Image t3 ON t2.ImageId = t3.Id AND t3.IsDeleted != 1");
                    sqlBuilder.LeftJoin("ProductCategory t4 ON t1.CategoryId = t4.Id AND t4.IsDeleted != 1");
                    sqlBuilder.LeftJoin("Brand t5 ON t1.BrandId = t5.Id AND t5.IsDeleted != 1");
                    return conn.QueryAsync<ProductDTO, ImageDTO, string?, string?, string?, string?, ProductDTO>(
                        sqlTemplate.RawSql,
                        (product, image, categoryCode, categoryName, brandCode, brandName) =>
                        {
                            //Console.WriteLine($"Category: {category?.CategoryCode}, Brand: {brand?.BrandCode}");
                            if (!productDirectory.TryGetValue(product.Id, out var productEntry))
                            {
                                productEntry = product;
                                productEntry.CategoryCode = categoryCode;
                                productEntry.CategoryName = categoryName;
                                productEntry.BrandCode = brandCode;
                                productEntry.BrandName = brandName;
                                productEntry.Images = new List<ImageDTO>();
                                // format currency
                                if ((productEntry.StartDate != null && productEntry.EndDate != null) && (productEntry.StartDate <= DateTime.Now && productEntry.EndDate >= DateTime.Now))
                                    productEntry.NewPrice = Math.Round((decimal)(productEntry.Price * (1 - productEntry.Discount)), 2);
                                else
                                    productEntry.NewPrice = Math.Round(productEntry.Price ?? 0, 2);
                                productDirectory.Add(product.Id, productEntry);
                            }
                            if (image != null && productEntry.Images.All(i => i.Id != image.Id))
                            {
                                productEntry.Images ??= new();
                                productEntry.Images.Add(image);
                            }

                            return productEntry;
                        },
                        sqlTemplate.Parameters,
                        splitOn: "Id,Id,CategoryCode,CategoryName,BrandCode,BrandName");
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
