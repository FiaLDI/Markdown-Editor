import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@/infra/config/config.service';

type JwtPayload = {
  sub: string;
  email: string;
  login: string | null;
};

function extractTokenFromCookie(
  cookieName: string,
  req?: { headers?: { cookie?: string } },
): string | null {
  const cookieHeader = req?.headers?.cookie;

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';');

  for (const cookie of cookies) {
    const [rawName, ...rawValueParts] = cookie.trim().split('=');

    if (rawName === cookieName) {
      return decodeURIComponent(rawValueParts.join('='));
    }
  }

  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const cookieName = configService.jwtCookieName;

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: { headers?: { cookie?: string } }) => {
          const token = extractTokenFromCookie(cookieName, req);

          if (token) {
            return token;
          }

          return null;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      login: payload.login,
    };
  }
}
