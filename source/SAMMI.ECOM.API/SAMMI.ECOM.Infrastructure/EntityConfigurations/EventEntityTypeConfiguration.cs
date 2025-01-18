using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;

namespace SAMMI.ECOM.Infrastructure.EntityConfigurations
{
    public class EventEntityTypeConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}
