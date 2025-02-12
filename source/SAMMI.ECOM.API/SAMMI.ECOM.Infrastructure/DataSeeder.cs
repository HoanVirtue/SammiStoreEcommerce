using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SAMMI.ECOM.Domain.AggregateModels.Others;
using SAMMI.ECOM.Domain.AggregateModels.Products;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Enums;
using System.Data;
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
    public class DataSeeder
    {
        private readonly SammiEcommerceContext _context;
        public DataSeeder(SammiEcommerceContext context)
        {
            _context = context;
        }

        private async Task SeedAddress()
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

        private async Task SeedUsers()
        {
            if (!_context.Users.Any(x => x.Type == TypeUserEnum.Employee.ToString()))
            {
                User user = new User()
                {
                    Code = "NV00001",
                    IsAdmin = true,
                    IdentityGuid = Guid.NewGuid().ToString(),
                    Type = TypeUserEnum.Employee.ToString(),
                    Phone = "012321232",
                    FirstName = "ad",
                    LastName = "min",
                    FullName = "admin",
                    WardId = 1,
                    Username = "admin",
                    Gender = 1,
                    Password = "AQAAAAEAACcQAAAAEL8NlQ45auZ/l+/y+AhBHLsmK7bUfDYcfMmEDpny1MOfSfZHVvy0lxvqPIQind8TCg==",
                    IsActive = true,
                    IsDeleted = false,
                    IsLock = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                };

                try
                {
                    await _context.Users.AddAsync(user);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }

        private async Task SeedPermission()
        {
            if (!await _context.Permissions.AnyAsync())
            {
                List<Permission> permissions = new List<Permission>();
                permissions.Add(new Permission()
                {
                    Name = "Quản lý nhân viên",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                permissions.Add(new Permission()
                {
                    Name = "Quản lý khách hàng",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                permissions.Add(new Permission()
                {
                    Name = "Quản lý phiếu giảm giá",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                try
                {
                    await _context.Permissions.AddRangeAsync(permissions);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }

        private async Task SeedRole()
        {
            if (!await _context.Roles.AnyAsync())
            {
                List<Role> roles = new List<Role>();
                roles.Add(new Role()
                {
                    Name = "Quản lý",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                roles.Add(new Role()
                {
                    Name = "Nhân viên",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                try
                {
                    await _context.Roles.AddRangeAsync(roles);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }

        private async Task SeedRolePermission()
        {
            if (!await _context.RolePermissions.AnyAsync())
            {
                List<RolePermission> rolePermissions = new List<RolePermission>();
                rolePermissions.Add(new RolePermission()
                {
                    RoleId = 1,
                    PermissionId = 1,
                    Allow = true,
                    RoleView = true,
                    RoleCreate = true,
                    RoleUpdate = true,
                    RoleDelete = true,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                rolePermissions.Add(new RolePermission()
                {
                    RoleId = 1,
                    PermissionId = 2,
                    Allow = true,
                    RoleView = true,
                    RoleCreate = true,
                    RoleUpdate = true,
                    RoleDelete = true,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                rolePermissions.Add(new RolePermission()
                {
                    RoleId = 1,
                    PermissionId = 3,
                    Allow = true,
                    RoleView = true,
                    RoleCreate = true,
                    RoleUpdate = true,
                    RoleDelete = true,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                rolePermissions.Add(new RolePermission()
                {
                    RoleId = 2,
                    PermissionId = 2,
                    Allow = true,
                    RoleView = true,
                    RoleCreate = true,
                    RoleUpdate = true,
                    RoleDelete = true,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                try
                {
                    await _context.RolePermissions.AddRangeAsync(rolePermissions);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }

        private async Task SeedUserRole()
        {
            if (!await _context.UserRoles.AnyAsync())
            {
                List<UserRole> userRoles = new List<UserRole>();
                userRoles.Add(new UserRole()
                {
                    RoleId = 1,
                    UserId = 1,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });


                try
                {
                    await _context.UserRoles.AddRangeAsync(userRoles);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }


        private async Task SeedBrand()
        {
            if (!await _context.Brands.AnyAsync())
            {
                List<Brand> brands = new List<Brand>();
                brands.Add(new Brand()
                {
                    Code = "br00001",
                    Name = "WHOO",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                brands.Add(new Brand()
                {
                    Code = "br00002",
                    Name = "SK-II",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00003",
                    Name = "Estee Lauder",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00004",
                    Name = "Lancome",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00005",
                    Name = "Shiseido",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00006",
                    Name = "Clinique",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00007",
                    Name = "Dior",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00008",
                    Name = "Chanel",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00009",
                    Name = "L'Oreal",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                brands.Add(new Brand()
                {
                    Code = "br00010",
                    Name = "The Face Shop",
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                try
                {
                    await _context.Brands.AddRangeAsync(brands);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }

        private async Task SeedProductCategory()
        {
            if (!await _context.ProductCategories.AnyAsync())
            {
                List<ProductCategory> categories = new List<ProductCategory>();
                categories.Add(new ProductCategory()
                {
                    Code = "DM00001",
                    Name = "Trang điểm",
                    Level = 1,
                    ParentId = null,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });
                categories.Add(new ProductCategory()
                {
                    Code = "DM00002",
                    Name = "Chăm sóc da",
                    Level = 1,
                    ParentId = null,
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                categories.Add(new ProductCategory()
                {
                    Code = "DM00003",
                    Name = "Làm sạch da",
                    Level = 2,
                    ParentId = 2, // Thuộc "Chăm sóc da"
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                categories.Add(new ProductCategory()
                {
                    Code = "DM00004",
                    Name = "Dưỡng ẩm",
                    Level = 2,
                    ParentId = 2, // Thuộc "Chăm sóc da"
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                categories.Add(new ProductCategory()
                {
                    Code = "DM00005",
                    Name = "Son môi",
                    Level = 2,
                    ParentId = 1, // Thuộc "Trang điểm"
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                categories.Add(new ProductCategory()
                {
                    Code = "DM00006",
                    Name = "Kem nền",
                    Level = 2,
                    ParentId = 1, // Thuộc "Trang điểm"
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                categories.Add(new ProductCategory()
                {
                    Code = "DM00007",
                    Name = "Kem chống nắng",
                    Level = 2,
                    ParentId = 2, // Thuộc "Chăm sóc da"
                    IsActive = true,
                    IsDeleted = false,
                    CreatedDate = DateTime.Now,
                    CreatedBy = "Unknown"
                });

                try
                {
                    await _context.ProductCategories.AddRangeAsync(categories);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }
            }
        }


        public async Task SeedAsync()
        {
            await SeedAddress();
            await SeedUsers();
            await SeedPermission();
            await SeedRole();
            await SeedRolePermission();
            await SeedUserRole();
            await SeedBrand();
            await SeedProductCategory();
        }
    }
}
