import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '@/modules/auth/application/auth.login.service';

@Resolver()
export class LoginEndpoint {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => String)
  login(@Args('input') input: LoginDto) {
    return this.loginService.login(input);
  }
}