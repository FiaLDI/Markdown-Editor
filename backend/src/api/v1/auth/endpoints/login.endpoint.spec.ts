import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from './login.endpoint';
import { AuthMeService } from '@/modules/auth/application/auth.me.service';

describe('LoginController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [AuthMeService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const loginController = app.get<LoginController>(LoginController);
      expect(loginController.getData()).toEqual({ message: 'Hello API from SERVICE 123' });
    });
  });
});
