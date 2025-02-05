import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, BoxProps, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel } from '@mui/material';
import { REVIEW_PRODUCT_FILTER } from 'src/configs/product';


interface TProductFilter {
    handleProductFilter: (value: string) => void
}

const StyledProductFilter = styled(Box)<BoxProps>(({ theme }) => ({
    padding: "10px",
    border: `1px solid ${theme.palette.customColors.borderColor}`,
    height: 'fit-content',
    borderRadius: "15px",
    backgroundColor: theme.palette.customColors.bodyBg
}));

const ProductFilter = (props: TProductFilter) => {

    //props
    const { handleProductFilter } = props

    //state

    //translation
    const { t } = useTranslation()

    //theme
    const theme = useTheme();

    const listReviewProduct = REVIEW_PRODUCT_FILTER()

    const onChangeProductFilter = (e: React.ChangeEvent<HTMLInputElement>) =>{
        handleProductFilter(e.target.value)
    }

    return (
        <StyledProductFilter sx={{ width: "100%" }}>
            <FormControl>
                <FormLabel id="radio-review-group" sx={{ 
                    fontWeight: "bold",
                    color: theme.palette.primary.main
                 }}>{t("review")}</FormLabel>
                <RadioGroup
                    aria-labelledby="radio-review-group"
                    name="radio-review-group"
                    onChange={onChangeProductFilter}
                >
                    {listReviewProduct.map((review) => {
                        return (
                            <FormControlLabel
                                key={review.value}
                                value={review.value}
                                control={<Radio />}
                                label={review.label}
                            />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </StyledProductFilter>
    )
}

export default ProductFilter