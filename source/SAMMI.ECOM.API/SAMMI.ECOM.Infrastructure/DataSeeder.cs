using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace SAMMI.ECOM.Infrastructure
{
    public class WardSeed
    {
        [JsonPropertyName("Id")]
        public string Id { get; set; }
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        [JsonPropertyName("Level")]
        public string Level { get; set; }
    }

    public class DistrictSeed
    {
        [JsonPropertyName("Id")]
        public string Id { get; set; }
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        public List<WardSeed> Wards { get; set; }
    }

    public class ProvinceSeed
    {
        [JsonPropertyName("Id")]
        public string Id { get; set; }
        [JsonPropertyName("Name")]
        public string Name { get; set; }
        public List<DistrictSeed> Districts { get; set; }
    }
    public static class DataSeeder
    {
        public static async Task SeedAsync(SammiEcommerceContext _context)
        {
            var listProvince = new List<SAMMI.ECOM.Domain.AggregateModels.AddressCategory.Province>();
            var listDistrict = new List<SAMMI.ECOM.Domain.AggregateModels.AddressCategory.District>();
            var listWard = new List<SAMMI.ECOM.Domain.AggregateModels.AddressCategory.Ward>();
            if (!_context.Provinces.Any() && !_context.Districts.Any() && !_context.Wards.Any())
            {
                string json = File.ReadAllText(Path.Combine("Resources", "vietnamAddress.json"));
                var provinces = JsonConvert.DeserializeObject<List<ProvinceSeed>>(json);

                foreach (var province in provinces)
                {
                    var pro = new SAMMI.ECOM.Domain.AggregateModels.AddressCategory.Province
                    {
                        Id = string.IsNullOrEmpty(province.Id) ? 0 : int.Parse(province.Id),
                        Name = province.Name ?? "Unknown",
                    };
                    //listProvince.Add(pro);
                    if (pro.Id != 0)
                        await _context.Provinces.AddAsync(pro);
                    foreach (var district in province.Districts)
                    {
                        var districtEntity = new SAMMI.ECOM.Domain.AggregateModels.AddressCategory.District()
                        {
                            Id = string.IsNullOrEmpty(district.Id) ? 0 : int.Parse(district.Id),
                            Name = district.Name ?? "Unknown",
                            ProvinceId = pro?.Id ?? 0
                        };
                        //listDistrict.Add(districtEntity);
                        if (districtEntity.Id != 0)
                            await _context.Districts.AddAsync(districtEntity);

                        foreach (var ward in district.Wards)
                        {
                            var wardEntity = new SAMMI.ECOM.Domain.AggregateModels.AddressCategory.Ward
                            {
                                Id = string.IsNullOrEmpty(ward.Id) ? 0 : int.Parse(ward.Id),
                                Name = ward.Name ?? "Unknown",
                                DistrictId = districtEntity?.Id ?? 0
                            };
                            //listWard.Add(wardEntity);
                            if (wardEntity.Id != 0)
                                await _context.Wards.AddAsync(wardEntity);
                        }
                    }
                }
            }

            try
            {
                var duplicateWards = listWard
                    .GroupBy(w => w.Id)          // Nhóm các phần tử theo Id
                    .Where(g => g.Count() > 1)   // Chỉ lấy nhóm có nhiều hơn 1 phần tử
                    .SelectMany(g => g)          // Chuyển nhóm thành danh sách các phần tử trùng lặp
                    .ToList();

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }
    }
}
