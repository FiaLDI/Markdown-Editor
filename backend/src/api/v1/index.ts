import { Module } from '@nestjs/common';
import { AuthV1ApiModule } from './auth';
import { HealthV1ApiModule } from './health';

@Module({
  imports: [
    AuthV1ApiModule,
    HealthV1ApiModule
  ],
})
export class ApiV1Module {}
