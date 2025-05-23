﻿using MediatR;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands.Products;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;

namespace SAMMI.ECOM.Domain.Commands.OrderBuy
{
    public class CUReviewCommand : IRequest<ActionResponse<ReviewDTO>>
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Rating { get; set; }
        public string? Comment { get; set; }
        public int? ImageId { get; set; }
        public CreateImageCommand? ImageCommand { get; set; }

        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
        public int? DisplayOrder { get; set; }
    }
}
