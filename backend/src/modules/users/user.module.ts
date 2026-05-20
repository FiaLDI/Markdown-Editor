import { Module } from '@nestjs/common';
import { UserCreateService } from './application/user.create.service';
import { UserFindByEmailService } from './application/user.find-by-email.service';

@Module({
    providers: [UserCreateService, UserFindByEmailService],
    exports: [UserCreateService, UserFindByEmailService],
})
export class UserModule {}
