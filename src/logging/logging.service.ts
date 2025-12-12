import { Injectable, LoggerService } from '@nestjs/common';
import { appendFileSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { join } from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevel: number;
  private maxFileSize: number;
  private logDir = join(process.cwd(), 'logs');

  constructor() {
    const level = process.env.LOG_LEVEL;
    this.logLevel = level ? parseInt(level, 10) : 2;

    const size = process.env.LOG_MAX_FILE_SIZE;

    this.maxFileSize = (size ? parseInt(size, 10) : 5) * 1024; // Default 5 kB

    try {
      mkdirSync(this.logDir, { recursive: true });
    } catch (error) {
      console.error(`Failed to create log directory: ${error.message}`);
    }
  }

  error(message: string, ...args: unknown[]) {
    if (this.logLevel >= 0) {
      const content = this.formatMessage('ERROR', message, ...args);
      console.error(content.trim());

      this.writeToFile('error.log', content);
      this.writeToFile('app.log', content);
    }
  }

  warn(message: string, ...args: unknown[]) {
    if (this.logLevel >= 1) {
      const content = this.formatMessage('WARN', message, ...args);

      console.warn(content.trim());

      this.writeToFile('app.log', content);
    }
  }

  log(message: string, ...args: unknown[]) {
    if (this.logLevel >= 2) {
      const content = this.formatMessage('INFO', message, ...args);

      console.log(content.trim());

      this.writeToFile('app.log', content);
    }
  }

  debug?(message: string, ...args: unknown[]) {
    if (this.logLevel >= 3) {
      const content = this.formatMessage('DEBUG', message, ...args);

      console.debug(content.trim());

      this.writeToFile('app.log', content);
    }
  }

  verbose?(message: string, ...args: unknown[]) {
    if (this.logLevel >= 4) {
      const content = this.formatMessage('VERBOSE', message, ...args);

      console.debug(content.trim());

      this.writeToFile('app.log', content);
    }
  }

  formatMessage(type: string, message: string, ...args: unknown[]): string {
    const content = `[${new Date().toLocaleTimeString()}]: ${message}`;

    return `[${type}] ${content} ${args.join(' ')}\n`;
  }

  writeToFile(filename: string, message: string) {
    const filePath = join(this.logDir, filename);
    const msgSize = Buffer.byteLength(message, 'utf8');

    try {
      const stats = statSync(filePath);

      if (stats.size >= this.maxFileSize + msgSize) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        const name = filename.replace('.log', '');
        const newFileName = `${name}_${timestamp}.log`;
        const newFilePath = join(this.logDir, newFileName);

        renameSync(filePath, newFilePath);
      }

      appendFileSync(filePath, message + '\n', 'utf8');
    } catch (error) {
      console.error(`Failed to write log to file: ${error.message}`);
    }
  }
}
