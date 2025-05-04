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
            title: t('manage_system'),
            icon: 'icon-park-outline:system',
            children: [
                {
                    title: t('dashboard'),
                    icon: 'mage:dashboard-bar-notification',
                    path: ROUTE_CONFIG.DASHBOARD,
                },
            ]
        },
        {
            title: t('manage_order'),
            icon: 'lsicon:work-order-info-outline',
            children: [
                {
                    title: t('order_list'),
                    icon: 'lsicon:order-outline',
                    path: ROUTE_CONFIG.MANAGE_ORDER.ORDER,
                },
            ]
        },
        {
            title: t('manage_goods_receipt'),
            icon: 'fluent:receipt-bag-20-regular',
            children: [
                {
                    title: t('receipt_list'),
                    icon: 'material-symbols-light:receipt-long-outline-rounded',
                    path: ROUTE_CONFIG.GOODS_RECEIPT.RECEIPT,
                    // permission: PERMISSIONS.GOODS_RECEIPT.RECEIPT_LIST.VIEW
                },
            ]
        },
        {
            title: t('manage_promotion'),
            icon: 'lsicon:badge-promotion-outline',
            children: [
                {
                    title: t('event_list'),
                    icon: 'carbon:event',
                    path: ROUTE_CONFIG.MANAGE_PROMOTION.EVENT,
                    // permission: PERMISSIONS.MANAGE_PROMOTION.EVENT.VIEW
                },
                {
                    title: t('list_voucher'),
                    icon: 'ci:ticket-voucher',
                    path: ROUTE_CONFIG.MANAGE_PROMOTION.VOUCHER,
                    // permission: PERMISSIONS.MANAGE_PROMOTION.VOUCHER.VIEW
                },
            ]
        },
        {
            title: t('product_manage'),
            icon: 'fluent-mdl2:product-release',
            children: [
                {
                    title: t('product_list'),
                    icon: 'fluent-mdl2:product-catalog',
                    path: ROUTE_CONFIG.MANAGE_PRODUCT.PRODUCT,
                    // permission: PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW
                },
            ]
        },
        {
            title: t('manage_user'),
            icon: 'iconoir:user',
            children: [
                {
                    title: t('employee'),
                    icon: 'clarity:employee-group-line',
                    path: ROUTE_CONFIG.USER.EMPLOYEE,
                },
                {
                    title: t('customer'),
                    icon: 'ix:customer',
                    path: ROUTE_CONFIG.USER.CUSTOMER,
                },
                {
                    title: t('supplier'),
                    icon: 'carbon:scis-transparent-supply',
                    path: ROUTE_CONFIG.USER.SUPPLIER,
                }
            ]
        },
        {
            title: t('manage_category'),
            icon: 'material-symbols-light:category-outline-rounded',
            children: [
                {
                    title: t('product_category'),
                    icon: 'fluent-mdl2:product-variant',
                    path: ROUTE_CONFIG.MANAGE_CATEGORY.PRODUCT_CATEGORY,
                },
                {
                    title: t('brand'),
                    icon: 'mynaui:brand-slack',
                    path: ROUTE_CONFIG.MANAGE_CATEGORY.BRAND,
                },
                {
                    title: t('banner'),
                    icon: 'material-symbols:planner-banner-ad-pt-outline-rounded',
                    path: ROUTE_CONFIG.MANAGE_CATEGORY.BANNER,
                },
                {
                    title: t('payment_method'),
                    icon: 'streamline:payment-10',
                    path: ROUTE_CONFIG.MANAGE_CATEGORY.PAYMENT_METHOD,
                },
            ]
        },
        // {
        //     title: t('system'),
        //     icon: 'icon-park-outline:system',
        //     children: [
        //         {
        //             title: t('user'),
        //             icon: 'iconoir:user',
        //             path: ROUTE_CONFIG.SYSTEM.USER,
        //             // permission: PERMISSIONS.SYSTEM.USER.VIEW
        //         },
        //         {
        //             title: t('role'),
        //             icon: 'oui:app-users-roles',
        //             path: ROUTE_CONFIG.SYSTEM.ROLE,
        //             // permission: PERMISSIONS.SYSTEM.ROLE.VIEW
        //         }
        //     ]
        // },
        {
            title: t('address'),
            icon: 'fluent:location-settings-20-regular',
            children: [
                {
                    title: t('province'),
                    icon: 'healthicons:city-outline',
                    path: ROUTE_CONFIG.ADDRESS.PROVINCE,
                },
                {
                    title: t('district'),
                    icon: 'fluent:building-home-20-regular',
                    path: ROUTE_CONFIG.ADDRESS.DISTRICT,
                },
                {
                    title: t('ward'),
                    icon: 'material-symbols-light:home-work-outline-rounded',
                    path: ROUTE_CONFIG.ADDRESS.WARD,
                },
            ]
        },
    ]
}