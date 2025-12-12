import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;

    const start = Date.now();

    this.loggingService.log(
      `Incoming Request: ${method} ${url} - Query: ${JSON.stringify(query)} - Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.loggingService.log(
        `Request Completed: ${method} ${url} - Status: ${res.statusCode} - Duration: ${duration}ms`,
      );
    });

    next();
  }
}
