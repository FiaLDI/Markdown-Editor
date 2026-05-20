import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field()
  email!: string;

  @Field()
  login!: string;

  @Field()
  password!: string;
}
