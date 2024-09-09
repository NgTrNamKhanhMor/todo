import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Required"),
});

export const registerValidationSchema = authSchema.shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),
});
