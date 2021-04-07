import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/application.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {ConfigService} from "@nestjs/config";
import { ErrorHandler } from "./filters/error.filter";
const compression = require('compression');
import { LocalsMiddleware } from './app/middlewares/local.middleware';
import { RenderService } from 'nest-next';
const rateLimit = require("express-rate-limit");


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.use(compression());


    // Setup locals middleware
  app.use(LocalsMiddleware);

  //Set up cors
  app.enableCors();

  // Setup cookies
  const configService = app.get<ConfigService>(ConfigService);
  const cookieParser = require('cookie-parser');
  const cookieEncrypter = require('cookie-encrypter');
  const cookieSecret = configService.get('cookie_secret');
  app.use(cookieParser(cookieSecret));
  app.use(cookieEncrypter(cookieSecret));
  // app.useGlobalFilters (new ErrorFilter());

  const service = app.get(RenderService);
  service.setErrorHandler(async (err, _, res) => new ErrorHandler(res, err).handle());

  app.use(
      rateLimit({
        windowMs: configService.get('api_rate_limit_time') * 60 * 1000, // 15 minutes
        max: configService.get('api_rate_limit_max'), // limit each IP to 100 requests per windowMs
      }),
  );
  await app.listen(3000);
}

bootstrap();
