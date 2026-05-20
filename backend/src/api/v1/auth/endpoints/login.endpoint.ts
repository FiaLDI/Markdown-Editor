import { Context, Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginDto } from '../dto/login.dto';
import { LoginService } from '@/modules/auth/application/auth.login.service';
import { ConfigService } from '@/infra/config/config.service';

type GraphqlContext = {
  res: {
    cookie: (
      name: string,
      value: string,
      options: {
        httpOnly: boolean;
        sameSite: 'lax' | 'strict' | 'none';
        secure: boolean;
        path: string;
      },
    ) => void;
  };
};

@Resolver()
export class LoginEndpoint {
  constructor(
    private readonly loginService: LoginService,
    private readonly configService: ConfigService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('input') input: LoginDto,
    @Context() context: GraphqlContext,
  ) {
    const accessToken = await this.loginService.login(input);

    context.res.cookie(this.configService.jwtCookieName, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: this.configService.isProduction,
      path: '/',
    });

    return 'logged in';
  }
}
