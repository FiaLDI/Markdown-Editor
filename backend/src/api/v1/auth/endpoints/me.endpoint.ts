import { UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import { AuthMeService } from '@/modules/auth/application/auth.me.service';
import { GqlJwtAuthGuard } from '@/modules/auth/guards/gql-jwt-auth.guard';
import { MeDto } from '../dto/me.dto';

type GraphqlContext = {
  req: {
    user: MeDto;
  };
};

@Resolver()
export class MeEndpoint {
  constructor(private readonly authMeService: AuthMeService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => MeDto)
  me(@Context() context: GraphqlContext): MeDto {
    return this.authMeService.getMe(context.req.user);
  }
}
