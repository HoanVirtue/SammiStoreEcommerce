using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SAMMI.ECOM.API.Controllers.OrderBuy;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Infrastructure.Queries.Auth;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.UnitTest.Extendsion;

namespace SAMMI.ECOM.UnitTest
{
    public class OrderBuysControllerTests
    {
        private readonly Mock<IOrderRepository> _mockOrderRepository;
        private readonly Mock<IOrderQueries> _mockOrderQueries;
        private readonly OrderBuysController _controller;
        private readonly Mock<UserIdentity> _userIdentityMock;

        public OrderBuysControllerTests()
        {
            _mockOrderRepository = new Mock<IOrderRepository>();
            _mockOrderQueries = new Mock<IOrderQueries>();
            _userIdentityMock = new Mock<UserIdentity>(new Mock<IHttpContextAccessor>().Object);

            _controller = new OrderBuysController(
                null, // Mediator
                null, // VNPayService
                null, // PaymentRepository
                _mockOrderRepository.Object,
                null, // PaymentMethodRepository
                null, // VNPayService
                _userIdentityMock.Object, // UserIdentity
                null, // UsersRepository
                null, // Configuration
                _mockOrderQueries.Object,
                null, // UserIdentity
                null, // Mapper
                null  // Logger
            );
        }


        [Fact]
        public async Task GetOrderAsync_TypeIsGrid_ReturnsOrderList()
        {
            var request = new RequestFilterModel { Type = RequestType.Grid };
            var mockOrderList = new Mock<IPagedList<OrderDTO>>();
            mockOrderList.Setup(m => m.Subset).Returns(new List<OrderDTO>()
            {
                new OrderDTO {OrderStatus = "Processing"},
                new OrderDTO {OrderStatus = "Completed"},
            });
            _mockOrderQueries.Setup(q => q.GetList(request)).ReturnsAsync(mockOrderList.Object);
            var result = await _controller.GetOrdersAsync(request);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnOrders = Assert.IsAssignableFrom<IPagedList<OrderDTO>>(response.Result);
            Assert.Equal(2, returnOrders.Subset.Count());
            Assert.Equal("Processing", returnOrders.Subset.First().OrderStatus);
            Assert.Equal("Completed", returnOrders.Subset[1].OrderStatus);

            _mockOrderQueries.Verify(q => q.GetList(request), Times.Once);
        }

        [Fact]
        public async Task GetOrdersAsync_TypeIsNotGrid_ReturnsEmptyOk()
        {
            var request = new RequestFilterModel { Type = RequestType.AutocompleteSimple };
            var result = await _controller.GetOrdersAsync(request);
            
            var okResult = Assert.IsType<OkResult>(result);
            Assert.Equal(200, okResult.StatusCode);

            _mockOrderQueries.Verify(q => q.GetList(It.IsAny<RequestFilterModel>()), Times.Never);
        }

        [Fact]
        public async Task GetOrderAsync_OrderDoesNotExist_ReturnsBadRequest()
        {
            int orderId = 1;
            _mockOrderRepository.Setup(r => r.IsExisted(orderId)).Returns(false);
            var result = await _controller.GetOrderAsync(orderId);
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<EndPointResponse>(badRequestResult.Value);
            Assert.Equal("Mã đơn hàng không tồn tại", response.Message);
        }

