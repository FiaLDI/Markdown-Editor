import { Test } from '@nestjs/testing';
import { AuthModule } from './';

describe('AppService', () => {
  let service: AuthModule;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AuthModule],
    }).compile();

    service = app.get<AuthModule>(AuthModule);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });
});
