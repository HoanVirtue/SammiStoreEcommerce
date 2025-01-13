using SAMMI.ECOM.Domain.AggregateModels.AddressCategory;
using SAMMI.ECOM.Domain.AggregateModels.EventVoucher;
using SAMMI.ECOM.Domain.AggregateModels.OrderBuy;
using SAMMI.ECOM.Domain.AggregateModels.PurcharseOrder;
using SAMMI.ECOM.Domain.AggregateModels.System;
using SAMMI.ECOM.Domain.Seeds;

namespace SAMMI.ECOM.Domain.AggregateModels.Others;

public partial class User : Entity
{

    public string Code { get; set; } = null!;

    public string? Type { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? StreetAddress { get; set; }

    public int? WardId { get; set; }

    public bool? IsAdmin { get; set; }



    public virtual ICollection<CustomerAddress> CustomerAddresses { get; set; } = new List<CustomerAddress>();

    public virtual ICollection<FavouriteProduct> FavouriteProducts { get; set; } = new List<FavouriteProduct>();

    public virtual ICollection<Message> MessageCustomers { get; set; } = new List<Message>();

    public virtual ICollection<Message> MessageEmployees { get; set; } = new List<Message>();

    public virtual ICollection<MyVoucher> MyVouchers { get; set; } = new List<MyVoucher>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<PurchaseOrder> PurchaseOrderEmployees { get; set; } = new List<PurchaseOrder>();

    public virtual ICollection<PurchaseOrder> PurchaseOrderSuppliers { get; set; } = new List<PurchaseOrder>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();

    public virtual Ward? Ward { get; set; }
}
