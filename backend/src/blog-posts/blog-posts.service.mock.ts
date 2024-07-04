import { BlogPost } from './blog-post.entity';

export const mockBlogPostsService = () => ({
  findAll: jest.fn().mockResolvedValue([
    { id: '1', title: 'Post 1', content: 'Content 1' },
    { id: '2', title: 'Post 2', content: 'Content 2' },
  ]),
  findOne: jest
    .fn()
    .mockImplementation((id: string) =>
      Promise.resolve({ id, title: 'Post Title', content: 'Post Content' }),
    ),
  create: jest
    .fn()
    .mockImplementation((blogPost: BlogPost) =>
      Promise.resolve({ id: '3', ...blogPost }),
    ),
  update: jest
    .fn()
    .mockImplementation((id: string, blogPost: Partial<BlogPost>) =>
      Promise.resolve({ id, ...blogPost }),
    ),
  remove: jest.fn().mockResolvedValue(true),
});
