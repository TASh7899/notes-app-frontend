import * as yup from 'yup'

export const formSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required').min(8, 'password must be at least 8 characters long')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/\d/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'passwords must match').required('please confirm your password')
});
