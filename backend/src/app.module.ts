import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BlogPost } from './blog-posts/blog-post.entity';
import { Comment } from './comments/comment.entity';
import { BlogPostsService } from './blog-posts/blog-posts.service';
import { CommentsService } from './comments/comments.service';
import { LoggingMiddleware } from './middlewares/LoggingMiddleware';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BlogPostsController } from './blog-posts/blog-posts.controller';
import { CommentsController } from './comments/comments.controller';
import { User } from './users/user.entity';
import { UserController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { TokenBlacklistModule } from './auth/token-blacklist.module';

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
      entities: [BlogPost, Comment, User],
      migrations: ['dist/migrations/*.ts'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([BlogPost, Comment, User]),
    UserModule,
    AuthModule,
    TokenBlacklistModule,
  ],
  controllers: [
    AuthController,
    AppController,
    BlogPostsController,
    CommentsController,
    UserController,
  ],
  providers: [
    AuthService,
    AppService,
    BlogPostsService,
    CommentsService,
    UsersService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
