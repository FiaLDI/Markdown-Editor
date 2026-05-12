import { Module } from '@nestjs/common';
import { AuthMeService } from './application/auth.me.service';
import { RegisterService } from './application/auth.register.service';
import { LoginService } from './application/auth.login.service';
import { UserModule } from '../users';

@Module({
    imports: [UserModule],
    providers: [AuthMeService, RegisterService, LoginService],
    exports: [AuthMeService, RegisterService, LoginService],
})
export class AuthModule {}
