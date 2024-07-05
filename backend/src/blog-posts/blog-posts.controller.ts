import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { BlogPostsService } from './blog-posts.service';
import { BlogPost } from './blog-post.entity';

@ApiTags('blog-posts')
@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all blog posts' })
  @ApiResponse({ status: 200, description: 'List of all blog posts' })
  async findAll(): Promise<BlogPost[]> {
    return this.blogPostsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a blog post by ID' })
  @ApiResponse({ status: 200, description: 'The found blog post' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  async findOne(@Param('id') id: string): Promise<BlogPost> {
    const blogPost = await this.blogPostsService.findOne(id);
    if (!blogPost) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
    return blogPost;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'The created blog post' })
  async create(@Body() blogPostData: BlogPost): Promise<BlogPost> {
    return this.blogPostsService.create(blogPostData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a blog post by ID' })
  @ApiResponse({ status: 200, description: 'The updated blog post' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() blogPost: Partial<BlogPost>,
  ): Promise<BlogPost> {
    const updatedBlogPost = await this.blogPostsService.update(id, blogPost);
    if (!updatedBlogPost) {
      throw new NotFoundException(`BlogPost with ID ${id} not found`);
    }
    return updatedBlogPost;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post by ID' })
  @ApiResponse({ status: 204, description: 'Blog post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.blogPostsService.remove(id);
  }
}
