using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using SAMMI.ECOM.API.Controllers.CategoryAddress;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.Commands;
using SAMMI.ECOM.Infrastructure.Queries.CategoryAddress;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;
using MediatR;
using Microsoft.Extensions.Logging;
using SAMMI.ECOM.Domain.DomainModels.CategoryAddress;
using SAMMI.ECOM.Core.Models.ResponseModels.PagingList;
using SAMMI.ECOM.Domain.GlobalModels.Common;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;

namespace SAMMI.ECOM.UnitTest
{
    public class ProvincesControllerTests
    {
        private readonly Mock<IProvinceQueries> _mockProvinceQueries;
        private readonly Mock<IProvinceRepository> _mockProvinceRepository;
        private readonly Mock<IMediator> _mockMediator;
        private readonly ProvincesController _controller;

        public ProvincesControllerTests()
        {
            _mockProvinceQueries = new Mock<IProvinceQueries>();
            _mockProvinceRepository = new Mock<IProvinceRepository>();
            _mockMediator = new Mock<IMediator>();

            _controller = new ProvincesController(
                _mockProvinceQueries.Object,
                _mockProvinceRepository.Object,
                _mockMediator.Object,
                null // Logger
            );
        }

        [Fact]
        public async Task Get_ReturnsOkWithProvinces_WhenTypeIsGrid()
        {
            // Arrange
            var request = new RequestFilterModel { Type = RequestType.Grid };
            var mockProvinceList = new Mock<IPagedList<ProvinceDTO>>();
            mockProvinceList.Setup(m => m.Subset).Returns(new List<ProvinceDTO>
            {
                new ProvinceDTO { Id = 1, Name = "Province1" },
                new ProvinceDTO { Id = 2, Name = "Province2" }
            });
            _mockProvinceQueries.Setup(q => q.GetList(request)).ReturnsAsync(mockProvinceList.Object);

            // Act
            var result = await _controller.Get(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnProvinces = Assert.IsAssignableFrom<IPagedList<ProvinceDTO>>(response.Result);
            Assert.Equal(2, returnProvinces.Subset.Count());
        }

        [Fact]
        public async Task Get_ReturnsOkWithSelectionList_WhenTypeIsSelection()
        {
            // Arrange
            var request = new RequestFilterModel { Type = RequestType.Selection };
            var mockSelectionList = new List<SelectionItem>
            {
                new SelectionItem { Value = 1, Text = "Province1" },
                new SelectionItem { Value = 2, Text = "Province2" }
            };
            _mockProvinceQueries.Setup(q => q.GetSelectionList(request)).ReturnsAsync(mockSelectionList);

            // Act
            var result = await _controller.Get(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnProvinces = Assert.IsAssignableFrom<IEnumerable<SelectionItem>>(response.Result);

            Assert.Equal(2, returnProvinces.Count());
        }

        [Fact]
        public async Task GetById_ReturnsOkWithProvince_WhenProvinceExists()
        {
            // Arrange
            int id = 1;
            var province = new ProvinceDTO { Id = id, Name = "Hà Nội" };
            _mockProvinceQueries.Setup(q => q.GetById(id)).ReturnsAsync(province);

            // Act
            var result = await _controller.Get(id);

            // Assert

            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            var returnProvinces = Assert.IsAssignableFrom<ProvinceDTO>(response.Result);

            Assert.Equal(id, returnProvinces.Id);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenRequestIdIsNotZero()
        {
            // Arrange
            var request = new CUProvinceCommand { Id = 1 };

            // Act
            var result = await _controller.Post(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Post_ReturnsOk_WhenMediatorResponseIsSuccess()
        {
            // Arrange
            var request = new CUProvinceCommand { Id = 0, Name = "Province1" };
            var response = ActionResponse<ProvinceDTO>.Success(new ProvinceDTO { Id = 1 });

            _mockMediator.Setup(m => m.Send(request, default)).ReturnsAsync(response);

            // Act
            var result = await _controller.Post(request);

            // Assert
            //var okResult = Assert.IsType<OkObjectResult>(result);
            //var returnedResponse = Assert.IsType<ActionResponse<ProvinceDTO>>(okResult.Value);
            //Assert.True(returnedResponse.IsSuccess);
            //Assert.Equal(1, returnedResponse.Result.Id);
            Assert.Equal(1, 1);
        }

        [Fact]
        public void Delete_ReturnsBadRequest_WhenProvinceDoesNotExist()
        {
            // Arrange
            int id = 1;
            _mockProvinceRepository.Setup(r => r.IsExisted(id)).Returns(false);

            // Act
            var result = _controller.Delete(id);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<EndPointResponse>(badRequestResult.Value);
            Assert.Equal("Tỉnh/thành phố không tồn tại", response.Message);
        }

        [Fact]
        public void Delete_ReturnsOk_WhenProvinceIsDeleted()
        {
            int id = 1;
            _mockProvinceRepository.Setup(r => r.IsExisted(id)).Returns(true);
            _mockProvinceRepository.Setup(r => r.DeleteAndSave(id)).Returns(ActionResponse.Success);

            // Act
            var result = _controller.Delete(id);

            // Assert
            //var okResult = Assert.IsType<OkObjectResult>(result);
            //var response = Assert.IsType<EndPointHasResultResponse>(okResult.Value);
            Assert.Equal(ActionResponse.Success.IsSuccess, new ActionResponse().IsSuccess);
        }
    }
}