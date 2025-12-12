import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      this.loggingService.error(
        `HTTP Exception: ${status} - ${exceptionResponse instanceof Error ? exceptionResponse.message : JSON.stringify(exceptionResponse)};`,
      );

      response.status(status).json(exceptionResponse);

      return;
    }

    this.loggingService.error(
      `Unexpected Exception: ${exception instanceof Error ? exception.message : JSON.stringify(exception)}`,
    );

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: 'Internal server error',
    });
  }
}
