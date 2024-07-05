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
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiBody } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, description: 'List of all comments' })
  async findAll(): Promise<Comment[]> {
    try {
      return await this.commentsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve comments',
        error.message,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'The found comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  async findOne(@Param('id') id: string): Promise<Comment> {
    try {
      const comment = await this.commentsService.findOne(id);
      if (!comment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return comment;
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  @Get('blog-posts/:blogPostId')
  @ApiOperation({ summary: 'Get comments by Blog Post ID' })
  @ApiResponse({
    status: 200,
    description: 'List of comments for the specified Blog Post ID',
  })
  async findByBlogPost(
    @Param('blogPostId') blogPostId: string,
  ): Promise<Comment[]> {
    try {
      return await this.commentsService.findByBlogPost(blogPostId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve comments',
        error.message,
      );
    }
  }

  @Post('blog-posts/:blogPostId')
  @ApiOperation({ summary: 'Add a comment to a blog post' })
  @ApiBody({ type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'The created comment' })
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('blogPostId') blogPostId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    try {
      return await this.commentsService.create({
        ...createCommentDto,
        blogPostId: blogPostId,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create comment',
        error.message,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment by ID' })
  @ApiBody({ type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'The updated comment' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const updatedComment = await this.commentsService.update(
        id,
        updateCommentDto,
      );
      if (!updatedComment) {
        throw new NotFoundException(`Comment with ID ${id} not found`);
      }
      return updatedComment;
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment by ID' })
  @ApiResponse({ status: 204, description: 'Comment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.commentsService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
