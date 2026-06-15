
import { FileCreateService } from '@/modules/files/application/files.create.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';


@Resolver('files')
export class CreateFilesEndpoint {
  constructor(private readonly fileService: FileCreateService) {}

  @Mutation(() => String)
  register(@Args('input') input: {} ) {
    return this.fileService.createFile(input);
  }
}
