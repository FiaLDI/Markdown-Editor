import { Injectable } from '@nestjs/common'
import { UserDTO } from '../dto/user.dto';
import { PrismaService } from '@/infra/db/prisma/prisma.service';

@Injectable()
export class UserCreateService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(user: UserDTO ): Promise<{message: string}> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                login: user.login,
                email: user.email,
                passwordHash: user.passwordHash,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });

        return { message: 'User created successfully' }
    }
}
