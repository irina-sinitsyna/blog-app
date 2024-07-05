import { useMutation } from 'react-query';

import axiosInstance from './base';

interface LoginResponse {
  accessToken: string;
}

interface LoginValues {
  email: string;
  password: string;
}

const login = async (data: LoginValues): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const useLogin = () => {
  return useMutation(login);
};
