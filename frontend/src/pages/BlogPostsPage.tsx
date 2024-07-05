import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get<BlogPost[]>(
        'http://localhost:3000/api/blog-posts',
      );
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleAddPost = async () => {
    try {
      const response = await axios.post<BlogPost>(
        'http://localhost:3000/api/blog-posts',
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
      await axios.delete(`http://localhost:3000/api/blog-posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error removing post:', error);
    }
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <div>
        <input
          type='text'
          placeholder='Title'
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder='Content'
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => handleRemovePost(post.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPostsPage;
