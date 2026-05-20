import { Injectable } from '@nestjs/common'
import { UserDTO } from '../dto/user.dto';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { mapPrismaError } from '@/infra/db/prisma/prisma-error.mapper';
import { UserCreateResultDTO } from '../dto/user.create.result.dto';

@Injectable()
export class UserCreateService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(user: UserDTO ): Promise<UserCreateResultDTO> {
        try {
            const userCreated = await this.prisma.user.create({
                data: {
                    login: user.login,
                    email: user.email,
                    passwordHash: user.passwordHash,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            });

            return { id: userCreated.id, email: userCreated.email, login: userCreated.login }
        } catch (error) {
            throw mapPrismaError(error);
        }
    }
}
