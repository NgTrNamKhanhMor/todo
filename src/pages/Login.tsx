import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { StyledPaper } from "~/styles/Paper.style";
import { validationSchema } from "~helpers/authValidation";
import { login, resetError } from "~redux/slices/userSlices";
import { AppDispatch, RootState } from "~redux/store";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(resetError());
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values))
        .unwrap()
        .then(() => {
          navigate("/");
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
        Sign In
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
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
          autoComplete="current-password"
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
          disabled={status === "loading" || formik.isSubmitting}
        >
          Sign In
        </Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
      <Box mt={2}>
        <Typography variant="body2">
          Don't have an account?{" "}
          <Link to="/register">
            <Button variant="text" color="primary">
              Register
            </Button>
          </Link>
        </Typography>
      </Box>
    </StyledPaper>
  );
}
