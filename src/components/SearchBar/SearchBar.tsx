import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useTodosFilter } from "~/hooks/useTodosFilter";

export default function SearchBar() {
    const { search, setFilters } = useTodosFilter();
    const [searchValue, setSearchValue] = useState<string>(search || "");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };
    const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchValue.trim() === "") {
            setFilters({ search: undefined });
        } else {
            setFilters({ search: searchValue.trim() });
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmitSearch}
            sx={{ display: "flex", alignItems: "center" }}
        >
            <TextField
                name="search"
                placeholder="Search tasks..."
                autoComplete="off"
                variant="outlined"
                size="medium"
                value={searchValue}
                fullWidth
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton type="submit" sx={{ marginRight: 1, }}>
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    )
}
