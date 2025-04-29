import { Box, Grid, Stack, Typography, Rating, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ReviewCard from '../components/ReviewCard'
import { TReviewItem } from 'src/types/review'
import { getAllReviewByProductId, getOverallReview } from 'src/services/review'

interface ProductReviewProps {
    productId: number;
}

interface OverallReview {
    totalRating: number;
    totalRating5: number;
    totalRating4: number;
    totalRating3: number;
    totalRating2: number;
    totalRating1: number;
    totalComment: number;
    totalImage: number;
}

const ProductReview = ({ productId }: ProductReviewProps) => {
    const [listReview, setListReview] = useState<TReviewItem[]>([])
    const [overallReview, setOverallReview] = useState<OverallReview | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [selectedFilter, setSelectedFilter] = useState<string>('all')
    const theme = useTheme()
    const { t } = useTranslation()

    const fetchReviews = async () => {
        setLoading(true)
        try {
            const response = await getAllReviewByProductId({ 
                params: {
                    productId: productId,
                    rateNumber: 5,
                    typeReview: 0,
                    take: -1,
                    skip: 0,
                    paging: false,
                    orderBy: "name",
                    dir: "asc",
                    keywords: "''",
                    filters: ""
                }
            })
            if (response?.result?.subset) {
                setListReview(response.result.subset)
            }
        } catch (error) {
            console.error('Error fetching reviews:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchOverallReview = async () => {
        try {
            const response = await getOverallReview(productId)
            if (response?.result) {
                setOverallReview(response.result)
            }
        } catch (error) {
            console.error('Error fetching overall review:', error)
        }
    }

    useEffect(() => {
        if (productId) {
            fetchReviews()
            fetchOverallReview()
        }
    }, [productId])

    const getFilteredReviews = () => {
        if (!Array.isArray(listReview)) return []
        if (selectedFilter === 'all') return listReview
        const rating = parseInt(selectedFilter)
        return listReview.filter(review => review.rating === rating)
    }

    const filteredReviews = getFilteredReviews()

    const averageRating = overallReview?.totalRating || 0

    return (
        <Box sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "15px",
            py: 5,
            px: 4
        }}>
            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
                {t('product_reviews')}
            </Typography>

            <Grid container spacing={4}>
                {/* Rating Summary Section */}
                <Grid item xs={12} md={3}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography variant="h3" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 1 }}>
                            {averageRating.toFixed(1)}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                            trên 5
                        </Typography>
                        <Rating 
                            value={averageRating} 
                            readOnly 
                            precision={0.1}
                            sx={{ 
                                color: theme.palette.primary.main,
                                mb: 2,
                                '& .MuiRating-icon': {
                                    color: theme.palette.primary.main
                                }
                            }}
                        />
                    </Box>
                </Grid>

                {/* Reviews List Section */}
                <Grid item xs={12} md={9}>
                    <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                        <Button 
                            variant={selectedFilter === 'all' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedFilter('all')}
                            color="primary"
                            sx={{ minWidth: 100 }}
                        >
                            Tất Cả
                        </Button>
                        <Button 
                            variant={selectedFilter === '5' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedFilter('5')}
                            color="primary"
                            sx={{ minWidth: 100 }}
                        >
                            5 Sao ({overallReview?.totalRating5 || 0})
                        </Button>
                        <Button 
                            variant={selectedFilter === '4' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedFilter('4')}
                            color="primary"
                            sx={{ minWidth: 100 }}
                        >
                            4 Sao ({overallReview?.totalRating4 || 0})
                        </Button>
                        <Button 
                            variant={selectedFilter === '3' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedFilter('3')}
                            color="primary"
                            sx={{ minWidth: 100 }}
                        >
                            3 Sao ({overallReview?.totalRating3 || 0})
                        </Button>
                        <Button 
                            variant={selectedFilter === '2' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedFilter('2')}
                            color="primary"
                            sx={{ minWidth: 100 }}
                        >
                            2 Sao ({overallReview?.totalRating2 || 0})
                        </Button>
                        <Button 
                            variant={selectedFilter === '1' ? 'contained' : 'outlined'}
                            onClick={() => setSelectedFilter('1')}
                            color="primary"
                            sx={{ minWidth: 100 }}
                        >
                            1 Sao ({overallReview?.totalRating1 || 0})
                        </Button>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                        <Button 
                            variant="outlined" 
                            color="primary"
                            sx={{ borderRadius: '20px' }}
                        >
                            Có Bình Luận ({overallReview?.totalComment || 0})
                        </Button>
                        <Button 
                            variant="outlined"
                            color="primary"
                            sx={{ borderRadius: '20px' }}
                        >
                            Có Hình Ảnh / Video ({overallReview?.totalImage || 0})
                        </Button>
                    </Stack>

                    <Stack spacing={2}>
                        {Array.isArray(filteredReviews) && filteredReviews.map((review: TReviewItem) => (
                            <ReviewCard 
                                key={review.id} 
                                item={review}
                                onReviewUpdated={fetchReviews}
                            />
                        ))}
                        {(!Array.isArray(filteredReviews) || filteredReviews.length === 0) && (
                            <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                                {t('no_reviews_found')}
                            </Typography>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProductReview
