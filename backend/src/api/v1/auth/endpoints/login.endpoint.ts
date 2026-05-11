import { AuthMeService } from '@/modules/auth/application/auth.me.service';
import { Controller, Get, Post } from '@nestjs/common';


@Controller('auth')
export class LoginController {
  constructor(private readonly authMeService: AuthMeService) {}

  @Get()
  getData() {
    return this.authMeService.getMe();
  }

  @Post()
  login() {
      return { message: 'Login endpoint' };
  }
}
