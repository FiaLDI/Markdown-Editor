import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeDto {
  @Field()
  id!: string;

  @Field(() => String, { nullable: true })
  login!: string | null;

  @Field()
  email!: string;
}
