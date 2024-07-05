import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from 'src/users/user.entity';

import { Comment } from '../comments/comment.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.blogPosts)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.blogPost, { cascade: true })
  comments: Comment[];
}
