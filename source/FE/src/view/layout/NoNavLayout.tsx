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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HorizontalLayout open={false} toggleDrawer={() => { }} isHideMenu />
            <Box
                component='main'
                sx={{
                    backgroundColor:
                        theme => theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Toolbar />
                <Container
                    sx={{
                            m: 4,
                            width: "calc(100vw - 32px)", 
                            maxWidth: "unset !important",
                            overflow: "auto",
                            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
                            p: "0 !important",
                            borderRadius: "15px"
                    }}>
                    {children}
                </Container>
            </Box>
        </Box >
    )
}

export default NoNavLayout