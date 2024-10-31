import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  skills: yup
    .string()
    .required('At least one skill is required')
    .test('is-valid', 'Skills must be a comma-separated list', (value) => {
      // Check if the skills are separated by commas and not empty
      const skillsArray = value ? value.split(',').map(skill => skill.trim()) : [];
      return skillsArray.length > 0 && skillsArray.every(skill => skill.length >= 2 && skill.length <= 30);
    }),
  avatar: yup.mixed().required('Profile picture is required'),
  resume: yup.mixed().required('Resume is required'),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email format").required("email is required"),
  password: yup.string()
    .min(6, 'Password must be of 6 characters')
    .required("password is required")
});
