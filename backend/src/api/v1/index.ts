import { Module } from '@nestjs/common';
import { AuthV1ApiModule } from './auth';
import { HealthV1ApiModule } from './health';
import { FilesV1ApiModule } from './files';

@Module({
  imports: [
    AuthV1ApiModule,
    HealthV1ApiModule,
    FilesV1ApiModule,
  ],
})
export class ApiV1Module {}
