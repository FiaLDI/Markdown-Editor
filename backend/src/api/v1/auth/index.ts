import { Module } from '@nestjs/common';
import { authV1Imports } from './deps';
import { authV1Endpoints } from './endpoints';

@Module({
  imports: [...authV1Imports],
  providers: [...authV1Endpoints],
})
export class AuthV1ApiModule {}
