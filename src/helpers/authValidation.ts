import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export const registerValidationSchema = validationSchema.shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),
});
