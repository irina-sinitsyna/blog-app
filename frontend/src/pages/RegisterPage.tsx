import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../api/base';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axiosInstance.post('/auth/register', values);
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/blog-posts');
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 w-screen'>
      <div className='w-full max-w-md p-8 space-y-3 bg-white rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold text-center'>Sign Up</h2>
        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              className='w-full p-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-sm text-red-600'>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className='w-full p-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-sm text-red-600'>
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div>
            <button
              type='submit'
              className='w-full p-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700'
              disabled={formik.isSubmitting}
            >
              Sign Up
            </button>
          </div>
          <p>
            Already have an account? <a href='/login'>Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
