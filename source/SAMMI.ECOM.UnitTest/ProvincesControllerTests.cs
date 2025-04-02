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

namespace SAMMI.ECOM.UnitTest
{
    public class ProvincesControllerTests
    {
        private readonly Mock<IProvinceQueries> _provinceQueriesMock;
        private readonly Mock<IProvinceRepository> _provinceRepositoryMock;
        private readonly Mock<IMediator> _mediatorMock;
        private readonly Mock<ILogger<ProvincesController>> _loggerMock;
        private readonly ProvincesController _controller;

        public ProvincesControllerTests()
        {
            _provinceQueriesMock = new Mock<IProvinceQueries>();
            _provinceRepositoryMock = new Mock<IProvinceRepository>();
            _mediatorMock = new Mock<IMediator>();
            _loggerMock = new Mock<ILogger<ProvincesController>>();

            _controller = new ProvincesController(
                _provinceQueriesMock.Object,
                _provinceRepositoryMock.Object,
                _mediatorMock.Object,
                _loggerMock.Object
            );
        }

        [Fact]
        public async Task Get_ReturnsOkResult_WithProvincesList()
        {
            // Arrange
            var request = new RequestFilterModel { Type = RequestType.Grid };
            var provinces = new List<ProvinceDTO> { new ProvinceDTO { Id = 1, Name = "Province1" } };
            _provinceQueriesMock.Setup(q => q.GetList(It.IsAny<RequestFilterModel>())).ReturnsAsync((IPagedList<ProvinceDTO>)provinces);

            // Act
            var result = await _controller.Get(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<List<ProvinceDTO>>(okResult.Value);
            Assert.Single(returnValue);
        }

        [Fact]
        public async Task Get_ById_ReturnsOkResult_WithProvince()
        {
            // Arrange
            var province = new ProvinceDTO { Id = 1, Name = "Province1" };
            _provinceQueriesMock.Setup(q => q.GetById(It.IsAny<int>())).ReturnsAsync(province);

            // Act
            var result = await _controller.Get(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<ProvinceDTO>(okResult.Value);
            Assert.Equal(1, returnValue.Id);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenIdIsNotZero()
        {
            // Arrange
            var command = new CUProvinceCommand { Id = 1 };

            // Act
            var result = await _controller.Post(command);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Post_ReturnsOkResult_WhenProvinceIsCreated()
        {
            // Arrange
            var command = new CUProvinceCommand { Id = 0, Name = "NewProvince" };
            var response = ActionResponse<ProvinceDTO>.Success(new ProvinceDTO { Id = 1, Name = "NewProvince" });
            _mediatorMock.Setup(m => m.Send(It.IsAny<CUProvinceCommand>(), default)).ReturnsAsync(response);

            // Act
            var result = await _controller.Post(command);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<ActionResponse<ProvinceDTO>>(okResult.Value);
            Assert.True(returnValue.IsSuccess);
        }

        [Fact]
        public async Task Put_ReturnsBadRequest_WhenIdDoesNotMatch()
        {
            // Arrange
            var command = new CUProvinceCommand { Id = 1 };

            // Act
            var result = await _controller.Put(2, command);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task Put_ReturnsOkResult_WhenProvinceIsUpdated()
        {
            // Arrange
            var command = new CUProvinceCommand { Id = 1, Name = "UpdatedProvince" };
            var response = ActionResponse<ProvinceDTO>.Success(new ProvinceDTO { Id = 1, Name = "UpdatedProvince" });
            _mediatorMock.Setup(m => m.Send(It.IsAny<CUProvinceCommand>(), default)).ReturnsAsync(response);

            // Act
            var result = await _controller.Put(1, command);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<ActionResponse<ProvinceDTO>>(okResult.Value);
            Assert.True(returnValue.IsSuccess);
        }

        [Fact]
        public void Delete_ReturnsNotFound_WhenProvinceDoesNotExist()
        {
            // Arrange
            _provinceRepositoryMock.Setup(r => r.IsExisted(It.IsAny<int>())).Returns(false);

            // Act
            var result = _controller.Delete(1);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public void Delete_ReturnsOkResult_WhenProvinceIsDeleted()
        {
            // Arrange
            _provinceRepositoryMock.Setup(r => r.IsExisted(It.IsAny<int>())).Returns(true);
            _provinceRepositoryMock.Setup(r => r.DeleteAndSave(It.IsAny<int>())).Returns(ActionResponse.Success);

            // Act
            var result = _controller.Delete(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<ActionResponse>(okResult.Value);
            Assert.True(returnValue.IsSuccess);
        }

        [Fact]
        public void DeleteRange_ReturnsBadRequest_WhenIdsAreNullOrEmpty()
        {
            // Act
            var result = _controller.DeleteRange(null);

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public void DeleteRange_ReturnsBadRequest_WhenAnyProvinceDoesNotExist()
        {
            // Arrange
            var ids = new List<int> { 1, 2, 3 };
            _provinceRepositoryMock.Setup(r => r.IsExisted(It.IsAny<int>())).Returns(false);

            // Act
            var result = _controller.DeleteRange(ids);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var returnValue = Assert.IsType<ActionResponse<List<string>>>(badRequestResult.Value);
            Assert.False(returnValue.IsSuccess);
        }

        [Fact]
        public void DeleteRange_ReturnsOkResult_WhenProvincesAreDeleted()
        {
            // Arrange
            var ids = new List<int> { 1, 2, 3 };
            _provinceRepositoryMock.Setup(r => r.IsExisted(It.IsAny<int>())).Returns(true);
            _provinceRepositoryMock.Setup(r => r.DeleteRangeAndSave(It.IsAny<object[]>())).Returns(ActionResponse.Success);

            // Act
            var result = _controller.DeleteRange(ids);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnValue = Assert.IsType<ActionResponse>(okResult.Value);
            Assert.True(returnValue.IsSuccess);
        }
    }
}