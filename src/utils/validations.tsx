import * as Yup from 'yup';

export const validationSchema = {
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
};

export const signupValidationSchema = Yup.object({
  email: validationSchema.email,
  password: validationSchema.password,
});

export const loginValidationSchema = Yup.object({
  email: validationSchema.email,
  password: validationSchema.password,
});
