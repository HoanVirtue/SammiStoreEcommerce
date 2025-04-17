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
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
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

        public OrderBuysControllerTests()
        {
            _mockOrderRepository = new Mock<IOrderRepository>();
            _mockOrderQueries = new Mock<IOrderQueries>();

            //var claims = new List<Claim>
            //{
            //    new Claim(GlobalClaimsTypes.LocalId, "1"),
            //    new Claim(ClaimTypes.Name, "Test User"),
            //    new Claim("Permission", "ViewOrders")
            //};
            //var claimsIdentity = new ClaimsIdentity(claims);
            //var httpContextAccessor = new Mock<IHttpContextAccessor>();
            //httpContextAccessor.Setup(h => h.HttpContext.User).Returns(new ClaimsPrincipal(claimsIdentity));

            //var userIdentity = new UserIdentity
            //{
            //    Id = 1,
            //    UserName = "Test User",
            //    Permissions = new[] { "ViewOrders" }
            //};

            // Khởi tạo controller với các dependency đã mock
            _controller = new OrderBuysController(
                null, // Mediator
                null, // VNPayService
                null, // PaymentRepository
                _mockOrderRepository.Object,
                null, // PaymentMethodRepository
                null, // VNPayService
                null, // UserIdentity
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
            var request = new RequestFilterModel { Type = RequestType.Grid, Paging = true };
            var mockPagedList = new Mock<IPagedList<OrderDTO>>();
            mockPagedList.Setup(m => m.Subset).Returns(new List<OrderDTO>
            {
                new OrderDTO { OrderStatus = "Processing", CustomerId = 1 },
                new OrderDTO { OrderStatus = "Completed", CustomerId = 1 }
            });

            _mockOrderQueries
                .Setup(q => q.GetListOrdersByCustomerId(It.IsAny<int>(), request))
                .ReturnsAsync(mockPagedList.Object);

            // Act
            var result = await _controller.GetMyOrders(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnOrders = Assert.IsAssignableFrom<IPagedList<OrderDTO>>(response.Result);

            Assert.Equal(2, returnOrders.Subset.Count());
            Assert.Equal("Processing", returnOrders.Subset.First().OrderStatus);
            Assert.Equal("Completed", returnOrders.Subset[1].OrderStatus);

            _mockOrderQueries.Verify(q => q.GetListOrdersByCustomerId(It.IsAny<int>(), request), Times.Once);
        }

        [Fact]
        public async Task GetMyOrders_ReturnsEnumerable_WhenTypeIsNotGrid()
        {
            // Arrange
            var request = new RequestFilterModel { Type = RequestType.AutocompleteSimple, Paging = false };
            var mockOrderList = new List<OrderDTO>
            {
                new OrderDTO { OrderStatus = "Processing", CustomerId = 1 },
                new OrderDTO { OrderStatus = "Completed", CustomerId = 1 }
            };

            _mockOrderQueries
                .Setup(q => q.GetOrdersByCustomerId(It.IsAny<int>(), request))
                .ReturnsAsync(mockOrderList);

            // Act
            var result = await _controller.GetMyOrders(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnOrders = Assert.IsAssignableFrom<IEnumerable<OrderDTO>>(response.Result);

            Assert.Equal(2, returnOrders.Count());
            Assert.Equal("Processing", returnOrders.First().OrderStatus);
            Assert.Equal("Completed", returnOrders.Last().OrderStatus);

            _mockOrderQueries.Verify(q => q.GetOrdersByCustomerId(It.IsAny<int>(), request), Times.Once);
        }

        [Fact]
        public async Task GetMyOrders_ReturnsEmptyList_WhenNoOrdersFound()
        {
            // Arrange
            var request = new RequestFilterModel { Type = RequestType.Grid, Paging = true };
            var mockPagedList = new Mock<IPagedList<OrderDTO>>();
            mockPagedList.Setup(m => m.Subset).Returns(new List<OrderDTO>());

            _mockOrderQueries
                .Setup(q => q.GetListOrdersByCustomerId(It.IsAny<int>(), request))
                .ReturnsAsync(mockPagedList.Object);

            // Act
            var result = await _controller.GetMyOrders(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnOrders = Assert.IsAssignableFrom<IPagedList<OrderDTO>>(response.Result);

            Assert.Empty(returnOrders.Subset);

            _mockOrderQueries.Verify(q => q.GetListOrdersByCustomerId(It.IsAny<int>(), request), Times.Once);
        }
    }
}
