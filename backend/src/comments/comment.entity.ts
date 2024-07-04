import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { BlogPost } from '../blog-posts/blog-post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @ManyToOne(() => BlogPost, (blogPost) => blogPost.comments)
  blogPost: BlogPost;
}
