"use client"

import { NextPage } from "next"

//MUI
import { Box, Container, CssBaseline, Toolbar, useTheme, } from "@mui/material";

//views
import HorizontalLayout from "./HorizontalLayout";


type TProps = {
    children: React.ReactNode
}

const NoNavLayout: NextPage<TProps> = ({ children }) => {
    const theme = useTheme()
    return (
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
            <CssBaseline />
            <HorizontalLayout open={false} toggleDrawer={() => { }} showBanner={true} />
            <Box
                component='main'
                sx={{
                    backgroundColor:
                        theme => theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            // ? theme.palette.background.paper
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Toolbar />
                <Container
                    sx={{
                        maxWidth: "unset !important",
                        width: "100vw",
                        overflow: "auto",
                        px: '0 !important',
                        maxHeight: {
                            xs: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 16px)`, // Mobile
                            md: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 32px)`, // Desktop
                        },
                    }}>
                    {children}
                </Container>
            </Box>
        </Box >
    )
}

export default NoNavLayout