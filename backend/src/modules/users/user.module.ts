import { Module } from '@nestjs/common';
import { UserCreateService } from './application/user.create.service';

@Module({
    providers: [UserCreateService],
    exports: [UserCreateService],
})
export class UserModule {}
