import { Module } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { AppController } from './auth/endpoints';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AuthModule],
})
export class AppModule {}
