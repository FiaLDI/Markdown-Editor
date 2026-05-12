import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '@/api/v1/auth/dto/login.dto';
import { UserFindByEmailService } from '@/modules/users/application/user.find-by-email.service';
import { PasswordService } from './password.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly userFindByEmailService: UserFindByEmailService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: LoginDto): Promise<string> {
    const user = await this.userFindByEmailService.findByEmail(input.email);

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await this.passwordService.compare(
      input.password,
      user.passwordHash,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      login: user.login,
    });
  }
}
