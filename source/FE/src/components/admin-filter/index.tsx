import React, { useState, useMemo, useCallback } from "react";
import {
    Box,
    IconButton,
    Popover,
    Select,
    MenuItem,
    TextField,
    Button,
    Typography,
    Divider,
    SelectChangeEvent,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import IconifyIcon from "../Icon";

type TFilter = {
    field: string;
    operator: string;
    value: string;
    logic?: string;
};

type Operator = {
    value: string;
    label: string;
};

type FieldConfig = {
    value: string;
    label: string;
    type: "string" | "number" | "boolean" | "date";
    operators: Operator[];
};

interface AdminFilterProps {
    fields: FieldConfig[];
    onFilterChange: (filters: TFilter[]) => void;
}

const AdminFilter: React.FC<AdminFilterProps> = ({ fields, onFilterChange }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filters, setFilters] = useState<TFilter[]>([
        { field: fields[0]?.value || "name", operator: fields[0]?.operators[0]?.value || "contains", value: "", logic: "AND" },
    ]);

    const { t } = useTranslation();
    const theme = useTheme();

    const handleFilterIconClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleAddFilter = useCallback(() => {
        const newFilters = [...filters, { field: fields[0]?.value || "name", operator: fields[0]?.operators[0]?.value || "contains", value: "", logic: "AND" }];
        setFilters(newFilters);
        onFilterChange(newFilters);
    }, [filters, fields, onFilterChange]);

    const handleRemoveFilter = useCallback((index: number) => {
        let newFilters = filters.filter((_, i) => i !== index);
        if (newFilters.length === 0) {
            newFilters = [{ field: fields[0]?.value || "name", operator: fields[0]?.operators[0]?.value || "contains", value: "", logic: "AND" }];
            setFilters(newFilters);
            onFilterChange(newFilters);
            handleClose();
        } else {
            setFilters(newFilters);
            onFilterChange(newFilters);
        }
    }, [filters, fields, onFilterChange, handleClose]);

    const handleRemoveAllFilters = useCallback(() => {
        const newFilters = [{ field: fields[0]?.value || "name", operator: fields[0]?.operators[0]?.value || "contains", value: "", logic: "AND" }];
        setFilters(newFilters);
        onFilterChange(newFilters);
        handleClose();
    }, [fields, onFilterChange, handleClose]);

    const handleFilterChange = useCallback((index: number, key: keyof TFilter, value: string) => {
        const newFilters = [...filters];
        if (key === "logic") {
            newFilters[index] = { ...newFilters[index], [key]: value as "AND" | "OR" };
        } else {
            newFilters[index] = { ...newFilters[index], [key]: value };
        }

        if (key === "field") {
            const newField = fields.find((f) => f.value === value);
            newFilters[index].operator = newField?.operators[0]?.value || "contains";
        }

        setFilters(newFilters);
        onFilterChange(newFilters);
    }, [filters, fields, onFilterChange]);

    const open = Boolean(anchorEl);

    // Memoize filter items
    const filterItems = useMemo(() => filters.map((filter, index) => {
        const selectedField = fields.find((f) => f.value === filter.field);
        const availableOperators = selectedField?.operators || [];

        return (
            <Box
                key={index}
                sx={{
                    display: "flex",
                    gap: 1,
                    mb: 1,
                    alignItems: "center",
                    flexWrap: "nowrap",
                    "& > *": {
                        flexShrink: 0,
                    },
                }}
            >
                <Select
                    value={filter.field}
                    onChange={(e: SelectChangeEvent<string>) => handleFilterChange(index, "field", e.target.value)}
                    size="small"
                    sx={{ width: 180 }}
                >
                    {fields.map((f) => (
                        <MenuItem key={f.value} value={f.value}>
                            {f.label}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={filter.operator}
                    onChange={(e: SelectChangeEvent<string>) => handleFilterChange(index, "operator", e.target.value)}
                    size="small"
                    sx={{ width: 180 }}
                >
                    {availableOperators.map((op) => (
                        <MenuItem key={op.value} value={op.value}>
                            {op.label}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    value={filter.value}
                    onChange={(e) => handleFilterChange(index, "value", e.target.value)}
                    placeholder={t("filter_value")}
                    size="small"
                    disabled={["isnull", "isnotnull", "isempty", "isnotempty"].includes(filter.operator)}
                    sx={{ width: 180 }}
                />
                <IconButton onClick={() => handleRemoveFilter(index)} disabled={filters.length === 1}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        );
    }), [filters, fields, handleFilterChange, handleRemoveFilter, t]);

    // Memoize styles
    const styles = useMemo(() => ({
        container: {
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: (theme: any) => `1px solid ${theme.palette.divider}`,
            backgroundColor: (theme: any) => theme.palette.grey[100],
        },
        popover: {
            p: 4,
            width: 700,
        },
        filterItem: {
            display: "flex",
            gap: 1,
            mb: 1,
            alignItems: "center",
            flexWrap: "nowrap",
            "& > *": {
                flexShrink: 0,
            },
        },
    }), []);

    return (
        <Box sx={styles.container}>
            <Box sx={{ display: "flex", gap: 1 }}>
                {/* <IconButton title={t("columns")}>
                    <IconifyIcon icon='lsicon:column-outline' color={theme.palette.primary.main} />
                    <Typography component='span' color={theme.palette.primary.main} sx={{ textTransform: 'uppercase' }}>
                        {t('columns')}
                    </Typography>
                </IconButton>
                <IconButton title={t("density")}>
                    <IconifyIcon icon='lsicon:density-m-outline' color={theme.palette.primary.main} />
                    <Typography component='span' color={theme.palette.primary.main} sx={{ textTransform: 'uppercase' }}>
                        {t('density')}
                    </Typography>
                </IconButton> */}
                <IconButton title={t("filter")} onClick={handleFilterIconClick}>
                    <IconifyIcon icon='cuida:filter-outline' color={theme.palette.primary.main} />
                    <Typography component='span' color={theme.palette.primary.main} sx={{ textTransform: 'uppercase' }}>
                        {t('filters')}
                    </Typography>
                </IconButton>
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Box sx={styles.popover}>
                    {filterItems}
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button variant="outlined" onClick={handleAddFilter} startIcon={
                            <IconifyIcon icon='stash:plus-solid' />
                        }>
                            {t("add_filter")}
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleRemoveAllFilters} startIcon={
                            <IconifyIcon icon="mdi:delete-forever-outline" />
                        }>
                            {t("remove_all_filter")}
                        </Button>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default AdminFilter;