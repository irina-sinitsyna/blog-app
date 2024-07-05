import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '../api/queries';

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

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
      const response = await loginMutation.mutateAsync(values);
      localStorage.setItem('token', response.accessToken);
      navigate('/blog-posts');
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' } as any);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md'>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
              <h2 className='text-2xl mb-6 text-center'>Login</h2>
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
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-xs italic'
                />
              </div>
              {errors && (
                <div className='text-red-500 text-xs italic mb-4'>
                  {errors.email}
                </div>
              )}
              <div className='flex items-center justify-between'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
