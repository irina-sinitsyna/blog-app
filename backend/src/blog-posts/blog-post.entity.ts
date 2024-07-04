import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Comment } from '../comments/comment.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Comment, (comment) => comment.blogPost, { cascade: true })
  comments: Comment[];
}
