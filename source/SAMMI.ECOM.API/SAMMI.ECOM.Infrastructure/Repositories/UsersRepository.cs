using Microsoft.EntityFrameworkCore;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.Enums;
using SAMMI.ECOM.Repository.GenericRepositories;

namespace SAMMI.ECOM.Infrastructure.Repositories
{
    public interface IUsersRepository : ICrudRepository<User>
    {
        Task<bool> IsExistCode(string code, int? id);
        Task<bool> IsExistUsername(string username, int? id);
        Task<bool> IsExistEmail(string email, int? id, TypeUserEnum? type = null);
        Task<bool> IsExistPhone(string phone, int? id, TypeUserEnum? type = null);
        Task SetSecurityStampAsync(User user, string stamp,
            CancellationToken cancellationToken = default(CancellationToken));

        Task SetPasswordHashAsync(User user, string passwordHash,
            CancellationToken cancellationToken = default(CancellationToken));

        Task<User?> FindByUserNameAsync(string userName);
    }
    public class UsersRepository : CrudRepository<User>, IUsersRepository, IDisposable
    {
        private readonly SammiEcommerceContext _context;
        private bool _disposed;
        public UsersRepository(SammiEcommerceContext context) : base(context)
        {
            _context = context;
        }

        public void Dispose()
        {
            _disposed = true;
        }

        public async Task<bool> IsExistCode(string code, int? id)
        {
            return await _context.Users.AnyAsync(x => x.Code.Trim() == code.Trim() && x.Id != id && x.IsDeleted != true);
        }

        public async Task<bool> IsExistEmail(string email, int? id, TypeUserEnum? type = null)
        {
            var result = _context.Users.Where(x => x.Email.Trim() == email.Trim() && x.Id != id && x.IsDeleted != true);
            if (type != null)
            {
                result = result.Where(x => x.Type == type.ToString());
            }
            return await result.CountAsync() > 0;
        }

        public async Task<bool> IsExistPhone(string phone, int? id, TypeUserEnum? type = null)
        {
            var result = _context.Users.Where(x => x.Phone.Trim() == phone.Trim() && x.Id != id && x.IsDeleted != true);
            if (type != null)
            {
                result = result.Where(x => x.Type == type.ToString());
            }
            return await result.CountAsync() > 0;
        }

        public async Task<bool> IsExistUsername(string username, int? id)
        {
            return await _context.Users.AnyAsync(x => x.Username.Trim() == username.Trim() && x.Id != id && x.IsDeleted != true);
        }

        /// <summary>
        /// Sets the provided security <paramref name="stamp"/> for the specified <paramref name="user"/>.
        /// </summary>
        /// <param name="user">The user whose security stamp should be set.</param>
        /// <param name="stamp">The security stamp to set.</param>
        /// <param name="cancellationToken">The <see cref="CancellationToken"/> used to propagate notifications that the operation should be canceled.</param>
        /// <returns>The <see cref="Task"/> that represents the asynchronous operation.</returns>
        public virtual Task SetSecurityStampAsync(User user, string stamp,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (stamp == null)
            {
                throw new ArgumentNullException(nameof(stamp));
            }

            user.SecurityStamp = stamp;
            return Task.CompletedTask;
        }

        /// <summary>
        /// Sets the password hash for a user.
        /// </summary>
        /// <param name="user">The user to set the password hash for.</param>
        /// <param name="passwordHash">The password hash to set.</param>
        /// <param name="cancellationToken">The <see cref="CancellationToken"/> used to propagate notifications that the operation should be canceled.</param>
        /// <returns>The <see cref="Task"/> that represents the asynchronous operation.</returns>
        public Task SetPasswordHashAsync(User user, string passwordHash,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            cancellationToken.ThrowIfCancellationRequested();
            ThrowIfDisposed();
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            user.Password = passwordHash;
            return Task.CompletedTask;
        }

        /// <summary>
        /// Throws if this class has been disposed.
        /// </summary>
        protected void ThrowIfDisposed()
        {
            if (_disposed)
            {
                throw new ObjectDisposedException(GetType().Name);
            }
        }

        public async Task<User?> FindByUserNameAsync(string userName)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Username.ToLower().Equals(userName.ToLower())
                    && !x.IsDeleted);
        }
    }
}
