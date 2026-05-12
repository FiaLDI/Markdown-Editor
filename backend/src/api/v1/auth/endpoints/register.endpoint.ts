import { RegisterService } from '@/modules/auth/application/auth.register.service';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterDto } from '../dto/register.dto';


@Resolver('auth')
export class RegisterEndpoint {
  constructor(private readonly registerService: RegisterService) {}

  @Mutation(() => String)
  register(@Args('input') input: RegisterDto ) {
    return this.registerService.register(input);
  }
}
