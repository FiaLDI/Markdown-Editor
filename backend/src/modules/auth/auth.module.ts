import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import type { StringValue } from 'ms';
import { AuthMeService } from './application/auth.me.service';
import { RegisterService } from './application/auth.register.service';
import { LoginService } from './application/auth.login.service';
import { PasswordService } from './application/password.service';
import { UserModule } from '../users';
import { ConfigService } from '@/infra/config/config.service';
import { ConfigModule } from '@/infra/config/config.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GqlJwtAuthGuard } from './guards/gql-jwt-auth.guard';

@Module({
    imports: [
      ConfigModule,
      UserModule,
      PassportModule,
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          secret: configService.jwtSecret,
          signOptions: { expiresIn: configService.jwtExpiresIn as StringValue },
        }),
      }),
    ],
    providers: [AuthMeService, RegisterService, LoginService, PasswordService, JwtStrategy, GqlJwtAuthGuard],
    exports: [AuthMeService, RegisterService, LoginService, GqlJwtAuthGuard],
})
export class AuthModule {}
