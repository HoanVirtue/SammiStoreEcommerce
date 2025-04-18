// src/configs/orderGridConfig.ts
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { styled, Chip, ChipProps, Typography, useTheme, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { formatDate, formatPrice } from 'src/utils'
import Image from 'src/components/image'
import { getReceiptStatusLabel } from 'src/configs/receipt'
import { PaymentStatus, ShippingStatus, OrderStatus } from 'src/configs/order'
import { useMemo } from 'react'

const StyledPublicProduct = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: "#28c76f29",
  color: "#28c76f",
  fontSize: "14px",
  padding: "8px 4px",
  fontWeight: 600
}))

const StyledPrivateProduct = styled(Chip)<ChipProps>(({ theme }) => ({
  backgroundColor: "#da251d29",
  color: "#da251d",
  fontSize: "14px",
  padding: "8px 4px",
  fontWeight: 600
}))

interface TStatusChip extends ChipProps {
  background: string
}

const StyledOrderStatus = styled(Chip)<TStatusChip>(({ theme, background }) => ({
  backgroundColor: `${background}29`,
  color: background,
  fontSize: "14px",
  padding: "8px 4px",
  fontWeight: 600
}))

export const getOrderColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: 'customerName',
      headerName: t('customer_name'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return <Typography sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
        }}>{row?.customerName} - {row?.phoneNumber}</Typography>
      }
    },
    {
      field: 'customerAddress',
      headerName: t('customer_address'),
      flex: 1,
      minWidth: 300,
      maxWidth: 300,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return <Typography sx={{ textWrap: 'wrap' }}>{row?.customerAddress}</Typography>
      }
    },
    {
      field: 'orderDate',
      headerName: t('place_order_date'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>
            {formatDate(row?.createdDate, { dateStyle: "medium", timeStyle: "short" })}
          </Typography>
        )
      }
    },
    {
      field: 'quantity',
      headerName: t('quantity'),
      flex: 1,
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return <Typography>{row?.totalQuantity}</Typography>
      }
    },
    {
      field: 'total_price',
      headerName: t('total_price'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return <Typography>{row?.totalPrice}</Typography>
      }
    },
    {
      field: 'paymentStatus',
      headerName: t('payment_status'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const status = row?.paymentStatus
        let background = theme.palette.grey[500]
        let label = ''

        switch (status) {
          case PaymentStatus.Pending.label:
            background = theme.palette.warning.main
            label = t(PaymentStatus.Pending.title)
            break
          case PaymentStatus.Unpaid.label:
            background = theme.palette.error.main
            label = t(PaymentStatus.Unpaid.title)
            break
          case PaymentStatus.Paid.label:
            background = theme.palette.success.main
            label = t(PaymentStatus.Paid.title)
            break
          case PaymentStatus.Failed.label:
            background = theme.palette.error.main
            label = t(PaymentStatus.Failed.title)
            break
        }

        return <StyledOrderStatus background={background} label={label} />
      }
    },
    {
      field: 'shippingStatus',
      headerName: t('shipping_status'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const status = row?.shippingStatus
        let background = theme.palette.grey[500]
        let label = ''

        switch (status) {
          case ShippingStatus.NotShipped.label:
            background = theme.palette.warning.main
            label = t(ShippingStatus.NotShipped.title)
            break
          case ShippingStatus.Processing.label:
            background = theme.palette.info.main
            label = t(ShippingStatus.Processing.title)
            break
          case ShippingStatus.Delivered.label:
            background = theme.palette.success.main
            label = t(ShippingStatus.Delivered.title)
            break
          case ShippingStatus.Lost.label:
            background = theme.palette.error.main
            label = t(ShippingStatus.Lost.title)
            break
        }

        return <StyledOrderStatus background={background} label={label} />
      }
    },
    {
      field: 'orderStatus',
      headerName: t('order_status'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const status = row?.orderStatus
        let background = theme.palette.grey[500]
        let label = ''

        switch (status) {
          case OrderStatus.Pending.label:
            background = theme.palette.warning.main
            label = t(OrderStatus.Pending.title)
            break
          case OrderStatus.WaitingForPayment.label:
            background = theme.palette.warning.main
            label = t(OrderStatus.WaitingForPayment.title)
            break
          case OrderStatus.Processing.label:
            background = theme.palette.info.main
            label = t(OrderStatus.Processing.title)
            break
          case OrderStatus.Completed.label:
            background = theme.palette.success.main
            label = t(OrderStatus.Completed.title)
            break
          case OrderStatus.Cancelled.label:
            background = theme.palette.error.main
            label = t(OrderStatus.Cancelled.title)
            break
        }

        return <StyledOrderStatus background={background} label={label} />
      }
    },
  ]
}

