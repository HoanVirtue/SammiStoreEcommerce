import { Box, InputLabel, InputLabelProps, styled } from "@mui/material";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

type TCustomSelect = SelectProps & {
    options: { label: string, value: string }[]
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
    "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input": {
        padding: "8px 8px 8px 10px !important",
        height: "38px",
        boxSizing: "border-box"
    },
    "legend": {
        display: "none"
    },
    ".MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium": {
        top: "calc(50% - .6em) !important"
    },
    ".MuiOutlinedInput-notchedOutline": {
        top: "-4px !important",
        bottom: "2px !important"
    }   
}))

const CustomPlaceholder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
    position: 'absolute',
    top: "8px",
    left: "10px",
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({

}))

const CustomSelect = (props: TCustomSelect) => {
    const { value, label, onChange, options, placeholder, fullWidth, ...rest } = props
    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            {((Array.isArray(value) && !value.length) || !value) && (
                <CustomPlaceholder>{placeholder}</CustomPlaceholder>
            )}
            <StyledSelect
                fullWidth={fullWidth}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={value}
                label={label}
                onChange={onChange}
                {...rest}
            >
                {options?.length > 0 ? options?.map((opt) => {
                    return (
                        <StyledMenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </StyledMenuItem>
                    )
                }) : (
                    <StyledMenuItem>
                        No data
                    </StyledMenuItem>
                )}
            </StyledSelect>
        </Box>
    )
}

export default CustomSelect