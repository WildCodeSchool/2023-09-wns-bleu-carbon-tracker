/* eslint-disable max-classes-per-file */
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SumByCategory {
  @Field()
  categoryName: string;

  @Field()
  categoryId: number;

  @Field()
  sumKgCO2: number;

  @Field({ nullable: true })
  userId?: string;
}

@ObjectType()
export class SumByMonth {
  @Field()
  month: string;

  @Field()
  sumKgCO2: number;
}
