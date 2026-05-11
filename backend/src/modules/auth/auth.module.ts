import { Module } from '@nestjs/common';
import { AuthMeService } from './application/auth.me.service';

@Module({
    providers: [AuthMeService],
    exports: [AuthMeService],
})
export class AuthModule {}
