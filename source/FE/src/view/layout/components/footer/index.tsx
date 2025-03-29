import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Link,
    TextField,
    Button,
    Stack,
    useTheme,
    useMediaQuery,
    styled
} from '@mui/material';
import {
    Facebook,
    Twitter,
    Instagram,
    YouTube,
    Apple,
    Android,
    Payment
} from '@mui/icons-material';

// Styled components
const StyledFooter = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(6, 0),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

const SocialIcon = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const Footer: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <StyledFooter>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Contact Information */}
                    <Grid item xs={12} md={3}>
                        <Box mb={2}>
                            <Typography component="h4" variant="h3" color="primary" noWrap
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "fit-content",
                                    fontWeight: "600",
                                    background: "linear-gradient(to right, #d82e4d, #f26398)",
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    cursor: "pointer"
                                }}>Sammi Stores
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Cửa hàng mỹ phẩm SammiStores.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Địa chỉ: 96 P. Định Công, Phương Liệt, Thanh Xuân, Hà Nội
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Số điện thoại: 0372191612
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: cskh@sammistores.com
                        </Typography>
                        <Stack direction="row" spacing={2} mt={2}>
                            <SocialIcon href="#"><Facebook /></SocialIcon>
                            <SocialIcon href="#"><Twitter /></SocialIcon>
                            <SocialIcon href="#"><Instagram /></SocialIcon>
                            <SocialIcon href="#"><YouTube /></SocialIcon>
                        </Stack>
                    </Grid>

                    {/* About Us */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Về chúng tôi
                        </Typography>
                        <Stack spacing={1}>
                            {['Câu chuyện thương hiệu', 'Điều khoản dịch vụ', 'Tuyển dụng',
                                'Hệ thống cửa hàng', 'Chứng nhận đại lý chính hãng'].map((item) => (
                                    <Link href="#" key={item} color="text.secondary" underline="hover">
                                        {item}
                                    </Link>
                                ))}
                        </Stack>
                    </Grid>

                    {/* Policies */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Chính sách
                        </Typography>
                        <Stack spacing={1}>
                            {['Hướng dẫn mua hàng', 'Quy định và hình thức thanh toán',
                                'Chính sách giao hàng', 'Chính sách đổi trả',
                                'Chính sách tích lũy điểm', 'Chính sách bảo mật thông tin',
                                'Giao hàng siêu tốc 1H'].map((item) => (
                                    <Link href="#" key={item} color="text.secondary" underline="hover">
                                        {item}
                                    </Link>
                                ))}
                        </Stack>
                    </Grid>

                    {/* Newsletter & Payment */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Đăng ký nhận tin
                        </Typography>
                        <Box display="flex" mb={3}>
                            <TextField
                                size="small"
                                placeholder="Nhập địa chỉ email"
                                sx={{ flexGrow: 1, mr: 1 }}
                            />
                            <Button variant="contained" color="primary" sx={{ textWrap: 'nowrap' }}>
                                Đăng ký
                            </Button>
                        </Box>

                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Phương thức thanh toán
                        </Typography>
                        <Box mb={2}>
                            <Payment sx={{ fontSize: 40 }} />
                        </Box>

                        <Typography variant="h6" color="text.primary" gutterBottom>
                            Tải ngay App SammiStores
                        </Typography>
                        <Stack direction={isMobile ? "row" : "column"} spacing={1}>
                            <Button
                                variant="outlined"
                                startIcon={<Apple />}
                                fullWidth
                            >
                                App Store
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Android />}
                                fullWidth
                            >
                                Google Play
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </StyledFooter>
    );
};

export default Footer;
