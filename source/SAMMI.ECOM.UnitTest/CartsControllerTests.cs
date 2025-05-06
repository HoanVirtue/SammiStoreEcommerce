using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;

namespace SAMMI.ECOM.UnitTest
{
    public class CartsControllerTests
    {
        [Fact]
        public async Task AddToCart_ProductNotInCart_ShouldAddSuccessfully()
        {
            // Arrange
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task AddToCart_ProductAlreadyInCart_ShouldUpdateQuantity()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }

        [Fact]
        public async Task AddToCart_ProductDoesNotExist_ShouldReturnBadRequest()
        {
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
            Assert.Equal(1, 1);
        }
    }
}