export const getProvinceColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "province_name",
      headerName: t("province_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
    },
    {
      field: "province_code",
      headerName: t("province_code"),
      minWidth: 300,
      maxWidth: 300,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "postal_code",
      headerName: t("postal_code"),
      minWidth: 300,
      maxWidth: 300,
      renderCell: (params: GridRenderCellParams) => <Typography sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
      }}>{params.row.postalCode}</Typography>,
    },
  ];
}

export const getDistrictColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "name",
      headerName: t("district_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
    },
    {
      field: "code",
      headerName: t("district_code"),
      minWidth: 300,
      maxWidth: 300,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "provinceId",
      headerName: t("province_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
      }}>{params.row.provinceName}</Typography>,
    },
  ]
}

export const getWardColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "ward_name",
      headerName: t("ward_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => 
        <Tooltip title={params.row.name}>
          <Typography sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>{params.row.name}</Typography>
        </Tooltip>
    },
    {
      field: "ward_code",
      headerName: t("ward_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "district_name",
      headerName: t("district_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.districtName}</Typography>,
    },
    {
      field: "district_code",
      headerName: t("district_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.districtCode}</Typography>,
    },
  ];
}

export const getBrandColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "brand_name",
      headerName: t("brand_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.row.name}</Typography>
      ),
    },
    {
      field: "brand_code",
      headerName: t("brand_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.row.code}</Typography>
      ),
    },
  ];
}

export const getProductColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: 'product_name',
      headerName: t('product_name'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Tooltip title={row?.name}>
            <Typography sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>{row?.name}</Typography>
          </Tooltip>
        )
      }
    },
    {
      field: 'brand',
      headerName: t('brand'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.brandName}</Typography>
        )
      }
    },
    {
      field: 'product_category',
      headerName: t('product_category'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.categoryName}</Typography>
        )
      }
    },
    {
      field: 'price',
      headerName: t('price'),
      minWidth: 150,
      maxWidth: 150,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{`${formatPrice(row?.price)}`}</Typography>
        )
      }
    },
    {
      field: 'stockQuantity',
      headerName: t('stock_quantity'),
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.stockQuantity}</Typography>
        )
      }
    },
    {
      field: 'discount',
      headerName: t('discount'),
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.discount * 100}</Typography>
        )
      }
    },
    {
      field: 'status',
      headerName: t('status'),
      flex: 1,
      minWidth: 140,
      maxWidth: 140,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <>
            {row?.status ? (
              <StyledPublicProduct label={t('public')} />
            ) : (
              <StyledPrivateProduct label={t('private')} />
            )
            }
          </>
        )
      }
    },
  ]
}

export const getProductCategoryColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: 'code',
      headerName: t('product_category_code'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.code}</Typography>
        )
      }
    },
    {
      field: 'name',
      headerName: t('product_category_name'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.name}</Typography>
        )
      }
    },
    {
      field: 'parentName',
      headerName: t('parent_name'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.parentName}</Typography>
        )
      }
    },
    {
      field: 'level',
      headerName: t('category_level'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return (
          <Typography>{row?.level}</Typography>
        )
      }
    },
  ];
}

export const getBannerColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: 'name',
      headerName: t('banner_name'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.row.name}</Typography>
      )
    },

    {
      field: 'level',
      headerName: t('banner_level'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.row.level}</Typography>
      )
    },

    {
      field: 'imageCommand',
      headerName: t('banner_image'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Image src={params.row.imageUrl} alt={params.row.name} width={50} height={50} />
      )
    },

    {
      field: 'createdAt',
      headerName: t('created_at'),
      minWidth: 220,
      maxWidth: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatDate(params.row.createdDate, { dateStyle: "short", timeStyle: "short" })}</Typography>
      )
    }
  ]
}

export const getPaymentMethodColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: 'name',
      headerName: t('payment_method_name'),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{params.row.name}</Typography>
      )
    },
    {
      field: 'createdAt',
      headerName: t('created_at'),
      minWidth: 220,
      maxWidth: 220,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{formatDate(params.row.createdDate, { dateStyle: "short", timeStyle: "short" })}</Typography>
      )
    }
  ]
}

