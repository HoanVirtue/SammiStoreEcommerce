using Nest;
using SAMMI.ECOM.Domain.DomainModels.Products;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Utility;

namespace SAMMI.ECOM.API.Services.ElasticSearch
{
    public interface IProductElasticService
    {
        Task<bool> IsConnected();
        Task<bool> AddOrUpdateProduct(ProductDTO model);
        Task<bool> DeleteProduct(int id);
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
                Input = new[] { model.Code, model.Name, model.Ingredient, model.Uses, model.UsageGuide, model.BrandName, model.CategoryName }
            };
            var response = await _elasticClient.IndexAsync(model,
                i => i.Index(_indexName)
                    .Id(model.Id)
                    .Refresh(Elasticsearch.Net.Refresh.WaitFor));

            return response.IsValid;
        }

        public async Task<bool> DeleteProduct(int id)
        {
            var response = await _elasticClient.DeleteAsync<ProductDTO>(id, d => d.Index(_indexName));

            return response.IsValid;
        }

        public async Task<bool> IsConnected()
        {
            var pingResponse = await _elasticClient.PingAsync();
            return pingResponse.IsValid;
        }

        public async Task<List<ProductDTO>> SuggestProducts(string keyWord, int? size = 5)
        {
            string suggestName = CompletionElasticEnum.SuggestProduct.GetDescription();
            var response = await _elasticClient.SearchAsync<ProductDTO>(s => s
                .Index(_indexName)
                .Query(q => q.Bool(b => b
                    .Must(
                        q => q.Term(t => t.IsActive, true),
                        q => q.Term(t => t.IsDeleted, false)
                        )
                    )
                )
                .Suggest(su => su
                    .Completion(suggestName, c => c
                        .Field(f => f.Suggest)
                        .Prefix(keyWord)
                        .Size(size)
                        )
                    )
                );

            return response.Suggest[suggestName]
                .SelectMany(s => s.Options)
                .Select(o => o.Source)
                .ToList();
        }
    }
}
