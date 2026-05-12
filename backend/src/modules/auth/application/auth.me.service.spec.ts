import { Test } from '@nestjs/testing';
import { AuthMeService } from './auth.me.service';
import { MeDto } from '@/api/v1/auth/dto/me.dto';

describe('AppService', () => {
  let service: AuthMeService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthMeService],
    }).compile();

    service = app.get<AuthMeService>(AuthMeService);
  });

  describe('getMe', () => {
    it('should return current user payload', () => {
      const user: MeDto = {
        id: 'user-1',
        login: 'tester',
        email: 'tester@example.com',
      };

      expect(service.getMe(user)).toEqual(user);
    });
  });
});
