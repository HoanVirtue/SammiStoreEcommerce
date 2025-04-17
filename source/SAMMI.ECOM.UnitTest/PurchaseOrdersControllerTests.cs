using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SAMMI.ECOM.API.Controllers.PurcharseOrder;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;

namespace SAMMI.ECOM.UnitTest
{
    public class PurchaseOrdersControllerTests
    {
        private readonly Mock<IPurchaseOrderQueries> _mockPurchaseQueries;
        private readonly Mock<IPurchaseOrderRepository> _mockPurchaseRepository;
        private readonly PurchaseOrdersController _controller;

        public PurchaseOrdersControllerTests()
        {
            _mockPurchaseQueries = new Mock<IPurchaseOrderQueries>();
            _mockPurchaseRepository = new Mock<IPurchaseOrderRepository>();
            _controller = new PurchaseOrdersController(
                _mockPurchaseQueries.Object,
                _mockPurchaseRepository.Object,
                null, // Mediator
                null  // Logger
            );
        }

        [Fact]
        public async Task GetsAsync_TypeIsGrid_ReturnsPurchaseOrderList()
        {
            // Arrange
            var request = new RequestFilterModel { Type = RequestType.Grid };
            var mockPurchaseOrderList = new Mock<IPagedList<PurchaseOrderDTO>>();
            mockPurchaseOrderList.Setup(m => m.Subset).Returns(new List<PurchaseOrderDTO>
            {
                new PurchaseOrderDTO { Code = "PO001", Status = "Pending" },
                new PurchaseOrderDTO { Code = "PO002", Status = "Completed" },
            });
            _mockPurchaseQueries.Setup(q => q.GetList(request))
                .ReturnsAsync(mockPurchaseOrderList.Object);

            // Act
            var result = await _controller.GetsAsync(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnPurchases = Assert.IsAssignableFrom<IPagedList<PurchaseOrderDTO>>(response.Result);
            Assert.Equal(2, returnPurchases.Subset.Count());
            Assert.Equal("PO001", returnPurchases.Subset.First().Code);
            Assert.Equal("PO002", returnPurchases.Subset.Last().Code);

            _mockPurchaseQueries.Verify(q => q.GetList(request), Times.Once);
        }

        [Fact]
        public async Task GetAsync_ReturnsBadRequest_WhenPurchaseOrderDoesNotExist()
        {
            int id = 1;
            _mockPurchaseRepository.Setup(r => r.IsExisted(id)).Returns(false);
            var result = await _controller.GetAsync(id);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<EndPointResponse>(badRequestResult.Value);
            Assert.Equal("Mã đơn nhập không tồn tại", response.Message);
        }

        [Fact]
        public async Task GetAsync_ReturnsOkWithPurchaseOrder_WhenPurchaseOrderExists()
        {
            int id = 1;
            var purchaseOrder = new PurchaseOrderDTO { Id = id, EmployeeId = 123, SupplierId = 456 };

            _mockPurchaseRepository.Setup(r => r.IsExisted(id)).Returns(true);
            _mockPurchaseQueries.Setup(q => q.GetPurchaseOrder(id)).ReturnsAsync(purchaseOrder);

            var result = await _controller.GetAsync(id);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnPurchases = Assert.IsType<PurchaseOrderDTO>(response.Result);
            Assert.Equal(id, 1);
            Assert.Equal(123, returnPurchases.EmployeeId);
            Assert.Equal(456, returnPurchases.SupplierId);
        }
    }
}
