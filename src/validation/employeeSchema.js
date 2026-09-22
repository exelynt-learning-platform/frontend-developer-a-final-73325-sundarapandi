import * as yup from "yup";

export const employeeSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),

  mobile: yup
    .string()
    .trim()
    .required("Mobile is required")
    .matches(/^[0-9]{10,15}$/, "Mobile must contain 10–15 digits"),

  country: yup
    .string()
    .trim()
    .required("Country is required")
    .max(50, "Country must not exceed 50 characters"),

  state: yup
    .string()
    .trim()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must not exceed 50 characters"),

  district: yup
    .string()
    .trim()
    .required("District is required")
    .min(2, "District must be at least 2 characters")
    .max(50, "District must not exceed 50 characters")
});
