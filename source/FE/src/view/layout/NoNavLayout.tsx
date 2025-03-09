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
                        width: "100vw",
                        // marginTop: '-4rem',
                        maxWidth: "unset !important",
                        overflow: "auto",
                        maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
                        paddingLeft: "0rem !important",
                        paddingRight: "0rem !important",
                        // borderRadius: "15px"
                    }}>
                    {children}
                </Container>
            </Box>
        </Box >
    )
}

export default NoNavLayout