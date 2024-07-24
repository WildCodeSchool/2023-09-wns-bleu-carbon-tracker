import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

@InputType()
export default class InputUpdateUserName {
  @Field()
  id: string;

  @Field()
  @Length(2, 50)
  name: string;
}
