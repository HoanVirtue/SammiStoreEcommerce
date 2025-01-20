import { useTranslation } from "../../node_modules/react-i18next";
import { ROUTE_CONFIG } from "./route";
import { PERMISSIONS } from "./permission";

export type TVerticalLayoutItem = {
    title: string,
    path?: string,
    icon?: string,
    permission?: string,
    children?: {
        title: string,
        path?: string,
        icon?: string
        permission?: string
    }[],
}

export const VerticalLayoutItems = () => {

    const { t } = useTranslation()
    return [
        {
            title: t('dashboard'),
            icon: 'material-symbols:dashboard-rounded',
            path: ROUTE_CONFIG.DASHBOARD,
            permission: PERMISSIONS.DASHBOARD
        },
        {
            title: t('system'),
            icon: 'icon-park-solid:system',
            children: [
                {
                    title: t('user'),
                    icon: 'typcn:group',
                    path: ROUTE_CONFIG.SYSTEM.USER,
                    permission: PERMISSIONS.SYSTEM.USER.VIEW
                },
                {
                    title: t('role'),
                    icon: 'icon-park-solid:permissions',
                    path: ROUTE_CONFIG.SYSTEM.ROLE,
                    permission: PERMISSIONS.SYSTEM.ROLE.VIEW
                }
            ]
        },
        {
            title: t('manage_order'),
            // icon: 'solar:cosmetic-bold-duotone',
            icon: 'material-symbols:orders-rounded',
            children: [
                {
                    title: t('order_list'),
                    icon: 'material-symbols:orders-rounded',
                    path: ROUTE_CONFIG.MANAGE_ORDER.ORDER,
                    permission: [PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]
                },
                {
                    title: t('review_list'),
                    icon: 'material-symbols-light:reviews',
                    path: ROUTE_CONFIG.MANAGE_ORDER.REVIEW,
                },
            ]
        },
        {
            title: t('product_manage'),
            // icon: 'solar:cosmetic-bold-duotone',
            icon: 'fluent-mdl2:product',
            children: [
                {
                    title: t('product_list'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT,
                },
                {
                    title: t('product_category'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT_CATEGORY,
                },
                {
                    title: t('brand'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.MANAGE_PRODUCT.BRAND,
                },
            ]
        },
        {
            title: t('setting'),
            icon: 'fluent-mdl2:product',
            children: [
                // {
                //     title: t('city'),
                //     icon: 'fluent-mdl2:product-list',
                //     path: ROUTE_CONFIG.SETTING.CITY,
                // },
                {
                    title: t('delivery_method'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.SETTING.DELIVERY_METHOD,
                },
                {
                    title: t('payment_method'),
                    icon: 'material-symbols:orders-rounded',
                    path: ROUTE_CONFIG.SETTING.PAYMENT_METHOD,
                },
                {
                    title: t('banner'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.SETTING.BANNER,
                },
            ]
        },
        {
            title: t('address'),
            icon: 'fluent-mdl2:product',
            children: [
                {
                    title: t('city'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.ADDRESS.CITY,
                },
                {
                    title: t('province'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.ADDRESS.PROVINCE,
                },
                {
                    title: t('ward'),
                    icon: 'fluent-mdl2:product-list',
                    path: ROUTE_CONFIG.ADDRESS.WARD,
                },
            ]
        },
    ]
}