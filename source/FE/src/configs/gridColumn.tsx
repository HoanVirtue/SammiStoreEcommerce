// src/configs/orderGridConfig.ts
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { styled, Chip, ChipProps, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { formatDate, formatPrice } from 'src/utils'
import Image from 'src/components/image'

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
        return <Typography>{row?.customerName}</Typography>
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
      field: 'customerPhone',
      headerName: t('customer_phone'),
      flex: 1,
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params
        return <Typography>{row?.phoneNumber}</Typography>
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
        return <Typography>{row?.orderStatus}</Typography>
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
        return <Typography>{row?.shippingStatus}</Typography>
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
        return <Typography>{row?.orderStatus}</Typography>
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
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "postal_code",
      headerName: t("postal_code"),
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.postalCode}</Typography>,
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
      minWidth: 200,
      maxWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.code}</Typography>,
    },
    {
      field: "provinceId",
      headerName: t("province_name"),
      flex: 1,
      minWidth: 200,
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.provinceName}</Typography>,
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
      renderCell: (params: GridRenderCellParams) => <Typography>{params.row.name}</Typography>,
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
          <Typography>{row?.name}</Typography>
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
          <Typography>{`${formatPrice(row?.price)} VND`}</Typography>
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