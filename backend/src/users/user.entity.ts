import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BlogPost } from '../blog-posts/blog-post.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.author)
  blogPosts: BlogPost[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
