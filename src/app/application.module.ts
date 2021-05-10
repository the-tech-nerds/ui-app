import { RenderModule } from 'nest-next';
import Next from 'next';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { commonConfig, GatewayModule } from "@the-tech-nerds/common-services";
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from "./config/configuration";
import { AuthenticationModule } from './authentication/authentication.module';
import { LocalsMiddleware } from './middlewares/local.middleware';
import { UserModule } from "./user/user.module";
import { HomeModule } from "./Home/home.module";
import { CategoryModule } from './category/category.module';
import { resolve } from 'path';
import { ProductModule } from './product/product.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        // conf: { useFilesystemPublicRoutes: false },
        dir: resolve(__dirname, '../../')
      }),
      { passthrough404: true, }
    ),
    GatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, commonConfig],
    }),
    AuthenticationModule,
    UserModule,
    HomeModule,
    CategoryModule,
    ProductModule,
    WishlistModule,
    ShopModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LocalsMiddleware)
      .forRoutes({
        path: '*', method: RequestMethod.ALL
      });
  }
}