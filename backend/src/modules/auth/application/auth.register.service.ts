import { Injectable } from '@nestjs/common';
import { RegisterDto } from '@/api/v1/auth/dto/register.dto';

@Injectable()
export class RegisterService {
  register(input: RegisterDto) {
    console.log(input.email);
    console.log(input.password);

    return 'registered';
  }
}