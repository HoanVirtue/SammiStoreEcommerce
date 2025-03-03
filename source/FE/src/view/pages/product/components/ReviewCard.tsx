import { Avatar, Box, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { Card, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IconifyIcon from "src/components/Icon";
import { useAuth } from "src/hooks/useAuth";
import { TReviewItem } from "src/types/review";
import { toFullName } from "src/utils";
import { getTimePast } from "src/utils/date";
import UpdateReview from "./UpdateReview";
import ConfirmDialog from "src/components/confirm-dialog";
import { deleteMyReviewAsync } from "src/stores/review/action";
import { AppDispatch, RootState } from "src/stores";
import { useDispatch, useSelector } from "react-redux";

interface TReviewCard {
    item: TReviewItem
}

const StyledCard = styled(Card)(({ theme }) => ({
    position: "relative",
    boxShadow: theme.shadows[8],
    padding: 20,
    ".MuiCardMedia-root.MuiCardMedia-media": {
        objectFit: "contain"
    }
}));

const ReviewCard = (props: TReviewCard) => {

    const [openUpdateReview, setOpenUpdateReview] = useState({
        open: false,
        id: ""
    });

    const [openDeleteReview, setOpenDeleteReview] = useState({
        open: false,
        id: ""
    });

    const { item } = props
    const { i18n, t } = useTranslation()
    const { user } = useAuth()
    const dispatch: AppDispatch = useDispatch();
    const { reviews, isSuccessUpdate, isErrorUpdate, isLoading,
        errorMessageUpdate, isSuccessDelete, isErrorDelete, errorMessageDelete, typeError } = useSelector((state: RootState) => state.review)

    const updatedAt = item?.updatedAt ? new Date(item.updatedAt) : new Date();
    const content = item?.content || t('no_content');

    const handleCloseUpdateReview = () => {
        setOpenUpdateReview({
            open: false,
            id: ""
        })
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteReview({
            open: false,
            id: ""
        })
    }

    const handleDeleteReview = () => {
        dispatch(deleteMyReviewAsync(openDeleteReview.id))
    }

    /// update Review
    useEffect(() => {
        if (isSuccessUpdate) {
            handleCloseUpdateReview()
        }
    }, [isSuccessUpdate, isErrorUpdate, errorMessageUpdate, typeError])


    //delete Review
    useEffect(() => {
        if (isSuccessDelete) {
            handleCloseDeleteDialog()
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete])

    return (
        <>
            <UpdateReview
                idReview={openUpdateReview.id}
                open={openUpdateReview.open}
                onClose={handleCloseUpdateReview}
            />
            <ConfirmDialog
                open={openDeleteReview.open}
                onClose={handleCloseDeleteDialog}
                handleCancel={handleCloseDeleteDialog}
                handleConfirm={handleDeleteReview}
                title={"Xác nhận xóa đánh giá"}
                description={"Bạn có chắc xóa đánh giá này không?"}
            />
            <StyledCard sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={item?.user?.avatar} />
                    <Box sx={{ width: "100%", flexDirection: "column" }}>
                        <Typography>
                            {toFullName(item?.user?.lastName || "", item?.user?.middleName || "", item?.user?.firstName || "", i18n.language)}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Rating name="read-only" defaultValue={item?.star} precision={0.1} readOnly sx={{ fontSize: '1rem', mt: 1 }} />
                            <Typography>{getTimePast(updatedAt, t)}</Typography>
                        </Box>
                    </Box>
                </Box>
                <Box mt={1}>
                    <Typography>{content}</Typography>
                </Box>
                {user?._id === item?.user?._id && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                        <Tooltip title={t("edit")}>
                            <IconButton onClick={() => setOpenUpdateReview({ open: true, id: item._id })}>
                                <IconifyIcon icon='tabler:edit' />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("delete")}>
                            <IconButton onClick={() => setOpenDeleteReview({ open: true, id: item._id })}>
                                <IconifyIcon icon='mdi:delete-outline' />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </StyledCard>
        </>
    )
}

export default ReviewCard