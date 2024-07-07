import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useMutation } from 'react-query';

import axiosInstance from '../api/base';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginValues) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const loginMutation = async (data: LoginValues): Promise<LoginResponse> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response.data;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const loginMutationInstance = useMutation(loginMutation, {
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('access_token', data.access_token);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (data: LoginValues) => {
    loginMutationInstance.mutate(data);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
