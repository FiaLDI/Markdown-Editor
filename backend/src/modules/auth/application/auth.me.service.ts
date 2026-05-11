import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthMeService {
  getMe(): { message: string } {
    return { message: 'Hello API from SERVICE 123' }
  }
}
