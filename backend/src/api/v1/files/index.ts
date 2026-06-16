import { Module } from '@nestjs/common';
import { filesV1Imports } from './deps';
import { fileV1Endpoints } from './endpoints';

@Module({
  imports: [...filesV1Imports],
  providers: [...fileV1Endpoints],
})
export class FilesV1ApiModule {}
