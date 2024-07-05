import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BlogPost } from './blog-posts/blog-post.entity';
import { Comment } from './comments/comment.entity';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { CommentsService } from './comments/comments.service';
import { LoggingMiddleware } from './middlewares/LoggingMiddleware';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [BlogPost, Comment],
      migrations: ['dist/migrations/*.ts'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BlogPost, Comment]),
    UserModule,
  ],
  providers: [BlogPostsService, CommentsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
