import { Test, TestingModule } from '@nestjs/testing';
import { LoginEndpoint } from './login.endpoint';
import { LoginService } from '@/modules/auth/application/auth.login.service';
import { LoginDto } from '../dto/login.dto';

describe('LoginEndpoint', () => {
  let endpoint: LoginEndpoint;
  let loginService: jest.Mocked<LoginService>;

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
      ],
    }).compile();

    endpoint = module.get<LoginEndpoint>(LoginEndpoint);
    loginService = module.get(LoginService);
  });

  describe('login', () => {
    it('should call LoginService.login and return result', () => {
      const input: LoginDto = {
        email: 'test@mail.com',
        password: '123456',
      };

      loginService.login.mockReturnValue('logged in');

      const result = endpoint.login(input);

      expect(loginService.login).toHaveBeenCalledWith(input);
      expect(result).toBe('logged in');
    });
  });
});
