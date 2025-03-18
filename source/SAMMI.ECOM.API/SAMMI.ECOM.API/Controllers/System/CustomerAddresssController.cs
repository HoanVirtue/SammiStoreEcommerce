using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Domain.Commands;
using SAMMI.ECOM.Infrastructure.Queries.CategoryAddress;
using SAMMI.ECOM.Infrastructure.Repositories.AddressCategory;

namespace SAMMI.ECOM.API.Controllers.System
{
    [Route("api/customer-address")]
    [ApiController]
    public class CustomerAddresssController : CustomBaseController
    {
        private readonly ICustomerAddressQueries _addressQueries;
        private readonly ICustomerAddressRepository _addressRepository;
        public CustomerAddresssController(
            ICustomerAddressQueries addressQueries,
            ICustomerAddressRepository addressRepository,
            UserIdentity currentUser,
            IMediator mediator,
            ILogger<CustomerAddresssController> logger) : base(mediator, logger)
        {
            _addressQueries = addressQueries;
            _addressRepository = addressRepository;
            UserIdentity = currentUser;
        }

        [HttpGet("get-current-address")]
        public async Task<IActionResult> GetCurrentAddressAsync()
        {
            return Ok(await _addressQueries.GetCurrentAddress(UserIdentity.Id));
        }

        [HttpGet("get-all-current-address")]
        public async Task<IActionResult> GetAllCurrentAddressAsync()
        {
            return Ok(await _addressQueries.GetAllByUserId(UserIdentity.Id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUCustomerAddressCommand request)
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
        public async Task<IActionResult> Put(int id, [FromBody] CUCustomerAddressCommand request)
        {
            if (id != request.Id)
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

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!_addressRepository.IsExisted(id))
            {
                return NotFound();
            }
            return Ok(_addressRepository.DeleteAndSave(id));
        }

        //[HttpDelete]
        //public IActionResult DeleteRange([FromBody] List<int> ids)
        //{
        //    var actErrorResponse = new ActionResponse<List<string>>();
        //    var listError = new Dictionary<int, string>();
        //    if (ids == null || ids.Count == 0)
        //    {
        //        return BadRequest();
        //    }
        //    foreach (var id in ids)
        //    {
        //        if (!_addressRepository.IsExisted(id) && !listError.TryGetValue(id, out var error))
        //        {
        //            listError[id] = $"Không tồn tại banner có mã {id}";
        //        }
        //    }
        //    if (listError.Count > 0)
        //    {
        //        actErrorResponse.SetResult(listError.Select(x => x.Value).ToList());
        //        return BadRequest(actErrorResponse);
        //    }
        //    return Ok(_addressRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        //}
    }
}
