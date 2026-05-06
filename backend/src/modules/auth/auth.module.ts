import { Module } from '@nestjs/common';
import { AuthModule } from './application';
import { AuthController } from '@/api/v1/auth/endpoints';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthModule],
})
export class AppModule {}
