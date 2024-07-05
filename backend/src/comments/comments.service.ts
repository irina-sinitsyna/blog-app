import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { BlogPostsService } from '../blog-posts/blog-posts.service';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private readonly blogPostsService: BlogPostsService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['blogPost'] });
  }

  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['blogPost'],
    });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async findByBlogPost(blogPostId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { blogPost: { id: blogPostId } },
      relations: ['blogPost'],
    });
  }

  async create(
    blogPostId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const blogPost = await this.blogPostsService.findOne(blogPostId);
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with ID ${blogPostId} not found`);
    }

    const newComment = this.commentsRepository.create({
      ...createCommentDto,
      blogPost,
    });
    return this.commentsRepository.save(newComment);
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    await this.commentsRepository.update(id, updateCommentDto);
    const updatedComment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['blogPost'],
    });
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updatedComment;
  }

  async remove(id: string): Promise<void> {
    const result = await this.commentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
