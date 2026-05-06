import { Module } from '@nestjs/common';
import { ApiV1Module } from './api/v1';

@Module({
  imports: [
    ApiV1Module,
  ],
})
export class AppModule {}
