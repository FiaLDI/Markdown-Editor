import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

export function mapPrismaError(error: unknown): Error {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return new InternalServerErrorException('Unknown database error');
  }

  switch (error.code) {
    case 'P2002':
      return new ConflictException('Resource already exists');
    case 'P2025':
      return new NotFoundException('Record not found');
    case 'P2003':
      return new ConflictException('Foreign key constraint failed');
    case 'P2011':
    case 'P2000':
      return new BadRequestException('Invalid data');
    case 'P1001':
    case 'P1008':
    case 'P1017':
      return new ServiceUnavailableException('Database unavailable');
    default:
      return new InternalServerErrorException('Database request failed');
  }
}