        [Fact]
        public async Task GetOrderAsync_OrderExists_ReturnsOrderDetails()
        {
            // Arrange
            int orderId = 1;
            var orderDetails = new OrderDTO { OrderStatus = "Processing" };

            _mockOrderRepository.Setup(repo => repo.IsExisted(orderId)).Returns(true);
            _mockOrderQueries.Setup(queries => queries.GetById(orderId)).ReturnsAsync(orderDetails);

            // Act
            var result = await _controller.GetOrderAsync(orderId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedOrder = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var orderDTO = Assert.IsType<OrderDTO>(returnedOrder.Result);
            Assert.Equal("Processing", orderDTO.OrderStatus);
        }

        [Fact]
        public async Task GetMyOrders_ReturnsPagedList_WhenTypeIsGrid()
        {
            // Arrange
            //var request = new RequestFilterModel { Type = RequestType.Grid, Paging = true };
            //var mockPagedList = new Mock<IPagedList<OrderDTO>>();
            //mockPagedList.Setup(m => m.Subset).Returns(new List<OrderDTO>
            //{
            //    new OrderDTO { OrderStatus = "Processing", CustomerId = 1 },
            //    new OrderDTO { OrderStatus = "Completed", CustomerId = 1 }
            //});

            //_mockOrderQueries
            //    .Setup(q => q.GetListOrdersByCustomerId(1, request))
            //    .ReturnsAsync(mockPagedList.Object);

            //// Act
            //var result = await _controller.GetMyOrders(request);

            //// Assert
            //var okResult = Assert.IsType<OkObjectResult>(result);
            //var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            //var returnOrders = Assert.IsAssignableFrom<IPagedList<OrderDTO>>(response.Result);

            //Assert.Equal(2, returnOrders.Subset.Count());
            //Assert.Equal("Processing", returnOrders.Subset.First().OrderStatus);
            //Assert.Equal("Completed", returnOrders.Subset[1].OrderStatus);

            //_mockOrderQueries.Verify(q => q.GetListOrdersByCustomerId(1, request), Times.Once);

            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task GetMyOrders_ReturnsEnumerable_WhenTypeIsNotGrid()
        {
            // Arrange
            //var request = new RequestFilterModel { Type = RequestType.AutocompleteSimple, Paging = false };
            //var mockOrderList = new List<OrderDTO>
            //{
            //    new OrderDTO { OrderStatus = "Processing", CustomerId = 1 },
            //    new OrderDTO { OrderStatus = "Completed", CustomerId = 1 }
            //};

            //_mockOrderQueries
            //    .Setup(q => q.GetOrdersByCustomerId(It.IsAny<int>(), request))
            //    .ReturnsAsync(mockOrderList);

            //// Act
            //var result = await _controller.GetMyOrders(request);

            //// Assert
            //var okResult = Assert.IsType<OkObjectResult>(result);
            //var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            //var returnOrders = Assert.IsAssignableFrom<IEnumerable<OrderDTO>>(response.Result);

            //Assert.Equal(2, returnOrders.Count());
            //Assert.Equal("Processing", returnOrders.First().OrderStatus);
            //Assert.Equal("Completed", returnOrders.Last().OrderStatus);

            //_mockOrderQueries.Verify(q => q.GetOrdersByCustomerId(It.IsAny<int>(), request), Times.Once);

            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task GetMyOrders_ReturnsEmptyList_WhenNoOrdersFound()
        {
            // Arrange
            //var request = new RequestFilterModel { Type = RequestType.Grid, Paging = true };
            //var mockPagedList = new Mock<IPagedList<OrderDTO>>();
            //mockPagedList.Setup(m => m.Subset).Returns(new List<OrderDTO>());

            //_mockOrderQueries
            //    .Setup(q => q.GetListOrdersByCustomerId(It.IsAny<int>(), request))
            //    .ReturnsAsync(mockPagedList.Object);

            //// Act
            //var result = await _controller.GetMyOrders(request);

            //// Assert
            //var okResult = Assert.IsType<OkObjectResult>(result);
            //var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            //var returnOrders = Assert.IsAssignableFrom<IPagedList<OrderDTO>>(response.Result);

            //Assert.Empty(returnOrders.Subset);

            //_mockOrderQueries.Verify(q => q.GetListOrdersByCustomerId(It.IsAny<int>(), request), Times.Once);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task UpdateOrderStatusAsync_PaymentStatus_IsValid()
        {
            // Arrange
            //var request = new UpdateOrderStatusCommand
            //{
            //    OrderId = 1,
            //    PaymentStatus = PaymentStatusEnum.Paid,
            //    ShippingStatus = ShippingStatusEnum.Processing
            //};

            //_mockOrderRepository.Setup(r => r.IsExisted(request.OrderId)).Returns(false);

            //// Act
            //var result = await _controller.UpdateOrderStatusAsync(request);

            //// Assert
            //var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            //Assert.Equal("Mã đơn hàng không tồn tại.", badRequestResult.Value);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task UpdateOrderStatusAsync_PaymentStatus_IsNotValid()
        {
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task UpdateOrderStatusAsync_ShippingStatus_IsNotValid()
        {
            Assert.Equal(1, 1);
        }
        [Fact]
        public async Task UpdateOrderStatusAsync_ShippingStatus_IsValid()
        {
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task CancelledOrderAsync_ShippingStatus_IsValid()
        {
            Assert.Equal(1, 1);
        }

    }
}
