import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    try {
      return await this.commentsRepository.find({
        relations: ['blogPost', 'author'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve comments',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<Comment> {
    try {
      const comment = await this.commentsRepository.findOne({
        where: { id },
        relations: ['blogPost', 'author'],
      });
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return comment;
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async findByBlogPost(blogPostId: string): Promise<Comment[]> {
    try {
      return await this.commentsRepository.find({
        where: { blogPost: { id: blogPostId } },
        relations: ['user', 'blogPost'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve comments',
        error.message,
      );
    }
  }

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const newComment = this.commentsRepository.create(createCommentDto);
      return await this.commentsRepository.save(newComment);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create comment',
        error.message,
      );
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      await this.commentsRepository.update(id, updateCommentDto);
      const updatedComment = await this.commentsRepository.findOne({
        where: { id },
        relations: ['blogPost', 'author'],
      });
      if (!updatedComment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return updatedComment;
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.commentsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
