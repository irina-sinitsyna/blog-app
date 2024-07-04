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
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'List of all comments' })
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'The found comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async findOne(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  @Get('blog-post/:blogPostId')
  @ApiOperation({ summary: 'Get comments by Blog Post ID' })
  @ApiResponse({
    status: 200,
    description: 'List of comments for the specified Blog Post ID',
  })
  async findByBlogPost(
    @Param('blogPostId') blogPostId: string,
  ): Promise<Comment[]> {
    return this.commentsService.findByBlogPost(blogPostId);
  }

  @Post(':blogPostId')
  @ApiOperation({ summary: 'Add a comment to a blog post' })
  @ApiBody({ type: Comment })
  @ApiResponse({ status: 201, description: 'The created comment' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('blogPostId') blogPostId: string,
    @Body() comment: Partial<Comment>,
  ): Promise<Comment> {
    return this.commentsService.create(blogPostId, comment);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiBody({ type: Comment })
  @ApiResponse({ status: 200, description: 'The updated comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() comment: Partial<Comment>,
  ): Promise<Comment> {
    const updatedComment = await this.commentsService.update(id, comment);
    if (!updatedComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return updatedComment;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.commentsService.remove(id);
  }
}
