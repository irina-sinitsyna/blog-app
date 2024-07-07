import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { BlogPost } from '../blog-posts/blog-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, BlogPost])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
