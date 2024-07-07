import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/blog-posts');
        setPosts(response.data);
      } catch (err: unknown) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Error loading posts
      </div>
    );
  }

  return (
    <div className='p-4 min-h-screen bg-gray-100'>
      <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
        Blog Posts
      </h2>
      <ul className='space-y-4'>
        {posts.map((post: any) => (
          <li key={post.id} className='bg-white shadow-md rounded p-6'>
            <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
            <p className='text-gray-700'>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
