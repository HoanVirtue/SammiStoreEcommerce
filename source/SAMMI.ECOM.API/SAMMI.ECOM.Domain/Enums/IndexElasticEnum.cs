using System.ComponentModel;

namespace SAMMI.ECOM.Domain.Enums
{
    public enum IndexElasticEnum
    {
        [Description("products")]
        Product,
    }

    public enum CompletionElasticEnum
    {
        [Description("products-suggest")]
        SuggestProduct
    }
}
