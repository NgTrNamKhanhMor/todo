import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export default function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchValue = formData.get("search") || "";
        const newParams = new URLSearchParams(searchParams.toString());

        if (typeof searchValue === "string") {
            if (searchValue.trim()) {
                newParams.set("search", searchValue);
            } else {
                newParams.delete("search");
            }
            setSearchParams(newParams);
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
                fullWidth
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
