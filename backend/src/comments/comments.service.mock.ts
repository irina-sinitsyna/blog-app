import { Comment } from './comment.entity';

export const mockCommentsService = () => ({
  findAll: jest.fn().mockResolvedValue([
    { id: '1', content: 'Comment 1' },
    { id: '2', content: 'Comment 2' },
  ]),
  findOne: jest
    .fn()
    .mockImplementation((id: string) =>
      Promise.resolve({ id, content: 'Comment Content' }),
    ),
  findByBlogPost: jest.fn().mockImplementation((blogPostId: string) =>
    Promise.resolve([
      { id: '1', content: 'Comment 1' },
      { id: '2', content: 'Comment 2' },
    ]),
  ),
  create: jest
    .fn()
    .mockImplementation((comment: Partial<Comment>) =>
      Promise.resolve({ id: '3', ...comment }),
    ),
  update: jest
    .fn()
    .mockImplementation((id: string, comment: Partial<Comment>) =>
      Promise.resolve({ id, ...comment }),
    ),
  remove: jest.fn().mockResolvedValue(true),
});
