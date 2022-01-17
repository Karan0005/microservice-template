import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { getSentryTransport } from './config';
import { WinstonModule } from 'nest-winston';
import { AppLoggerTransports, TransformInterceptor, AppExceptionsFilter, BaseMessage } from '@corporate/utilities';
import express from 'express';
import { WhiteListedDAPRRoutes } from './modules/dapr/constants';
import { setupSecretValues } from './environments/environment';
import { DemoModule } from './modules/demo/demo.module';

async function bootstrap() {
  //Setting Up Environment Variables
  await setupSecretValues();
  const app = await NestFactory.create(AppModule, { cors: true, bodyParser: true });
  const configService = app.get(ConfigService);
  const routePrefix: string = configService.get('server.routePrefix') || 'base/v1';

  //Setting Up Request Parser
  app.use(express.json({ type: ['application/*+json', 'application/json'] }));
  app.use(express.urlencoded({ extended: true }));

  //Setting Up Logger
  const sentryTransportConfig = configService.get('sentry');
  if (sentryTransportConfig) {
    AppLoggerTransports.push(getSentryTransport(sentryTransportConfig));
  }
  const appLogger = WinstonModule.createLogger({ transports: AppLoggerTransports });

  //Setting Up Middlewares
  app.useLogger(appLogger);
  app.setGlobalPrefix(routePrefix, { exclude: WhiteListedDAPRRoutes });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new AppExceptionsFilter(appLogger));
  app.useGlobalInterceptors(new TransformInterceptor(appLogger));

  //Setting Up Swagger Documentation
  const options = new DocumentBuilder()
    .setTitle('corporate Base Microservice')
    .setDescription('Api Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, { include: [AppModule, DemoModule] });
  SwaggerModule.setup(routePrefix + '/docs', app, document);

  //Initiating Server
  const port = configService.get('server.port');
  await app.listen(port);
  appLogger.log(BaseMessage.ServerStartUp + port);
}

bootstrap();
