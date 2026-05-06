import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthModule {
  getData(): { message: string } {
    return { message: 'Hello API 123' }
  }
}
