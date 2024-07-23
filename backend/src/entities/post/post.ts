import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import User from '../user/user';

@Entity()
@ObjectType()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  content: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  viewOnPost?: number;

  @ManyToOne(() => User, (user) => user.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable()
  @Field(() => [User])
  likers: User[];
}
