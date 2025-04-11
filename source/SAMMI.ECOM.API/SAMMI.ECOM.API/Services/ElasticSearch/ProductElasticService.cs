using Nest;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
using SAMMI.ECOM.Utility;

namespace SAMMI.ECOM.API.Services.ElasticSearch
{
    public interface IProductElasticService
    {
        Task<bool> IsConnected();
        Task<bool> AddOrUpdateProduct(ProductDTO model);
        Task<bool> DeleteProduct(int id);
        Task<bool> DeleteRangeProduct(List<int> ids);
        Task<List<ProductDTO>> SuggestProducts(string keyWord, int? size = 5);
    }
    public class ProductElasticService : IProductElasticService
    {
        private readonly IElasticClient _elasticClient;
        private readonly string _indexName;
        public ProductElasticService(IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
            _indexName = IndexElasticEnum.Product.GetDescription();
        }
        public async Task<bool> AddOrUpdateProduct(ProductDTO model)
        {
            // add suggest input
            model.Suggest = new CompletionField()
            {
                Input = new[]
                {
                    model.Code,
                    model.Name,
                    model.Ingredient,
                    model.Uses,
                    model.UsageGuide,
                    model.BrandName,
                    model.CategoryName
                }.Where(input => !string.IsNullOrEmpty(input)).ToArray()
            };
            var response = await _elasticClient.IndexAsync(model,
                i => i.Index(_indexName)
                    .Id(model.Id)
                    .Refresh(Elasticsearch.Net.Refresh.WaitFor));

            return response.IsValid;
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var exist = await _elasticClient.DocumentExistsAsync<ProductDTO>(id, d => d.Index(_indexName));
            if(!exist.IsValid || !exist.Exists)
            {
                return false;
            }
            var response = await _elasticClient.UpdateAsync<ProductDTO>(id, u => u.Index(_indexName)
                .Doc(new ProductDTO { IsDeleted = true })
                .Refresh(Elasticsearch.Net.Refresh.WaitFor));
            //var response = await _elasticClient.DeleteAsync<ProductDTO>(id, d => d.Index(_indexName));
            return response.IsValid;
        }

        public async Task<bool> DeleteRangeProduct(List<int> ids)
        {
            if(ids == null || !ids.Any())
            {
                return false;
            }

            var bulkRequest = new BulkDescriptor();
            foreach (var id in ids)
            {
                var exist = await _elasticClient.DocumentExistsAsync<ProductDTO>(id, d => d.Index(_indexName));
                if (!exist.IsValid || !exist.Exists)
                {
                    continue;
                }
                bulkRequest.Update<ProductDTO>(u => u
                    .Index(_indexName)
                    .Id(id)
                    .Doc(new ProductDTO { IsDeleted = true })
                    );
            }

            var response = await _elasticClient.BulkAsync(bulkRequest);
            if(!response.IsValid)
            {
                Console.WriteLine($"Bulk delete failed: {response.DebugInformation}");
            }
            return response.IsValid && !response.ItemsWithErrors.Any();
        }

        public async Task<bool> IsConnected()
        {
            var pingResponse = await _elasticClient.PingAsync();
            if (!pingResponse.IsValid)
            {
                Console.WriteLine($"Elasticsearch connection failed: {pingResponse.DebugInformation}");
            }
            return pingResponse.IsValid;
        }

        public async Task<List<ProductDTO>> SuggestProducts(string keyWord, int? size = 5)
        {
            if(string.IsNullOrEmpty(keyWord))
            {
                return new List<ProductDTO>();
            }
            string suggestName = CompletionElasticEnum.SuggestProduct.GetDescription();
            var response = await _elasticClient.SearchAsync<ProductDTO>(s => s
                .Index(_indexName)
                .Query(q => q.Bool(b => b
                    .Must(
                        q => q.Term(t => t.IsActive, true),
                        q => q.Term(t => t.IsDeleted, false),
                        q => q.Range(r => r.Field(f => f.Status).GreaterThan(0)),
                        q => q.Range(r => r.Field(f => f.StockQuantity).GreaterThan(0)),
                        q => q.MultiMatch(m => m.Query(keyWord)
                            .Fields(f => f.Field(p => p.Name)
                                .Field(p => p.Code)
                                .Field(p => p.Ingredient)
                                .Field(p => p.Uses)
                                .Field(p => p.UsageGuide)
                            )
                            .Type(TextQueryType.BestFields)
                        )
                    )
                ))
                .Suggest(su => su
                    .Completion(suggestName, c => c
                        .Field(f => f.Suggest)
                        .Prefix(keyWord)
                        .Size(size)
                        )
                    )
                );

            return response.Hits.Select(h => h.Source).ToList();
        }
    }
}
