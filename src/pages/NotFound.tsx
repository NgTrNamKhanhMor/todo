import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledPaper } from "~/styles/Paper.style";

export default function NotFound() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <StyledPaper>
        <Typography variant="h1" component="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="p" gutterBottom>
          Oops! The page you are looking for does not exist.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go Home
        </Button>
      </StyledPaper>
    </Box>
  );
}
