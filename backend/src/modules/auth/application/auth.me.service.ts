import { Injectable } from '@nestjs/common';
import { MeDto } from '@/api/v1/auth/dto/me.dto';

@Injectable()
export class AuthMeService {
  getMe(user: MeDto): MeDto {
    return user;
  }
}
