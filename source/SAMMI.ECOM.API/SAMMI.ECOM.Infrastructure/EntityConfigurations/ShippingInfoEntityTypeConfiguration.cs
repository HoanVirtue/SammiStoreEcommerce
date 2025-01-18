using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;

namespace SAMMI.ECOM.Infrastructure.EntityConfigurations
{
    public class ShippingInfoEntityTypeConfiguration : IEntityTypeConfiguration<ShippingInfo>
    {
        public void Configure(EntityTypeBuilder<ShippingInfo> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(d => d.Order)
                .WithMany(p => p.ShippingInfos)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(d => d.ShippingCompany)
                .WithMany(p => p.ShippingInfos)
                .HasForeignKey(d => d.ShippingCompanyId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
