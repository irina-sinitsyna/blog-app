import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginPage from './pages/LoginPage';
import BlogPostsPage from './pages/BlogPostsPage';
import Register from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/blog-posts' element={<BlogPostsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
