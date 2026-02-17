import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envConfig } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Customer Service')
    .setDescription('Party Management API (TMF632/629) — Gestao de Clientes')
    .setVersion('1.0.0')
    .addTag('Customers', 'Operacoes de cadastro e gestao de clientes')
    .addTag('Customer Documents', 'Documentos de identificacao')
    .addTag('Customer Addresses', 'Enderecos do cliente')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(envConfig.port);
  console.log(`Customer Service running on port ${envConfig.port}`);
  console.log(`Swagger: http://localhost:${envConfig.port}/api/docs`);
}

bootstrap();
