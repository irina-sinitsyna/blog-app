import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

import { BlogPost } from 'src/blog-posts/blog-post.entity';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { mockCommentsService } from './comments.service.mock';

describe('CommentsController', () => {
  let controller: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: mockCommentsService(),
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all comments', async () => {
    const result: Comment[] = [
      {
        id: '1',
        author: 'Author 1',
        content: 'Content 1',
        blogPost: new BlogPost(),
      },
      {
        id: '2',
        author: 'Author 2',
        content: 'Content 2',
        blogPost: new BlogPost(),
      },
    ];
    jest.spyOn(commentsService, 'findAll').mockResolvedValue(result);

    const response = await controller.findAll();
    expect(response).toBe(result);
  });
  it('should create a new comment', async () => {
    const newComment: Partial<Comment> = {
      author: 'Author',
      content: 'New Comment',
    };
    jest
      .spyOn(commentsService, 'create')
      .mockResolvedValue(newComment as Comment);

    const response = await controller.create('postId', newComment as Comment);
    expect(response).toEqual(newComment);
  });

  it('should update a comment', async () => {
    const updatedComment: Partial<Comment> = {
      id: '1',
      author: 'Updated Author',
      content: 'Updated Content',
    };
    jest
      .spyOn(commentsService, 'update')
      .mockResolvedValue(updatedComment as Comment);

    const response = await controller.update(
      '1',
      updatedComment as Partial<Comment>,
    );
    expect(response).toEqual(updatedComment);
  });

  it('should throw NotFoundException when updating non-existent comment', async () => {
    jest.spyOn(commentsService, 'update').mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(
      controller.update('999', {} as Partial<Comment>),
    ).rejects.toThrow(NotFoundException);
  });

  it('should delete a comment', async () => {
    jest.spyOn(commentsService, 'remove').mockResolvedValue();

    await controller.remove('1');
    expect(commentsService.remove).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when deleting non-existent comment', async () => {
    jest.spyOn(commentsService, 'remove').mockImplementation(() => {
      throw new NotFoundException();
    });

    await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException for unauthorized access', async () => {
    jest.spyOn(commentsService, 'create').mockImplementation(() => {
      throw new UnauthorizedException();
    });

    await expect(
      controller.create('postId', {} as Partial<Comment>),
    ).rejects.toThrow(UnauthorizedException);
  });
});
