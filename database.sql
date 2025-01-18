CREATE DATABASE SAMMI_ECOMMERCE;

USE SAMMI_ECOMMERCE;

-- thông tin người dùng
CREATE TABLE Province (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    PostalCode NVARCHAR(20),
    Country NVARCHAR(100),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE District (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    ProvinceId INT FOREIGN KEY REFERENCES Province(Id),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Ward (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100),
    DistrictId INT FOREIGN KEY REFERENCES District(Id),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Code VARCHAR(256) NOT NULL,
    Type NVARCHAR(50) CHECK (Type IN ('Customer', 'Employee', 'Supplier')),
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    FullName NVARCHAR(100),
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    StreetAddress NVARCHAR(200),
    WardId INT FOREIGN KEY REFERENCES Ward(Id),
    IsAdmin BIT DEFAULT 0,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE CustomerAddress (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CustomerId INT FOREIGN KEY REFERENCES Users(Id),
    StreetAddress NVARCHAR(200),
    WardId INT FOREIGN KEY REFERENCES Ward(Id),
    IsDefault BIT DEFAULT 0,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);



-- sản phẩm

CREATE TABLE ProductCategory (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Code VARCHAR(256) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    ParentId INT NULL,
    Level INT NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Brand (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Code VARCHAR(256) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Image NVARCHAR(255),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Product (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Code VARCHAR(256) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    StockQuantity INT NOT NULL DEFAULT 0,
    OldPrice DECIMAL(18, 2) NULL,
    NewPrice DECIMAL(18, 2) NOT NULL,
    Ingredient NVARCHAR(MAX) NULL,
    Uses NVARCHAR(MAX) NULL,
    UsageGuide NVARCHAR(MAX) NULL,
    BrandId INT NULL FOREIGN KEY REFERENCES Brand(Id),
    CategoryId INT NULL FOREIGN KEY REFERENCES ProductCategory(Id),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE ProductImage (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT NOT NULL FOREIGN KEY REFERENCES Product(Id),
    ImageURL NVARCHAR(255),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

-- sản phẩm yêu thích
CREATE TABLE FavouriteProduct (
    Id INT PRIMARY KEY IDENTITY(1,1),
	CustomerId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    ProductId INT NOT NULL FOREIGN KEY REFERENCES Product(Id),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

-- phiếu giảm giá

CREATE TABLE Event (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Code VARCHAR(256) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    EventType NVARCHAR(50),
    Image NVARCHAR(255),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE DiscountType (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Discount (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Code VARCHAR(256) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    CategoryId INT NULL FOREIGN KEY REFERENCES ProductCategory(Id),
    BrandId INT NULL FOREIGN KEY REFERENCES Brand(Id),
    ProductId INT NULL FOREIGN KEY REFERENCES Product(Id),
    DiscountTypeId INT REFERENCES DiscountType(Id),
    DiscountValue DECIMAL(18, 2) NOT NULL,
    UsageLimit INT NOT NULL DEFAULT 0,
    UsedCount INT NOT NULL DEFAULT 0,
    EventId INT NULL FOREIGN KEY REFERENCES Event(Id),
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE MyVoucher (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CustomerId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    VoucherId INT NOT NULL FOREIGN KEY REFERENCES Discount(Id),
    IsUsed BIT NOT NULL DEFAULT 0,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


--hệ thống

CREATE TABLE Banner (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    ImageURL NVARCHAR(255),
    Level INT NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Role (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
	Description NVARCHAR(255) NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


CREATE TABLE Permission (
    Id INT PRIMARY KEY IDENTITY(1,1), -- ID tự tăng
    Name NVARCHAR(100) NOT NULL, -- Tên quyền (e.g., "View Dashboard")
    Description NVARCHAR(255) NULL, -- Mô tả quyền
    Culture NVARCHAR(10) NULL, -- Văn hóa
    CreatedDate DATETIME DEFAULT GETDATE(), -- Ngày tạo
    UpdatedDate DATETIME NULL, -- Ngày cập nhật
    CreatedBy NVARCHAR(50) NULL, -- Người tạo
    UpdatedBy NVARCHAR(50) NULL, -- Người cập nhật
    IsActive BIT DEFAULT 1, -- Trạng thái hoạt động
    IsDeleted BIT DEFAULT 0, -- Đã bị xóa hay chưa
	DisplayOrder INT DEFAULT 0
);

CREATE TABLE RolePermission (
    Id INT PRIMARY KEY IDENTITY(1,1), -- ID tự tăng
    RoleId INT NOT NULL FOREIGN KEY REFERENCES Role(Id), -- Vai trò
    PermissionId INT NOT NULL FOREIGN KEY REFERENCES Permission(Id), -- Quyền chức năng
    Allow BIT DEFAULT 0, -- Có được phép hay không (1: Có, 0: Không)
	RoleView BIT DEFAULT 0, -- Quyền xem
	RoleCreate BIT DEFAULT 0,
    RoleUpdate BIT DEFAULT 0, -- Quyền cập nhật
    RoleDelete BIT DEFAULT 0, -- Quyền xóa
	Culture NVARCHAR(10) NULL, -- Văn hóa
    CreatedDate DATETIME DEFAULT GETDATE(), -- Ngày tạo
    UpdatedDate DATETIME NULL, -- Ngày cập nhật
    CreatedBy NVARCHAR(50) NULL, -- Người tạo
    UpdatedBy NVARCHAR(50) NULL, -- Người cập nhật
    IsActive BIT DEFAULT 1, -- Trạng thái hoạt động
    IsDeleted BIT DEFAULT 0, -- Đã bị xóa hay chưa
	DisplayOrder INT DEFAULT 0
);

CREATE TABLE UserRole (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(Id), -- Liên kết tới người dùng
    RoleId INT NOT NULL FOREIGN KEY REFERENCES Role(Id), -- Liên kết tới vai trò
	Culture NVARCHAR(10) NULL, -- Văn hóa
    CreatedDate DATETIME DEFAULT GETDATE(), -- Ngày tạo
    UpdatedDate DATETIME NULL, -- Ngày cập nhật
    CreatedBy NVARCHAR(50) NULL, -- Người tạo
    UpdatedBy NVARCHAR(50) NULL, -- Người cập nhật
    IsActive BIT DEFAULT 1, -- Trạng thái hoạt động
    IsDeleted BIT DEFAULT 0, -- Đã bị xóa hay chưa
	DisplayOrder INT DEFAULT 0
);


CREATE TABLE SysAction (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE SysFunction (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE SysLog (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    ActionId INT NOT NULL FOREIGN KEY REFERENCES SysAction(Id),
    FunctionId INT NOT NULL FOREIGN KEY REFERENCES SysFunction(Id),
    IPAddress NVARCHAR(50),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


--mua hàng và thanh toán

CREATE TABLE ShippingCompany (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    ContactInfo NVARCHAR(255),
    Website NVARCHAR(255),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE [Order] (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CustomerId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    PaymentStatus NVARCHAR(50),
    OrderStatus NVARCHAR(50),
    ShippingStatus NVARCHAR(50),
    DiscountId INT NULL FOREIGN KEY REFERENCES Discount(Id),
    CustomerAddress NVARCHAR(255),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE OrderDetail (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
    ProductId INT NOT NULL FOREIGN KEY REFERENCES Product(Id),
    Quantity INT NOT NULL,
    Tax DECIMAL(18, 2),
    DiscountId INT NULL FOREIGN KEY REFERENCES Discount(Id),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


CREATE TABLE PaymentMethod (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Payment (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
    PaymentMethodId INT NOT NULL FOREIGN KEY REFERENCES PaymentMethod(Id),
    PaymentAmount DECIMAL(18, 2) NOT NULL,
    PaymentStatus NVARCHAR(50),
    TransactionId NVARCHAR(100),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Notification (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    ReceiverId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    OrderId INT NULL FOREIGN KEY REFERENCES [Order](Id),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


CREATE TABLE ShippingInfo (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
    ShippingCompanyId INT NOT NULL FOREIGN KEY REFERENCES ShippingCompany(Id),
    ShippingMethod NVARCHAR(100),
    Cost DECIMAL(18, 2),
    TrackingNumber NVARCHAR(100),
    ShippingStatus NVARCHAR(50),
    EstimatedDeliveryDate DATETIME,
    ActualDeliveryDate DATETIME,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Review (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ProductId INT NOT NULL FOREIGN KEY REFERENCES Product(Id),
    UserId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    Comment NVARCHAR(255),
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE Message (
    Id INT PRIMARY KEY IDENTITY(1,1),
	EmployeeId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    CustomerId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    MessageContent NVARCHAR(255) NOT NULL,
    MessageType NVARCHAR(50) CHECK (MessageType IN ('Incoming', 'Outgoing')),
    IsRead BIT DEFAULT 0,
    Culture NVARCHAR(10),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


-- ĐƠN NHẬP
CREATE TABLE PurchaseOrder (
    Id INT PRIMARY KEY IDENTITY(1,1),
	EmployeeId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    SupplierId INT NOT NULL FOREIGN KEY REFERENCES Users(Id),
    Status NVARCHAR(50),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);

CREATE TABLE PurchaseOrderDetail (
    Id INT PRIMARY KEY IDENTITY(1,1),
    PurchaseOrderId INT NOT NULL FOREIGN KEY REFERENCES PurchaseOrder(Id),
    ProductId INT NOT NULL FOREIGN KEY REFERENCES Product(Id),
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2),
    Tax DECIMAL(18,2),
    CreatedDate DATETIME DEFAULT GETDATE(),
    UpdatedDate DATETIME NULL,
    CreatedBy NVARCHAR(50),
    UpdatedBy NVARCHAR(50),
    IsActive BIT DEFAULT 1,
    IsDeleted BIT DEFAULT 0,
    DisplayOrder INT DEFAULT 0
);


Scaffold-DbContext "Data Source=.;Initial Catalog=SAMMI_ECOMMERCE;Integrated Security=True;Trust Server Certificate=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models