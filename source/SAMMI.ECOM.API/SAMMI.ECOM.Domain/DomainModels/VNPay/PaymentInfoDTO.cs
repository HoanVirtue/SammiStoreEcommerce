﻿namespace SAMMI.ECOM.Domain.DomainModels.VNPay
{
    public class PaymentInfoDTO
    {
        public int UserId { get; set; }
        public int OrderId { get; set; }
        public string OrderType { get; set; }
        public double Amount { get; set; }
        public string OrderDescription { get; set; }
        public string Name { get; set; }
    }
}
