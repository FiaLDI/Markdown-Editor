import { Injectable } from '@nestjs/common';
import { LoginDto } from '@/api/v1/auth/dto/login.dto';

@Injectable()
export class LoginService {
  login(input: LoginDto) {
    console.log(input.email);
    console.log(input.password);

    return 'registered';
  }
}