import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlogPost } from './blog-post.entity';
import { CreateBlogPostDto, UpdateBlogPostDto } from './blog-post.dto';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
  ) {}

  async findAll(): Promise<BlogPost[]> {
    try {
      return await this.blogPostsRepository.find({
        relations: ['comments', 'author'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve blog posts',
        error.message,
      );
    }
  }

  async findOne(id: string): Promise<BlogPost> {
    try {
      const blogPost = await this.blogPostsRepository.findOne({
        where: { id },
        relations: ['comments', 'author'],
      });
      if (!blogPost) {
        throw new NotFoundException(`BlogPost with ID ${id} not found`);
      }
      return blogPost;
    } catch (error) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
  }

  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    try {
      const newBlogPost = this.blogPostsRepository.create(createBlogPostDto);
      return await this.blogPostsRepository.save(newBlogPost);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create blog post',
        error.message,
      );
    }
  }

  async update(
    id: string,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    try {
      const result = await this.blogPostsRepository.update(
        id,
        updateBlogPostDto,
      );
      if (result.affected === 0) {
        throw new NotFoundException(`BlogPost with ID ${id} not found`);
      }
      return await this.findOne(id);
    } catch (error) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.blogPostsRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`BlogPost with ID ${id} not found`);
      }
    } catch (error) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
  }
}
