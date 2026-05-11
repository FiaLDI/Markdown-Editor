import { Test } from '@nestjs/testing';
import { AuthMeService } from './auth.me.service';

describe('AppService', () => {
  let service: AuthMeService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthMeService],
    }).compile();

    service = app.get<AuthMeService>(AuthMeService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getMe()).toEqual({ message: 'Hello API from SERVICE 123' });
    });
  });
});
