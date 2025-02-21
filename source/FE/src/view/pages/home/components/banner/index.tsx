import { Box, Grid } from '@mui/material';
import React from 'react';
import Carousel from './Carousel';
import Image from 'next/image';
import SideBanner1 from '/public/images/right_banner_1.jpg'
import SideBanner2 from '/public/images/right_banner_2.jpg'


const Banner: React.FC = () => {

    return (
        <Grid container spacing={4} md={12} xs={12} sx={{ width: '100%', margin: 0 }}>
            <Grid item md={12} xs={12} sx={{paddingLeft: '0 !important', paddingTop: '0 !important'}}>
                <Carousel />
            </Grid>
            {/* <Grid item container md={3} xs={12} spacing={4}>
                <Grid item md={12} xs={12}> 
                    <Image src={SideBanner1} alt="Banner 1" width={350} height={300} style={{ width: '100%', height: '100%' }} />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Image src={SideBanner2} alt="Banner 2" width={350} height={300} style={{ width: '100%', height: '100%' }} />
                </Grid>
            </Grid> */}
        </Grid>
    );
};

export default Banner;