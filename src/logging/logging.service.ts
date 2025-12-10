import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel: number;

  constructor() {
    const level = process.env.LOG_LEVEL;
    this.logLevel = level ? parseInt(level, 10) : 2;
  }

  error(message: string, ...args: unknown[]) {
    if (this.logLevel >= 0) {
      console.error(
        `[ERROR] [${new Date().toLocaleTimeString()}]: ${message}`,
        ...args,
      );
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.logLevel >= 1) {
      console.warn(
        `[WARN] [${new Date().toLocaleTimeString()}]: ${message}`,
        ...args,
      );
    }
  }

  log(message: string, ...args: unknown[]) {
    if (this.logLevel >= 2) {
      console.log(
        `[INFO] [${new Date().toLocaleTimeString()}]: ${message}`,
        ...args,
      );
    }
  }

  debug?(message: string, ...args: unknown[]) {
    if (this.logLevel >= 3) {
      console.debug(
        `[DEBUG] [${new Date().toLocaleTimeString()}]: ${message}`,
        ...args,
      );
    }
  }

  verbose?(message: string, ...args: unknown[]) {
    if (this.logLevel >= 4) {
      console.debug(
        `[VERBOSE] [${new Date().toLocaleTimeString()}]: ${message}`,
        ...args,
      );
    }
  }
}
