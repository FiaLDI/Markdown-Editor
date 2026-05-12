import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthEndpoint {
  @Query(() => String)
  health() {
    return 'ok';
  }
}
