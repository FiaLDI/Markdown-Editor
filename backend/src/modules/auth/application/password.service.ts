import { ConfigService } from '@/infra/config';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordService {
  constructor(private readonly configService: ConfigService) {}

  hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: this.configService.passwordHashMemoryCost,
      timeCost: this.configService.passwordHashTimeCost,
      parallelism: this.configService.passwordHashParallelism,
    });
  }

  compare(password: string, hash: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }

  needsRehash(hash: string): boolean {
    return argon2.needsRehash(hash, {
      memoryCost: this.configService.passwordHashMemoryCost,
      timeCost: this.configService.passwordHashTimeCost,
      parallelism: this.configService.passwordHashParallelism,
    });
  }
}
