using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

namespace SAMMI.ECOM.Infrastructure.EntityConfigurations
{
    public class DiscountEntityTypeConfiguration : IEntityTypeConfiguration<Discount>
    {
        public void Configure(EntityTypeBuilder<Discount> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(d => d.Brand)
                .WithMany(p => p.Discounts)
                .HasForeignKey(d => d.BrandId);

            builder.HasOne(d => d.Category)
                .WithMany(p => p.Discounts)
                .HasForeignKey(d => d.CategoryId);

            builder.HasOne(d => d.Event)
                .WithMany(p => p.Discounts)
                .HasForeignKey(d => d.EventId);

            builder.HasOne(d => d.Product)
                .WithMany(p => p.Discounts)
                .HasForeignKey(d => d.ProductId);

            builder.HasOne(d => d.DiscountType)
                .WithMany(p => p.Discounts)
                .HasForeignKey(d => d.DiscountTypeId);
        }
    }
}
