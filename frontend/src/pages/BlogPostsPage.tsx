import React, { useState, useEffect } from 'react';

import axiosInstance from '../api/base';

interface BlogPost {
  id: string;
  title: string;
  content: string;
}

const BlogPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get<BlogPost[]>(
        'http://localhost:3000/blog-posts',
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async () => {
    try {
      const response = await axiosInstance.post<BlogPost>(
        'http://localhost:3000/blog-posts',
        newPost,
      );
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleRemovePost = async (postId: string) => {
    try {
      await axiosInstance.delete(`http://localhost:3000/blog-posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error removing post:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-screen'>
      <div className='w-full max-w-2xl bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Blog Posts
        </h2>
        <div className='mb-6'>
          <input
            type='text'
            placeholder='Title'
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'
          />
          <textarea
            placeholder='Content'
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4'
          />
          <button
            onClick={handleAddPost}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'
          >
            Add Post
          </button>
        </div>
        <div className='space-y-4'>
          {posts.map((post) => (
            <div key={post.id} className='bg-gray-100 p-4 rounded shadow'>
              <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
              <p className='text-gray-700'>{post.content}</p>
              <button
                onClick={() => handleRemovePost(post.id)}
                className='mt-2 text-red-500 hover:text-red-700'
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPostsPage;
