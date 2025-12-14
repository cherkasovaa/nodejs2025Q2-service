import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import { ExceptionsFilter } from 'src/logging/exceptions.filter';
import { LoggingService } from 'src/logging/logging.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(LoggingService);
  app.useLogger(logger);
  app.useGlobalFilters(new ExceptionsFilter(logger));

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

  process.on('uncaughtException', (error: Error) => {
    logger.error(
      `Caught exception: ${error}\n` + `Exception origin: ${error.stack}`,
    );
  });

  process.on(
    'unhandledRejection',
    (reason: string, promise: Promise<unknown>) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
    },
  );

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
