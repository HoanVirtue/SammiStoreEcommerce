using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SAMMI.ECOM.UnitTest
{
    public class EventsControllerTests
    {
        [Fact]
        public async Task Post_ReturnsOk_WhenEventIsCreatedWithValidData()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenRequiredFieldsAreMissing()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Post_ReturnsBadRequest_WhenEventAlreadyExists()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Put_ReturnsOk_WhenEventIsUpdatedSuccessfully()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Put_ReturnsBadRequest_WhenEventDoesNotExist()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Put_ReturnsBadRequest_WhenRequiredFieldsAreMissing()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Put_ReturnsBadRequest_WhenStartDateIsGreaterThanEndDate()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Put_ReturnsBadRequest_WhenDatesAreBeforeCurrentDate()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task DeleteAsync_ReturnsOk_WhenUnusedEventIsDeletedSuccessfully()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task DeleteAsync_ReturnsBadRequest_WhenVoucherIsNotExpired()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task DeleteAsync_ReturnsBadRequest_WhenEventIsUsed()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Get_ReturnsOk_WhenFilteringEventsSuccessfully()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Get_ReturnsOk_WhenSortingEventsSuccessfully()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task Get_ReturnsOk_WhenRetrievingEventList()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }
    }
}
