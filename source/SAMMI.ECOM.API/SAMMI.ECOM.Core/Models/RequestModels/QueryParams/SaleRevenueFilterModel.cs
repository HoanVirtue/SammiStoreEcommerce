using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAMMI.ECOM.Core.Models.RequestModels.QueryParams
{
    public class SaleRevenueFilterModel : RequestFilterModel
    {
        //public int? Year { get; set; }
        //public int? Month { get; set; }
        //public int? Quarter { get; set; }
        //public int? Week { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int? PaymentMethodId { get; set; }
    }
}
