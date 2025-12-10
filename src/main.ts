import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import { LoggingService } from 'src/logging/logging.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggingService);
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerFilePath = join(__dirname, '..', 'doc', 'api.yaml');

  try {
    const apiSpecText = await readFile(swaggerFilePath, 'utf8');
    const document = load(apiSpecText) as OpenAPIObject;

    SwaggerModule.setup('doc', app, document);
  } catch (error) {
    console.error('Failed to load OpenAPI spec:', error.message);
  }

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
