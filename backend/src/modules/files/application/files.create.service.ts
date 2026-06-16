import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/db/prisma/prisma.service';

@Injectable()
export class FileCreateService {
  constructor(private readonly prisma: PrismaService) {}

  async createFile(fileData: any): Promise<any> {}
}
