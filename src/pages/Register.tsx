import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, InputAdornment, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { StyledPaper } from "~/styles/Paper.style";
import TextInput from "~components/TextInput/TextInput";
import { registerValidationSchema } from '~helpers/authValidation';
import { register, resetUserError } from '~redux/slices/userSlices';
import { AppDispatch, RootState } from '~redux/store';

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(resetUserError());
  }, [dispatch]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: registerValidationSchema,
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
        <TextInput
          formik={formik}
          name={"name"}
          label={"Username"}
          fullWidth
          autoFocus margin="normal" />
        <TextInput
          formik={formik}
          name={"email"}
          label={"Email Address"}
          fullWidth
          autoFocus margin="normal" />
        <TextInput
          formik={formik}
          name={"password"}
          label={"Password"}
          type={showPassword ? "text" : "password"}
          margin="normal"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }} />
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
