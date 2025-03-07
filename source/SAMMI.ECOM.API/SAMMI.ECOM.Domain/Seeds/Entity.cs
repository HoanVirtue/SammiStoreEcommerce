﻿using MediatR;
using System.ComponentModel.DataAnnotations.Schema;

namespace SAMMI.ECOM.Domain.Seeds
{
    public abstract class Entity : IEntity
    {
        [Column("Id")]
        public int Id { get; set; }
        [Column("Culture")]
        public string? Culture { get; set; } = "vn";
        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; }
        [Column("UpdatedDate")]
        public DateTime? UpdatedDate { get; set; }
        [Column("CreatedBy")]
        public string? CreatedBy { get; set; } = "Unknown";
        [Column("UpdatedBy")]
        public string? UpdatedBy { get; set; }
        [Column("IsActive")]
        public bool IsActive { get; set; } = true;
        [Column("IsDeleted")]
        public bool IsDeleted { get; set; } = false;
        [Column("DisplayOrder")]
        public int? DisplayOrder { get; set; }

        int? _requestedHashCode;

        private List<INotification> _domainEvents;
        public IReadOnlyCollection<INotification> DomainEvents => _domainEvents?.AsReadOnly();

        public void AddDomainEvent(INotification eventItem)
        {
            if (_domainEvents == null)
            {
                _domainEvents = new List<INotification> { eventItem };
            }
            else
            {
                _domainEvents.Add(eventItem);
            }
        }

        public void RemoveDomainEvent(INotification eventItem)
        {
            _domainEvents?.Remove(eventItem);
        }

        public void ClearDomainEvents()
        {
            _domainEvents?.Clear();
        }

        public bool IsTransient()
        {
            return this.Id == default(Int32);
        }

        public override bool Equals(object? obj)
        {
            if (obj == null || !(obj is Entity))
                return false;

            if (Object.ReferenceEquals(this, obj))
                return true;

            if (this.GetType() != obj.GetType())
                return false;

            Entity item = (Entity)obj;

            if (item.IsTransient() || this.IsTransient())
                return false;
            else
                return item.Id == this.Id;
        }

        public override int GetHashCode()
        {
            if (!IsTransient())
            {
                if (!_requestedHashCode.HasValue)
                    _requestedHashCode = this.Id.GetHashCode() ^ 31; // XOR for random distribution (http://blogs.msdn.com/b/ericlippert/archive/2011/02/28/guidelines-and-rules-for-gethashcode.aspx)

                return _requestedHashCode.Value;
            }
            else
                return base.GetHashCode();

        }
        public static bool operator ==(Entity left, Entity right)
        {
            if (Object.Equals(left, null))
                return (Object.Equals(right, null)) ? true : false;
            else
                return left.Equals(right);
        }

        public static bool operator !=(Entity left, Entity right)
        {
            return !(left == right);
        }

        //protected IActionResponse Ok()
        //{
        //    return ActionResponse.Success;
        //}

        //protected IActionResponse Failed(string message = "Thất bại")
        //{
        //    return ActionResponse.Failed(message);
        //}

        //protected IActionResponse Failed(ErrorGeneric error)
        //{
        //    return ActionResponse.Failed(error);
        //}
    }
}
