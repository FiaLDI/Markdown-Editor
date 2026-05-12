import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { UserFindByEmailResultDTO } from '../dto/user.find-by-email.result.dto';

@Injectable()
export class UserFindByEmailService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserFindByEmailResultDTO | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        login: true,
        email: true,
        passwordHash: true,
      },
    });
  }
}
