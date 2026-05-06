import { Module } from '@nestjs/common';
import { authV1Imports } from './deps';
import { authV1Endpoints } from './endpoints';

@Module({
  imports: [...authV1Imports],
  controllers: [...authV1Endpoints],
})
export class AuthV1ApiModule {}