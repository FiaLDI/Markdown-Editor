import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileDto {
  @Field()
  filename!: string;
  @Field()
  url!: string;
  @Field()
  size!: number;
}
