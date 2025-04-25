using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nest;
using SAMMI.ECOM.Core.Models.RequestModels.QueryParams;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
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

        [HttpGet("get-reviews-product")]
        public async Task<IActionResult> GetReviewsOfProductAsync([FromQuery]ReviewFilterModel request)
        {
            return Ok(await _reviewQueries.GetList(request));
        }

        [HttpGet("get-overall-rating/{productId}")]
        public async Task<IActionResult> GetOverallRating(int productId)
        {
            return Ok(await _reviewQueries.GetTotalOverall(productId));
        }

        [HttpGet]
        public async Task<IActionResult> GetReviewAsync(int reviewId)
        {
            return Ok(await _reviewQueries.GetById(reviewId));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]CUReviewCommand request)
        {
            if (request.Id != 0)
            {
                return BadRequest();
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] CUReviewCommand request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }
            if (!_reviewRepository.IsExisted(id))
            {
                return BadRequest("Đánh giá không tồn tại.");
            }
            var response = await _mediator.Send(request);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return BadRequest(response);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_reviewRepository.IsExisted(id))
            {
                return BadRequest("Đánh giá không tồn tại.");
            }
            return Ok(_reviewRepository.DeleteAndSave(id));
        }
    }
}
