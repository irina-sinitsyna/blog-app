import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { BlogPost } from '../blog-posts/blog-post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
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
    comment: Partial<Comment>,
  ): Promise<Comment> {
    const blogPost = await this.blogPostsRepository.findOne({
      where: { id: blogPostId },
    });
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with ID ${blogPostId} not found`);
    }

    const newComment = this.commentsRepository.create({ ...comment, blogPost });
    return this.commentsRepository.save(newComment);
  }

  async update(id: string, comment: Partial<Comment>): Promise<Comment> {
    await this.commentsRepository.update(id, comment);
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
