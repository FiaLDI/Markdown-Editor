import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get redisUrl(): string {
    const value = process.env.REDIS_URL;
    if (!value) {
      throw new Error('REDIS_URL is not defined');
    }
    return value;
  }

  get databaseUrl(): string {
    const value = process.env.DATABASE_URL;
    if (!value) {
      throw new Error('DATABASE_URL is not defined');
    }
    return value;
  }

  get port(): number {
    return Number(process.env.PORT ?? 3000);
  }
}
