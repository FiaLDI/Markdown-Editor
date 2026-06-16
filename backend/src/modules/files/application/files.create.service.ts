import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/infra/db/prisma/prisma.service';

@Injectable()
export class FileCreateService {
  constructor(private readonly prisma: PrismaService) {}

  async createFile(fileData: any): Promise<any> {
    try {
      const createdFile = await this.prisma.file.create({
        data: {
          filename: fileData.name,
          url: fileData.url,
          size: fileData.size,
        }
      });
    }
    catch (error) {
      console.error('Error creating file:', error);
      throw new Error('Failed to create file');
    }
  }
}
