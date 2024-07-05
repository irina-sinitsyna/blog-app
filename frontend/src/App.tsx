import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoginPage from './pages/LoginPage';
import BlogPostsPage from './pages/BlogPostsPage';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/blog-posts' element={<BlogPostsPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
