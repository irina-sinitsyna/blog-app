import { LoginValues, useAuth } from '../context/AuthContext';
import axiosInstance from './base';

export const logout = async () => {
  await axiosInstance.post('/auth/logout');
  localStorage.removeItem('access_token');
};

export const useLogin = () => {
  const { login } = useAuth();

  const handleLogin = (data: LoginValues) => {
    login(data);
  };

  return { handleLogin };
};

export const useLogout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return { handleLogout };
};
