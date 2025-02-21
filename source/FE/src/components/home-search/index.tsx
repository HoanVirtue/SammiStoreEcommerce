import { keyframes, styled } from "@mui/material";
import IconifyIcon from "../Icon";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material";

interface THomeSearch {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    sx?: SxProps<Theme>;
}


const typing = keyframes`
  from { width: 0ch; }
  to { width: 30ch; }
`;

const Search = styled('form')(({ theme }) => ({
    position: 'relative',
    height: "38px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    marginLeft: "0 !important",
    width: '100%',
    maxWidth: "600px",
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('button')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    cursor: "pointer",
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    backgroundColor: theme.palette.primary.main,
    border: 'none',
    outline: 'none',
    color: theme.palette.common.white,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const StyledInputBase = styled('input')(({ theme }) => ({
    color: 'inherit',
    height: '100%',
    width: '40vw',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    border: 'none',
    backgroundColor: theme.palette.grey[100],
    outline: 'none',
    '&::placeholder': {
        color: theme.palette.text.secondary,
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "30ch",
        animation: `${typing} 3s steps(30, end) infinite alternate-reverse`,
    },
}));

const HomeSearch = (props: THomeSearch) => {
    const { t } = useTranslation();

    // Props
    const { value, onChange, placeholder = t('search'), sx } = props;

    // State
    const [search, setSearch] = useState(value);
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        onChange(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <Search
            action="/search"
            method="get"
            role="search"
            sx={sx}
        >
            <StyledInputBase
                type="text"
                name="home-search"
                value={search}
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
                required
            />
            <input type="hidden" name="type" value="product" />
            <SearchIconWrapper type="submit" aria-label="search">
                <IconifyIcon icon="material-symbols-light:search-rounded" />
            </SearchIconWrapper>
        </Search>
    );
};

export default HomeSearch;