import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlogPost } from './blog-post.entity';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectRepository(BlogPost)
    private blogPostsRepository: Repository<BlogPost>,
  ) {}

  async findAll(): Promise<BlogPost[]> {
    return this.blogPostsRepository.find({ relations: ['comments'] });
  }

  async findOne(id: string): Promise<BlogPost> {
    const blogPost = await this.blogPostsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
    return blogPost;
  }

  async create(blogPost: BlogPost): Promise<BlogPost> {
    return this.blogPostsRepository.save(blogPost);
  }

  async update(id: string, blogPostData: Partial<BlogPost>): Promise<BlogPost> {
    await this.blogPostsRepository.update(id, blogPostData);
    const updatedBlogPost = await this.blogPostsRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!updatedBlogPost) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
    return updatedBlogPost;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blogPostsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
  }
}
