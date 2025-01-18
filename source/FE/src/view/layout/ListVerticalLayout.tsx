"use client"

import React, { useEffect, useMemo } from "react";
import { NextPage } from "next"

//MUI
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListItemTextProps, styled, Tooltip } from "@mui/material";

//conponents
import IconifyIcon from "src/components/Icon";
import { TVerticalLayoutItem, VerticalLayoutItems } from "src/configs/layout";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { hexToRGBA } from "src/utils/hex-to-rgba";
import { PERMISSIONS } from "src/configs/permission";
import { useAuth } from "src/hooks/useAuth";

type TProps = {
    open: boolean
}

type TListItem = {
    level: number,
    openItem: {
        [key: string]: boolean
    }
    items: any
    setOpenItem: React.Dispatch<React.SetStateAction<{
        [key: string]: boolean
    }>>
    disabled: boolean
    setActivePath: React.Dispatch<React.SetStateAction<string | null>>
    activePath: string | null
}

interface TListItemText extends ListItemTextProps {
    active: boolean
}

const StyledListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => ({
    ".MuiTypography-root.MuiTypography-body1.MuiListItemText-primary": {
        textOverflow: "ellipsis",
        overflow: "hidden",
        display: "block",
        width: "100%",
        color: active
            ? `${theme.palette.primary.main}`
            : `rgba(${theme.palette.customColors.main}, 0.78)`,
        fontWeight: active ? 600 : 400
    }
}))

