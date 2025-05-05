using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Core.Models;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Commands.System;
using SAMMI.ECOM.Domain.DomainModels.System;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories.System
{
    public interface INotificationRepository : ICrudRepository<Notification>
    {
        Task<bool> IsReadAll(int userId);
        Task<ActionResponse<NotificationDTO>> CreateNotifi(Notification notifi);
        Task<ActionResponse> CreateNotifiForRole(int roleId, Notification notifi);
    }
    public class NotificationRepository : CrudRepository<Notification>, INotificationRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        private readonly IMapper _mapper;
        private readonly Lazy<IUsersRepository> _userRepository;
        public NotificationRepository(SammiEcommerceContext context,
            Lazy<IUsersRepository> userRepository,
            IMapper mapper) : base(context)
        {
            _context = context;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public async Task<ActionResponse<NotificationDTO>> CreateNotifi(Notification notifi)
        {
            var actRes = new ActionResponse<NotificationDTO>();
            notifi.CreatedDate = DateTime.Now;
            var createRes = await CreateAndSave(notifi);
            actRes.Combine(createRes);
            if(!actRes.IsSuccess)
            {
                return actRes;
            }
            actRes.SetResult(_mapper.Map<NotificationDTO>(createRes.Result));
            return actRes;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<bool> IsReadAll(int userId)
        {
            var notifications = await DbSet.Where(x => x.ReceiverId == userId && x.IsReaded != true).ToListAsync();
            if (notifications != null && notifications.Count > 0)
            {
                foreach (var notification in notifications)
                {
                    notification.IsReaded = true;
                    var updateRes = Update(notification);
                    if (!updateRes.IsSuccess)
                        return false;
                }
                await SaveChangeAsync();
            }
            return false;
        }

        public async Task<ActionResponse> CreateNotifiForRole(int roleId, Notification notifi)
        {
            var actRes = new ActionResponse();
            notifi.CreatedDate = DateTime.Now;
            var userIds = await _userRepository.Value.GetUserByRole(roleId);
            foreach (var id in userIds)
            {
                notifi.ReceiverId = id;
                var createRes = Create(notifi);
                actRes.Combine(createRes);
                if (!actRes.IsSuccess)
                    return actRes;
            }
            await SaveChangeAsync();
            return actRes;
        }
    }
}
