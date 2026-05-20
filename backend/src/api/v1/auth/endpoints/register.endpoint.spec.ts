import { Test, TestingModule } from '@nestjs/testing';
import { RegisterEndpoint } from './register.endpoint';
import { RegisterService } from '@/modules/auth/application/auth.register.service';
import { RegisterDto } from '../dto/register.dto';

describe('RegisterEndpoint', () => {
  let endpoint: RegisterEndpoint;
  let registerService: jest.Mocked<RegisterService>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterEndpoint,
        {
          provide: RegisterService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    endpoint = module.get<RegisterEndpoint>(RegisterEndpoint);
    registerService = module.get(RegisterService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should call RegisterService.register and return result', async () => {
      const input: RegisterDto = {
        email: 'test@mail.com',
        password: '123456',
      };

      registerService.register.mockResolvedValue('registered');

      const result = await endpoint.register(input);

      expect(registerService.register).toHaveBeenCalledWith(input);
      expect(registerService.register).toHaveBeenCalledTimes(1);
      expect(result).toBe('registered');
    });
  });
});