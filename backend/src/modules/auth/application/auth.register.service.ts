import { Injectable } from '@nestjs/common';
import { RegisterDto } from '@/api/v1/auth/dto/register.dto';
import { UserCreateService } from '@/modules/users/application/user.create.service';
import { PasswordService } from './password.service';

@Injectable()
export class RegisterService {
  constructor(
    private readonly userCreateService: UserCreateService,
    private readonly passwordService: PasswordService,
  ) {}

  async register(input: RegisterDto) {
    const passwordHash = await this.passwordService.hash(input.password);

    await this.userCreateService.createUser({
      login: input.login,
      email: input.email,
      passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return 'registered';
  }
}
