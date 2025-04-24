using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : CustomBaseController
    {
        private readonly IReviewQueries _reviewQueries;
        private readonly IReviewRepository _reviewRepository;
        public ReviewsController(
            IReviewQueries reviewQueries,
            IReviewRepository reviewRepository,
            IMediator mediator,
            ILogger<ReviewsController> logger) : base(mediator, logger)
        {
            _reviewQueries = reviewQueries;
            _reviewRepository = reviewRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return default;
        }

        [HttpPost]
        public IActionResult Post()
        {
            return default;
        }

        [HttpPut]
        public IActionResult Put()
        {
            return default;
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            return default;
        }
    }
}
