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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className='p-4'>
      <h2 className='text-2xl mb-4'>Blog Posts</h2>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id} className='mb-4 p-4 bg-white shadow-md rounded'>
            <h3 className='text-xl font-bold'>{post.title}</h3>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