const RecursiveListItem: NextPage<TListItem> = ({ level, openItem, items, setOpenItem, disabled, activePath, setActivePath }) => {

    const theme = useTheme()
    const router = useRouter()

    const handleClick = (title: string) => {
        if (!disabled) {
            setOpenItem(prev => ({
                // ...prev,
                [title]: !prev[title]
            }))
        }
    }

    const handleSelectItem = (path: string) => {
        setActivePath(path)
        if (path) {
            router.push(path)
        }
    }
    const hasActiveChild = (item: TVerticalLayoutItem): boolean => {
        if (!item.children) {
            return item.path === activePath
        }
        return item.children.some((item: TVerticalLayoutItem) => hasActiveChild(item))
    }
    return (
        <>
            {items?.map((item: any) => {
                const activeParent = hasActiveChild(item)
                return (
                    <React.Fragment key={item.title}>
                        <ListItemButton
                            sx={{
                                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px !important`,
                                margin: "1px 0",
                                backgroundColor:
                                    ((activePath && item.path === activePath) || !!openItem[item.title] || activeParent)
                                        ? `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`
                                        : theme.palette.background.paper,
                            }}
                            onClick={() => {
                                if (item.children) {
                                    handleClick(item.title)
                                }
                                if (item.path) {
                                    handleSelectItem(item.path)
                                }
                            }}
                        >
                            <ListItemIcon>
                                <Box sx={{
                                    borderRadius: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor:
                                        ((activePath && item.path === activePath) || !!openItem[item.title] || activeParent)
                                            ? `${theme.palette.primary.main} !important`
                                            : theme.palette.background.paper,
                                }}>
                                    <IconifyIcon icon={item.icon}
                                        style={{
                                            color:
                                                (activePath && item.path === activePath) || !!openItem[item.title] || activeParent
                                                    ? `${theme.palette.customColors.lightPaperBg}`
                                                    : `rgba(${theme.palette.customColors.main}, 0.78)`
                                        }} />
                                </Box>
                            </ListItemIcon>
                            {!disabled && (
                                <Tooltip title={item?.title}>
                                    <StyledListItemText
                                        primary={item?.title}
                                        active={(activePath && item.path === activePath) || !!openItem[item.title] || activeParent}
                                    />
                                </Tooltip>
                            )}
                            {item?.children && item?.children.length > 0 && (
                                <>
                                    {openItem[item.title] ? (
                                        <IconifyIcon icon='iconamoon:arrow-up-2'
                                            style={{
                                                color:
                                                    (activePath && item.path === activePath) || !!openItem[item.title] || activeParent
                                                        ? `${theme.palette.primary.main}`
                                                        : `rgba(${theme.palette.customColors.main}, 0.78)`,
                                                transform: 'rotate(180deg)',
                                            }} />
                                    )
                                        : (
                                            <IconifyIcon icon='iconamoon:arrow-up-2'
                                                style={{
                                                    color:
                                                        (activePath && item.path === activePath) || !!openItem[item.title] || activeParent
                                                            ? `${theme.palette.primary.main}`
                                                            : `rgba(${theme.palette.customColors.main}, 0.78)`,
                                                }} />
                                        )
                                    }
                                </>
                            )}
                        </ListItemButton>
                        {
                            item.children && item.children.length > 0 && (
                                <Collapse in={openItem[item.title]} timeout="auto" unmountOnExit>
                                    <RecursiveListItem
                                        level={level + 1}
                                        openItem={openItem}
                                        items={item.children}
                                        setOpenItem={setOpenItem}
                                        disabled={disabled}
                                        activePath={activePath}
                                        setActivePath={setActivePath}
                                    />
                                </Collapse>
                            )
                        }
                    </React.Fragment>
                )
            })}
        </>
    )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {
    const [openItem, setOpenItem] = React.useState<{ [key: string]: boolean }>({})
    const [activePath, setActivePath] = React.useState<null | string>('')

    const ListVerticalItem = VerticalLayoutItems()


    console.log('openItem', ListVerticalItem)
    //router
    const router = useRouter()

    //auth
    const { user } = useAuth()

    //permission
    const permissionUser = user?.role?.permissions
        ? user?.role?.permissions.includes(PERMISSIONS.BASIC)
            ? [PERMISSIONS.DASHBOARD]
            : user?.role?.permissions
        : []

    const findParentActivePath = (items: TVerticalLayoutItem[], activePath: string) => {
        for (const item of items) {
            if (item.path === activePath) {
                return item.title
            }
            if (item.children && item.children.length > 0) {
                const child: any = findParentActivePath(item.children, activePath)
                if (child) {
                    return item.title
                }
            }
        }
        return null
    }


    const hasPermission = (item: any, permissionUser: string[]) => {
        return permissionUser.includes(item.permission)
            || !item.permission
    }

    const filterMenuByPermission = (menu: any[], permissionUser: string[]) => {
        if (menu) {
            return menu.filter((item) => {
                if (hasPermission(item, permissionUser)) {
                    if (item.children && item.children.length > 0) {
                        item.children = filterMenuByPermission(item.children, permissionUser)
                    }
                    if (!item?.children?.length && !item.path) {
                        return false
                    }
                    return true
                }
                return false
            })
        }
        return []
    }


    //set open item in menu
    useEffect(() => {
        if (!open) {
            // handleToggleAll()
            setOpenItem({})
        }
    }, [open])

    const memoFilterMenu = useMemo(() => {
        if (permissionUser.includes(PERMISSIONS.ADMIN)) {
            return ListVerticalItem
        }
        return filterMenuByPermission(ListVerticalItem, permissionUser)
    }, [ListVerticalItem, permissionUser])

    //active path in menu
    useEffect(() => {
        if (router.asPath) {
            const parentTitle = findParentActivePath(memoFilterMenu, router.asPath)
            if (parentTitle) {
                setOpenItem({
                    [parentTitle]: true,
                })
            }
            setActivePath(router.asPath)
        }
    }, [router.asPath])

    // const handleToggleAll = () => {
    //     setOpenItem({})
    // }

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                padding: 0
            }}
            component='nav'
        >
            <RecursiveListItem
                level={1}
                openItem={openItem}
                items={memoFilterMenu}
                setOpenItem={setOpenItem}
                disabled={!open}
                activePath={activePath}
                setActivePath={setActivePath}
            />
        </List>
    )
}

export default ListVerticalLayout