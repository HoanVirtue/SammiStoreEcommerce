using Newtonsoft.Json;
using StackExchange.Redis;

namespace SAMMI.ECOM.Infrastructure.Services.Caching
{
    public interface IRedisService<T> where T : class
    {
        Task<T?> GetCache<T>(string key);
        Task SetCache<T>(string key, T data, TimeSpan? expiry = null);
        Task RemoveCache(string key);
    }
    public class RedisService<T> : IRedisService<T> where T : class
    {
        private readonly IDatabase _redisDb;
        public RedisService(IConnectionMultiplexer redis) { _redisDb = redis.GetDatabase(); }
        public async Task<T?> GetCache<T>(string key)
        {
            var cachedData = await _redisDb.StringGetAsync(key);
            if (cachedData.IsNullOrEmpty) return default;
            return JsonConvert.DeserializeObject<T>(cachedData);
        }

        public async Task SetCache<T>(string key, T data, TimeSpan? expiry = null)
        {
            if (data == null) return;
            var serializedData = JsonConvert.SerializeObject(data);
            await _redisDb.StringSetAsync(key, serializedData, expiry ?? TimeSpan.FromMinutes(60));
        }

        public async Task RemoveCache(string key)
        {
            await _redisDb.KeyDeleteAsync(key);
        }
    }
}
