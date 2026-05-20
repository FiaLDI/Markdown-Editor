import { Test, TestingModule } from '@nestjs/testing';
import { LoginEndpoint } from './login.endpoint';
import { LoginService } from '@/modules/auth/application/auth.login.service';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@/infra/config/config.service';

describe('LoginEndpoint', () => {
  let endpoint: LoginEndpoint;
  let loginService: jest.Mocked<LoginService>;
  let configService: jest.Mocked<ConfigService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginEndpoint,
        {
          provide: LoginService,
          useValue: {
            login: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            jwtCookieName: 'access_token',
            isProduction: false,
          },
        },
      ],
    }).compile();

    endpoint = module.get<LoginEndpoint>(LoginEndpoint);
    loginService = module.get(LoginService);
    configService = module.get(ConfigService);
  });

  describe('login', () => {
    it('should set auth cookie and return result', async () => {
      const input: LoginDto = {
        email: 'test@mail.com',
        password: '123456',
      };
      const context = {
        res: {
          cookie: jest.fn(),
        },
      };

      loginService.login.mockResolvedValue('signed-jwt');

      const result = await endpoint.login(input, context);

      expect(loginService.login).toHaveBeenCalledWith(input);
      expect(context.res.cookie).toHaveBeenCalledWith(
        configService.jwtCookieName,
        'signed-jwt',
        {
          httpOnly: true,
          sameSite: 'lax',
          secure: configService.isProduction,
          path: '/',
        },
      );
      expect(result).toBe('logged in');
    });
  });
});
