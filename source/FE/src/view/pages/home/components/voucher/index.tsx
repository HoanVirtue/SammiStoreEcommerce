import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, IconButton, Typography, useTheme, Button } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import IconifyIcon from 'src/components/Icon';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import Voucher1 from '/public/images/coupon_7_img_medium.png';
import Voucher2 from '/public/images/coupon_1_img_medium.png';
import Voucher3 from '/public/images/coupon_2_img_medium.png';
import Voucher4 from '/public/images/coupon_3_img_medium.png';
import { Card } from '@mui/material';

const Vouchers = [
    {
        id: 1,
        image: Voucher1,
        code: 'SAMMI000080',
        description: 'Mã giảm 8% tối đa 80K cho đơn hàng từ 599K áp dụng với một số sản phẩm.'
    },
    {
        id: 2,
        image: Voucher2,
        code: 'SAMMI000090',
        description: 'Mã giảm 30K cho đơn hàng từ 599K áp dụng với một số sản phẩm nhất định.'
    },
    {
        id: 3,
        image: Voucher3,
        code: 'SAMMI000091',
        description: 'Mã giảm 8% tối đa 30K cho đơn hàng từ 249K áp dụng với một số sản phẩm.'
    },
    {
        id: 4,
        image: Voucher4,
        code: 'SAMMI000092',
        description: 'Mã giảm 10K cho đơn hàng từ 249K áp dụng với một số sản phẩm nhất định.			'
    },
    {
        id: 5,
        image: Voucher2,
        code: 'SAMMI000093',
        description: 'Mã giảm 30K cho đơn hàng từ 599K áp dụng với một số sản phẩm nhất định.'
    },
    {
        id: 6,
        image: Voucher3,
        code: 'SAMMI000060',
        description: 'Mã giảm 8% tối đa 30K cho đơn hàng từ 249K áp dụng với một số sản phẩm.'
    },
]


function PrevArrow(props: any) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                left: "16px",
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                    color: "rgba(0, 0, 0, 1)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
            }}
        >
            <IconifyIcon icon="lucide:chevron-left" fontSize="2rem" />
        </IconButton>
    );
}

function NextArrow(props: any) {
    const { onClick } = props;
    return (
        <IconButton
            onClick={onClick}
            sx={{
                position: "absolute",
                right: "16px",
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "&:hover": {
                    color: "rgba(0, 0, 0, 1)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
            }}
        >
            <IconifyIcon icon="lucide:chevron-right" fontSize="2rem" />
        </IconButton>
    );
}

interface ListVoucherProps {
    initialData?: any[];
}

const ListVoucher: React.FC<ListVoucherProps> = ({ initialData }) => {
    const theme = useTheme();
    const { t } = useTranslation();

    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        swipe: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    return (
        <Box sx={{ maxWidth: '1440px', margin: '4px auto', height: { xs: 'auto', md: '216px' }, backgroundColor: theme.palette.background.paper }}>
            <Slider {...settings}>
                {Vouchers.map((voucher) => (
                    <Box
                        key={voucher.id}
                        sx={{ width: '345px', mr: '10px' }}
                    >
                        <Card sx={{ pl: '15px', width: '315px', height: '167px', pr: '15px', pb: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.1)', }}>
                            <Box sx={{ width: '103px', height: '131px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    src={voucher.image}
                                    alt={'voucher'}
                                    width={103}
                                    style={{ objectFit: 'contain', width: '103px', height: 'auto' }}
                                    priority
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column', pl: '15px' }}>
                                <Typography color={theme.palette.secondary.main} sx={{ fontSize: '15px', fontWeight: 'bold' }}>NHẬP MÃ: {voucher.code}</Typography>
                                <Typography color={theme.palette.grey[600]} fontSize="13px">{voucher.description}</Typography>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', mt: '2px' }}>
                                    <Button variant="contained"
                                        sx={{
                                            backgroundColor: theme.palette.secondary.main, color: 'white', marginBottom: '3px', borderRadius: '99px', width: '100px', textWrap: 'nowrap', fontSize: '12px',
                                            "&:hover": { backgroundColor: theme.palette.primary.main},
                                        }}>Sao chép mã</Button>
                                    <Typography sx={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontSize: '12px' }}>Điều kiện</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default ListVoucher;