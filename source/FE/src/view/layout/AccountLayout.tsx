import { ReactNode } from 'react';
import { Box, Container, Stack, useTheme } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import Nav from './nav';
import CustomBreadcrumbs from 'src/components/custom-breadcrum';
import IconifyIcon from 'src/components/Icon';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

type Props = {
    children: ReactNode;
};

export default function AccountLayout({ children }: Props) {
    const mdUp = useResponsive('up', 'md');
    const theme = useTheme();
    const { t } = useTranslation();

    const breadcrumbItems = [
        { label: t('home'), href: '/', icon: <IconifyIcon color='primary' icon='healthicons:home-outline' /> },
        { label: t('my_account'), href: '/account/my-profile' },
    ];


    return (
        <Container
            sx={{
                maxWidth: '1440px !important',
                pt: { xs: 4, md: 8 },
                pb: { xs: 3, md: 5 },
                px: { xs: 4, md: 8 },
            }}
        >
            <Box sx={{
                mb: '1rem',
                backgroundColor: theme.palette.grey[100],
            }}>
                <CustomBreadcrumbs items={breadcrumbItems} />
            </Box>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={{ xs: 2, md: 3 }}
                sx={{ minHeight: 'calc(100vh - 2rem)' }}
            >
                {mdUp && <Nav open={false} onClose={() => { }} />}

                <Box sx={{ flexGrow: 1 }}>
                    {children}
                </Box>
            </Stack>
        </Container>
    );
}
