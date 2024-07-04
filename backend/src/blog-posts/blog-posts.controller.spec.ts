import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { BlogPost } from './blog-post.entity';
import { mockBlogPostsService } from './blog-posts.service.mock';

describe('BlogPostsController', () => {
  let controller: BlogPostsController;
  let blogPostsService: BlogPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostsController],
      providers: [
        {
          provide: BlogPostsService,
          useValue: mockBlogPostsService(),
        },
      ],
    }).compile();

    controller = module.get<BlogPostsController>(BlogPostsController);
    blogPostsService = module.get<BlogPostsService>(BlogPostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all blog posts', async () => {
    const result: BlogPost[] = [
      { id: '1', title: 'Post 1', content: 'Content 1', comments: [] },
      { id: '2', title: 'Post 2', content: 'Content 2', comments: [] },
    ];
    jest.spyOn(blogPostsService, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
  });

  it('should create a new blog post', async () => {
    const newBlogPost: Partial<BlogPost> = {
      title: 'New Post',
      content: 'New Content',
    };
    jest
      .spyOn(blogPostsService, 'create')
      .mockResolvedValue(newBlogPost as BlogPost);

    const response = await controller.create(newBlogPost as BlogPost);
    expect(response).toEqual(newBlogPost);
  });

  it('should update a blog post', async () => {
    const updatedPost: Partial<BlogPost> = {
      id: '1',
      title: 'Updated Post',
      content: 'Updated Content',
    };
    jest
      .spyOn(blogPostsService, 'update')
      .mockResolvedValue(updatedPost as BlogPost);

    const response = await controller.update(
      '1',
      updatedPost as Partial<BlogPost>,
    );
    expect(response).toEqual(updatedPost);
  });

  it('should throw NotFoundException when updating non-existent post', async () => {
    jest.spyOn(blogPostsService, 'update').mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(
      controller.update('999', {} as Partial<BlogPost>),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a blog post', async () => {
    jest.spyOn(blogPostsService, 'remove').mockResolvedValue();

    await controller.remove('1');
    expect(blogPostsService.remove).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when deleting non-existent post', async () => {
    jest.spyOn(blogPostsService, 'remove').mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException for unauthorized access', async () => {
    jest.spyOn(blogPostsService, 'create').mockImplementation(() => {
      throw new UnauthorizedException();
    });

    await expect(controller.create({} as BlogPost)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
