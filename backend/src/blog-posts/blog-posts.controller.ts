import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { BlogPostsService } from './blog-posts.service';
import { BlogPost } from './blog-post.entity';
import { CreateBlogPostDto, UpdateBlogPostDto } from './blog-post.dto';

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
    return this.blogPostsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiResponse({ status: 201, description: 'The created blog post' })
  async create(
    @Body() createBlogPostDto: CreateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostsService.create(createBlogPostDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a blog post by ID' })
  @ApiResponse({ status: 200, description: 'The updated blog post' })
  @ApiResponse({ status: 404, description: 'Blog post not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostsService.update(id, updateBlogPostDto);
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
