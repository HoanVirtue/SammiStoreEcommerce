using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

namespace SAMMI.ECOM.Infrastructure.EntityConfigurations
{
    public class VoucherEntityTypeConfiguration : IEntityTypeConfiguration<Voucher>
    {
        public void Configure(EntityTypeBuilder<Voucher> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(d => d.Brand)
                .WithMany(p => p.Vouchers)
                .HasForeignKey(d => d.BrandId);

            builder.HasOne(d => d.Category)
                .WithMany(p => p.Vouchers)
                .HasForeignKey(d => d.CategoryId);

            builder.HasOne(d => d.Event)
                .WithMany(p => p.Vouchers)
                .HasForeignKey(d => d.EventId);

            builder.HasOne(d => d.Product)
                .WithMany(p => p.Vouchers)
                .HasForeignKey(d => d.ProductId);

            builder.HasOne(d => d.DiscountType)
                .WithMany(p => p.Vouchers)
                .HasForeignKey(d => d.DiscountTypeId);
        }
    }
}
