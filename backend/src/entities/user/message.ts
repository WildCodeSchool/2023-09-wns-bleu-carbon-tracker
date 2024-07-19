import { Field, ObjectType } from 'type-graphql';
import User from './user';

@ObjectType()
export default class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  user?: User | null;
}
