import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Category from '/public/images/category1.jpg';
import { StaticImageData } from 'next/image';

interface TCategory {
    id: number;
    title: string;
    image: StaticImageData;
}

const categories = [
    {
        id: 1,
        title: 'Danh Mục 1',
        image: Category,
    },
    {
        id: 2,
        title: 'Danh Mục 2',
        image: Category,
    },
    {
        id: 3,
        title: 'Danh Mục 3',
        image: Category,
    },
    {
        id: 4,
        title: 'Danh Mục 1',
        image: Category,
    },
    {
        id: 5,
        title: 'Danh Mục 2',
        image: Category,
    },
    {
        id: 6,
        title: 'Danh Mục 3',
        image: Category,
    },
];

interface OutstandingCategoryProps { }

const OutstandingCategory: React.FC<OutstandingCategoryProps> = () => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6 }} 
            // animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
        >
            <Box sx={{ flexGrow: 1, padding: 4, mt: 10 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
                    {t('outstanding_category')}
                </Typography>
                <Grid container spacing={4}>
                    {categories.map((category: TCategory) => (
                        <Grid item xs={12} sm={4} md={2} key={category.id}>
                            <motion.div
                                whileHover={{
                                    scale: 1.1,
                                    x: [-5, 5, -5, 5, 0],
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 10,
                                    duration: 0.5,
                                }}
                            >
                                <Card sx={{ maxWidth: 345, margin: 'auto', cursor: 'pointer' }}>
                                    <CardMedia
                                        component="img"
                                        height="80"
                                        image={typeof category.image === 'string' ? category.image : category.image.src}
                                        alt={category.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div"
                                            sx={{
                                                padding: 0,
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                "&:hover": {
                                                    color: theme.palette.primary.main
                                                }
                                            }}>
                                            {category.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </motion.div>
    );
};

export default OutstandingCategory;