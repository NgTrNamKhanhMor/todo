import { Box, TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export default function Register({ handleSwitch }) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '40px',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary', margin: '0 auto' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" mb={2}>
        Register
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        noValidate
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="body2">
          Already have an account?{' '}
          <Button variant="text" onClick={handleSwitch} color="primary">
            Login
          </Button>
        </Typography>
      </Box>
    </Paper>
  );
}
