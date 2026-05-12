import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ApiV1Module } from './api/v1';
import { PrismaModule } from './infra/db/prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/api/graphql',
      graphiql: true,
    }),

    PrismaModule,
    ApiV1Module,
  ],
})
export class AppModule {}
