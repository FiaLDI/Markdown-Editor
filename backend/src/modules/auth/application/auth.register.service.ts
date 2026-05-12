import { Injectable } from '@nestjs/common';
import { RegisterDto } from '@/api/v1/auth/dto/register.dto';
import { UserCreateService } from '@/modules/users/application/user.create.service';

@Injectable()
export class RegisterService {
  constructor(private readonly userCreateService: UserCreateService) {}

  async register(input: RegisterDto) {
      await this.userCreateService.createUser({
        login: input.email,
        email: input.email,
        passwordHash: input.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      
      return 'registered';
  }
}
