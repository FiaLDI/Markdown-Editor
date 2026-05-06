import { AuthModule } from '@/modules/auth';
import { Controller, Get } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthModule) {}

  @Get()
  getData() {
    return "this.appService.getData()";
  }
}