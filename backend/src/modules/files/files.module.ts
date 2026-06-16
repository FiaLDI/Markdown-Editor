import { Module } from '@nestjs/common';
import { FileCreateService } from './application/files.create.service';

@Module({
    providers: [FileCreateService],
    exports: [FileCreateService],
})
export class FilesModule {}
