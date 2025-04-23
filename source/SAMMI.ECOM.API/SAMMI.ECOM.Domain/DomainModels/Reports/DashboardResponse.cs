using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAMMI.ECOM.Domain.DomainModels.Reports
{
    public class DashboardResponse
    {
        public decimal? TotalRevenue { get; set; }
        public int? TotalCustomer { get; set; }
        public NumberOfOrders? NumberOrder { get; set; }
    }

    public class NumberOfOrders
    {
        public int? TotalOrder { get; set; }
        public int TotalPending { get; set; }
        public int TotalCompleted { get; set; }
        public int TotalCancelled { get; set; }
    }
}
