import React from 'react';

import { useAuth } from '../context/AuthContext';
import { useLogout } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const { handleLogout } = useLogout();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <header className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Blog App</h1>
      {isAuthenticated && (
        <button
          onClick={handleLogoutClick}
          className='px-4 py-2 bg-red-500 rounded text-white'
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
