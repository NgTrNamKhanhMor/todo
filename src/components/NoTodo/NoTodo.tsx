import { Box, Typography } from "@mui/material";

export default function NoTodo() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Typography variant="h6" color="textSecondary">
                No Todos Found
            </Typography>
        </Box>
    )
}
