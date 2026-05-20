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

  get jwtSecret(): string {
    const value = process.env.JWT_SECRET;
    if (!value) {
      throw new Error('JWT_SECRET is not defined');
    }
    return value as string;
  }

  get jwtExpiresIn(): string {
    return process.env.JWT_EXPIRES_IN ?? '15m' as string;
  }

  get jwtCookieName(): string {
    return process.env.JWT_COOKIE_NAME ?? 'access_token';
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get passwordHashMemoryCost(): number {
    return Number(process.env.PASSWORD_HASH_MEMORY_COST ?? 19456);
  }

  get passwordHashTimeCost(): number {
    return Number(process.env.PASSWORD_HASH_TIME_COST ?? 2);
  }

  get passwordHashParallelism(): number {
    return Number(process.env.PASSWORD_HASH_PARALLELISM ?? 1);
  }
}
