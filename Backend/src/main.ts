// Only For module alias
import 'module-alias/register';
import * as path from 'path';
import * as moduleAlias from 'module-alias';
moduleAlias.addAliases({
  '@domain': path.resolve(__dirname, 'domain'),
  '@application': path.resolve(__dirname, 'application'),
  '@infrastructure': path.resolve(__dirname, 'infrastructure'),
  '@constants': path.format({ dir: __dirname, name: 'constants' }),
});

// App modules
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from '@constants';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow requests from the frontend village
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies for Google OAuth
  });
  console.log(
    'City gates configured with CORS for origin: http://localhost:3000 at',
    new Date().toLocaleString(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());

  // Swagger configuration
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('NestJS Clean Architecture API')
      .setDescription('The NestJS Clean Architecture API description')
      .setVersion('1.0')
      .addTag('users')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(APP_PORT);
  console.log(
    'Running on port ==> ',
    APP_PORT,
    'at',
    new Date().toLocaleString(),
  );
}
bootstrap();
