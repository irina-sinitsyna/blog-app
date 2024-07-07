import { useMutation } from 'react-query';
import axiosInstance from './base';

interface LoginResponse {
  access_token: string;
}

interface LoginValues {
  email: string;
  password: string;
}

const login = async (data: LoginValues): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('access_token', data.access_token);
    },
  });
};

export const useFetchUserData = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axiosInstance.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch user data error:', error);
    throw error;
  }
};
