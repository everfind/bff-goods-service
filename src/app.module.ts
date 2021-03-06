import { HttpModule, Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLFederationModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import resolvers from './resolvers';
import services from './services';

@Module({
  imports: [
    HttpModule,
    GraphQLFederationModule.forRoot({
      debug: true, // 生产环境中需要关闭
      introspection: true, // 生产环境中需要关闭
      path: '/goods/graphql',
      autoSchemaFile: true,
      playground: {
        // 生产环境中需要关闭
        settings: {
          'request.credentials': 'same-origin',
        },
      },
      context: (ctx) => {
        return ctx;
      },
    } as GqlModuleOptions),
  ],
  controllers: [AppController],
  providers: [...services, ...resolvers],
})
export class AppModule {}
