import { Module } from '@nestjs/common';
import { AuthV1ApiModule } from './auth';

@Module({
  imports: [
    AuthV1ApiModule,
  ],
})
export class ApiV1Module {}
