import { Test, TestingModule } from '@nestjs/testing';
import { HealthEndpoint } from './health.check.endpoint';

describe('HealthEndpoint', () => {
  let endpoint: HealthEndpoint;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthEndpoint],
    }).compile();

    endpoint = module.get<HealthEndpoint>(HealthEndpoint);
  });

  describe('health', () => {
    it('should return ok', () => {
      expect(endpoint.health()).toBe('ok');
    });
  });
});
