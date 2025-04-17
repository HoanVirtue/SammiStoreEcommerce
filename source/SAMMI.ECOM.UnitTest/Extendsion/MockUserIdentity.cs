using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SAMMI.ECOM.Core.Authorizations;

namespace SAMMI.ECOM.UnitTest.Extendsion
{
    public class MockUserIdentity : UserIdentity
    {
        public MockUserIdentity() : base(null) { }

        public new int Id => 1; // Ghi đè thuộc tính Id
    }
}