export const getReceiptColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "receipt_code",
      headerName: t("receipt_code"),
      flex: 1,
      minWidth: 300,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "employee",
      headerName: t("employee"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.employeeName}</Typography>,
    },
    {
      field: "receipt_date",
      headerName: t("receipt_date"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{formatDate(params.row.createdDate, { dateStyle: "short", timeStyle: "short" })}</Typography>
    },
    {
      field: "supplier_name",
      headerName: t("supplier_name"),
      minWidth: 150,
      maxWidth: 150,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.supplierName}</Typography>,
    },
    {
      field: "total_price",
      headerName: t("total_price"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{formatPrice(params.row.totalPrice)}</Typography>,
    },
    {
      field: "status",
      headerName: t("status"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        const status = row?.status
        let background = theme.palette.grey[500]
        let label = getReceiptStatusLabel(status)

        switch (status) {
          case "Draft":
            background = theme.palette.grey[500]
            break
          case "PendingApproval":
            background = theme.palette.warning.main
            break
          case "Approved":
            background = theme.palette.success.main
            break
          case "Processing":
            background = theme.palette.info.main
            break
          case "Completed":
            background = theme.palette.success.main
            break
          case "Canceled":
            background = theme.palette.error.main
            break
        }

        return <StyledOrderStatus background={background} label={label} />
      }
    },
  ];
}


export const getVoucherColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "voucher_code",
      headerName: t("voucher_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "voucher_name",
      headerName: t("voucher_name"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>
    },
    {
      field: "event_name",
      headerName: t("event_name"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.eventName}</Typography>
    },
    {
      field: "start_date",
      headerName: t("start_date"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{formatDate(params.row.startDate, { dateStyle: "short", timeStyle: "short" })}</Typography>
    },
    {
      field: "end_date",
      headerName: t("end_date"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{formatDate(params.row.endDate, { dateStyle: "short", timeStyle: "short" })}</Typography>
    },
    {
      field: "discount_name",
      headerName: t("discount_name"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.discountName}</Typography>,
    },
    {
      field: "discount_value",
      headerName: t("discount_value"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.discountValue}</Typography>,
    },
    {
      field: "usage_limit",
      headerName: t("usage_limit"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.usageLimit}</Typography>,
    },
    {
      field: "used_count",
      headerName: t("used_count"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.usedCount}</Typography>,
    },
  ];
}

export const getEventColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  const theme = useTheme()
  return [
    {
      field: "event_image ",
      headerName: t("event_image"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Image src={params.row.imageUrl} alt={params.row.name} width={50} height={50} />,
    },
    {
      field: "event_code",
      headerName: t("event_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "event_name",
      headerName: t("event_name"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>
    },
    {
      field: "start_date",
      headerName: t("start_date"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{formatDate(params.row.startDate, { dateStyle: "short", timeStyle: "short" })}</Typography>,
    },
    {
      field: "end_date",
      headerName: t("end_date"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{formatDate(params.row.endDate, { dateStyle: "short", timeStyle: "short" })}</Typography>,
    },
    {
      field: "event_type",
      headerName: t("event_type"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.eventType}</Typography>,
    },
  ];
}


export const getCustomerColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  return [
    {
      field: "customer_code",
      headerName: t("customer_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
  },
  {
    field: "fullName",
    headerName: t("name"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.fullName}</Typography>,
  },
  {
    field: "phone",
    headerName: t("phone"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.phone}</Typography>,
  },
  {
    field: "email",
    headerName: t("email"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.email}</Typography>,
  },
  {
    field: "gender",
    headerName: t("gender"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>
          {params.row.gender === 1 ? t("male") : params.row.gender === 0 ? t("female") : t("unknown")}
        </Typography>
      ),
    },
  ]
}

export const getEmployeeColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  return [
    {
      field: "employee_code",
      headerName: t("employee_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
  },
  {
    field: "fullName",
    headerName: t("name"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.fullName}</Typography>,
  },
  {
    field: "phone",
    headerName: t("phone"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.phone}</Typography>,
  },
  {
    field: "email",
    headerName: t("email"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.email}</Typography>,
  },
  {
    field: "gender",
    headerName: t("gender"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>
        {params.row.gender === 1 ? t("male") : params.row.gender === 0 ? t("female") : t("unknown")}
      </Typography>
    ),
  },
  ]
}

export const getSupplierColumns = (): GridColDef[] => {
  const { t } = useTranslation()
  return [
    {
      field: "supplier_code",
      headerName: t("supplier_code"),
      minWidth: 200,
      maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
  },
  {
    field: "fullName",
    headerName: t("name"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.fullName}</Typography>,
  },
  {
    field: "phone",
    headerName: t("phone"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.phone}</Typography>,
  },
  {
    field: "email",
    headerName: t("email"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => <Typography>{params.row.email}</Typography>,
  },
  {
    field: "gender",
    headerName: t("gender"),
    minWidth: 200,
    maxWidth: 200,
    renderCell: (params: GridRenderCellParams) => (
      <Typography>
        {params.row.gender === 1 ? t("male") : params.row.gender === 0 ? t("female") : t("unknown")}
      </Typography>
    ),
  },
  ]
}
