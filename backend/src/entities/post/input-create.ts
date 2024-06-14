import { Field, InputType } from 'type-graphql';

@InputType()
export default class InputCreatePost {
  @Field()
  title: string;

  @Field()
  content: string;
}
