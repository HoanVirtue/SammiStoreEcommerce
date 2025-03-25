using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SAMMI.ECOM.Core.Authorizations;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.Commands.OrderBuy;
using SAMMI.ECOM.Domain.DomainModels.OrderBuy;
using SAMMI.ECOM.Infrastructure.Queries.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.OrderBy;
using SAMMI.ECOM.Infrastructure.Repositories.Products;

namespace SAMMI.ECOM.API.Controllers.OrderBuy
{
    [Route("api/[controller]")]
    [ApiController]
    public class VouchersController : CustomBaseController
    {
        private readonly IVoucherQueries _voucherQueries;
        private readonly IVoucherRepository _voucherRepository;
        private readonly IMyVoucherRepository _myVoucherRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMyVoucherQueries _myVoucherQueries;
        private readonly IMapper _mapper;
        public VouchersController(
            IVoucherQueries voucherQueries,
            IVoucherRepository voucherRepository,
            IMyVoucherRepository myVoucherRepository,
            IProductRepository productRepository,
            UserIdentity currentUser,
            IMyVoucherQueries myVoucherQueries,
            IMapper mapper,
            IMediator mediator,
            ILogger<UsersController> logger) : base(mediator, logger)
        {
            _voucherQueries = voucherQueries;
            _voucherRepository = voucherRepository;
            UserIdentity = currentUser;
            _myVoucherRepository = myVoucherRepository;
            _productRepository = productRepository;
            _myVoucherQueries = myVoucherQueries;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RequestFilterModel request)
        {
            if (request.Type == RequestType.SimpleAll)
            {
                return Ok(await _voucherQueries.GetAll(request));
            }
            return Ok(await _voucherQueries.GetList(request));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _voucherQueries.GetById(id));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CUVoucherCommand request)
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
        public async Task<IActionResult> Put(int id, [FromBody] CUVoucherCommand request)
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
            if (!_voucherRepository.IsExisted(id))
            {
                return NotFound();
            }
            return Ok(_voucherRepository.DeleteAndSave(id));
        }

        [HttpDelete]
        public IActionResult DeleteRange([FromBody] List<int> ids)
        {
            var actErrorResponse = new ActionResponse<List<string>>();
            var listError = new Dictionary<int, string>();
            if (ids == null || ids.Count == 0)
            {
                return BadRequest();
            }
            foreach (var id in ids)
            {
                if (!_voucherRepository.IsExisted(id) && !listError.TryGetValue(id, out var error))
                {
                    listError[id] = $"Không tồn tại phiếu giảm giá có mã {id}";
                }
            }
            if (listError.Count > 0)
            {
                actErrorResponse.SetResult(listError.Select(x => x.Value).ToList());
                return BadRequest(actErrorResponse);
            }
            return Ok(_voucherRepository.DeleteRangeAndSave(ids.Cast<object>().ToArray()));
        }

        [HttpGet("get-code-by-last-id")]
        public async Task<IActionResult> GetCodeByLastId()
        {
            return Ok(await _voucherQueries.GetCodeByLastId());
        }

        [HttpPost("save-voucher")]
        public async Task<IActionResult> PostMyVoucherAsync([FromBody] int voucherId)
        {
            var voucher = await _voucherRepository.GetByIdAsync(voucherId);
            if (voucher == null)
                return NotFound();

            if (await _myVoucherRepository.IsExisted(voucherId, UserIdentity.Id))
            {
                return BadRequest("Phiếu giảm giá đã được lưu trước đó");
            }
            var request = new MyVoucher
            {
                VoucherId = voucherId,
                CustomerId = UserIdentity.Id,
                IsUsed = false,
                CreatedDate = DateTime.Now,
                CreatedBy = "System"
            };
            var createRes = await _myVoucherRepository.CreateAndSave(request);
            if (createRes.IsSuccess)
            {
                return Ok(_mapper.Map<MyVoucherDTO>(createRes.Result));
            }
            return BadRequest(createRes);
        }


        [HttpGet("my-voucher")]
        public async Task<IActionResult> GetMyVoucherAsync()
        {
            return Ok(await _voucherQueries.GetVoucherOfCustomer(UserIdentity.Id));
        }

        [HttpPost("my-voucher-apply")]
        public async Task<IActionResult> GetMyVoucherApplyAsync([FromBody] RequestVoucherDTO request)
        {
            if (!request.Details.All(x => _productRepository.IsExisted(x.ProductId)))
            {
                return BadRequest("Có ít nhất 1 sản phẩm không tồn tại");
            }
            foreach (var item in request.Details)
            {
                item.Price = await _productRepository.GetPrice(item.ProductId);
            }
            decimal totalAmount = request.Details.Sum(x => x.Quantity * x.Price) ?? 0;

            return Ok(await _myVoucherQueries.GetDataInCheckout(UserIdentity.Id, totalAmount, request.Details));
        }

        [HttpPost("apply-voucher/{voucherCode}")]
        public async Task<IActionResult> ApplyVoucher(string voucherCode, [FromBody] RequestVoucherDTO request)
        {
            var voucher = await _voucherRepository.GetByCode(voucherCode);
            if (voucher == null)
            {
                return BadRequest("Phiếu giảm giá không tồn tại.");
            }

            foreach (var item in request.Details)
            {
                item.Price = await _productRepository.GetPrice(item.ProductId);
            }
            decimal totalAmount = request.Details.Sum(x => x.Quantity * x.Price) ?? 0;
            var voucherValid = await _myVoucherQueries.AppyVoucherByVoucherCode(voucherCode, UserIdentity.Id, totalAmount, request.Details);
            if (voucherValid != null && voucherValid.IsValid)
            {
                if (await _myVoucherRepository.IsExisted(voucher.Id, UserIdentity.Id))
                {
                    return BadRequest("Phiếu giảm giá đã được lưu trước đó");
                }
                var myVoucherRequest = new MyVoucher
                {
                    VoucherId = voucher.Id,
                    CustomerId = UserIdentity.Id,
                    IsUsed = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "System"
                };
                var createRes = await _myVoucherRepository.CreateAndSave(request);
                if (!createRes.IsSuccess)
                {
                    return BadRequest(createRes);
                }
            }
            return Ok(voucherValid);
        }
    }
}
