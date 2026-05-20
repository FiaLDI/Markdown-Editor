import { Module } from '@nestjs/common';
import { healthV1Imports } from './deps';
import { healthV1Endpoints } from './endpoints';

@Module({
  imports: [...healthV1Imports],
  providers: [...healthV1Endpoints],
})
export class HealthV1ApiModule {}
