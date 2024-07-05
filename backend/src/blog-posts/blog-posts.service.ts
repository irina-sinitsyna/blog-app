import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(blogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    const newBlogPost = this.blogPostsRepository.create(blogPostDto);
    return this.blogPostsRepository.save(newBlogPost);
  }

  async update(id: string, blogPostDto: UpdateBlogPostDto): Promise<BlogPost> {
    await this.blogPostsRepository.update(id, blogPostDto);
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
