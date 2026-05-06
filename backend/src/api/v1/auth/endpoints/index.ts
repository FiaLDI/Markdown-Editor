import { Controller, Get } from '@nestjs/common';
import { AuthModule } from '../../../../modules/auth/application';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthModule) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
