
import { FileCreateService } from '@/modules/files/application/files.create.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileDto } from '../dto';


@Resolver('files')
export class CreateFilesEndpoint {
  constructor(private readonly fileService: FileCreateService) {}

  @Mutation(() => String)
  register(@Args('input') input: FileDto ) {
    return this.fileService.createFile(input);
  }
}
