import React from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

interface LoginValues {
  email: string;
  password: string;
  submit?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters')
      .required('Required'),
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting, setErrors }: FormikHelpers<LoginValues>,
  ) => {
    try {
      await login(values);
      navigate('/blog-posts');
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 px-4 md:px-0 w-screen'>
      <div className='w-full max-w-lg bg-white shadow-lg rounded-lg p-8'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className='space-y-6'>
              <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
                Sign In
              </h2>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Email
                </label>
                <Field
                  name='email'
                  type='email'
                  className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-red-500 text-xs italic'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='password'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Password
                </label>
                <Field
                  name='password'
                  type='password'
                  className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-xs italic'
                />
              </div>
              {errors.submit && (
                <div className='text-red-500 text-xs italic mb-4'>
                  {errors.submit}
                </div>
              )}
              <div className='flex items-center justify-between'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
              <p>
                Don't have an account? <a href='/register'>Sign Up now</a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
