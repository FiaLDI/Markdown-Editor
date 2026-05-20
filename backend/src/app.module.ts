import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ApiV1Module } from './api/v1';
import { ConfigModule } from './infra/config/config.module';
import { PrismaModule } from './infra/db/prisma/prisma.module';
import type { Request, Response } from 'express';


@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/api/graphql',
      graphiql: true,
      context: ({ req, res }: {req: Request; res: Response}) => ({ req, res }),
    }),

    PrismaModule,
    ApiV1Module,
  ],
})
export class AppModule {}
