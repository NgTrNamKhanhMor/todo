import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
type LoginProps = {
  handleSwitch: ()=> void,
}
export default function Login({ handleSwitch }: LoginProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "40px",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary", margin: "0 auto" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" mb={2}>
        Sign In
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
        noValidate
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Button variant="text" onClick={handleSwitch} color="primary">
            Register
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
}
