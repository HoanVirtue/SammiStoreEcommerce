import React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, IconButton, Typography, useTheme, Button } from '@mui/material';
import Banner1 from '/public/images/banner1.jpg';
import Banner2 from '/public/images/banner2.jpg';
import BannerMain from '/public/images/bannermain.jpg';
import Image, { StaticImageData } from 'next/image';
import IconifyIcon from 'src/components/Icon';
import { motion } from 'framer-motion'; // Import Framer Motion
import Link from 'next/link'; // Import Link từ next/link
import { useTranslation } from 'react-i18next';

interface Banner {
    id: number;
    image: StaticImageData;
    title?: string;
    description?: string;
}

const banners: Banner[] = [
    {
        id: 1,
        image: BannerMain,
        title: 'Banner Main',
        description: 'This is the main banner description.',
    },
    {
        id: 2,
        image: Banner1,
    },
    {
        id: 3,
        image: Banner2,
    },
];

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

const Carousel: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear',
        arrows: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        swipe: true,
        draggable: true,
        appendDots: (dots) => (
            <Box
                sx={{
                    margin: '0 auto',
                    width: '100%',
                    padding: 0,
                    listStyle: 'none',
                    zIndex: 2,
                }}
            >
                <ul style={{
                    margin: '0 auto', padding: 0,
                    display: 'flex', gap: '8px',
                    position: 'absolute',
                    bottom: '3rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    justifyContent: 'center'
                }}>
                    {dots}
                </ul>
            </Box>
        ),
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
        <Box sx={{ maxWidth: 'unset', margin: '0 auto', height: { xs: 'auto', md: '616px' } }}>
            <Slider {...settings}>
                {banners.map((banner) => (
                    <Box
                        key={banner.id}
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: { xs: '300px', md: '616px' },
                            overflow: 'hidden',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: false }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Image
                                src={banner.image}
                                alt={banner?.title || 'Banner'}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </motion.div>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                color: 'white',
                                zIndex: 1,
                            }}
                        >
                            {/* Animation for Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                viewport={{ once: false }}
                            >
                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        fontWeight: 'bold',
                                        marginBottom: '1rem',
                                        color: theme.palette.common.white,
                                        fontFamily: '"Dancing Script", cursive',
                                    }}
                                >
                                    {banner?.title}
                                </Typography>
                            </motion.div>

                            {/* Animation for Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.4 }}
                                viewport={{ once: false }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: { xs: '1rem', md: '1.5rem' },
                                        fontWeight: 'normal',
                                        color: theme.palette.common.white,
                                        fontFamily: '"Playfair Display", serif',
                                    }}
                                >
                                    {banner?.description}
                                </Typography>
                            </motion.div>

                            {/* Animation for Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                viewport={{ once: false }}
                            >
                                {banner?.title && (
                                    <Link href="/products" passHref>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: 'white',
                                                padding: '0.75rem 2rem',
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                borderColor: 'white',
                                                marginTop: '1rem',
                                                '&:hover': {
                                                    backgroundColor: 'primary.dark',
                                                },
                                            }}
                                        >
                                            {t('view_more')}
                                        </Button>
                                    </Link>
                                )}
                            </motion.div>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default Carousel;