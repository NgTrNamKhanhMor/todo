import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { StyledPaper } from "~/styles/Paper.style";
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '~redux/store';
import { register } from '~redux/slices/userSlices';
import { useFormik } from 'formik';
import { registerValidationSchema } from '~helpers/authValidation';

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema : registerValidationSchema, 
    onSubmit: (values, { setSubmitting }) => {
      dispatch(register(values))
        .unwrap()
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <StyledPaper>
      <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5" mb={2}>
        Register
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={status === 'loading' || formik.isSubmitting}
        >
          Register
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Box mt={2}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link to='/login'>
            <Button variant="text" color="primary">
              Login
            </Button>
          </Link>
        </Typography>
      </Box>
    </StyledPaper>
  );
}
