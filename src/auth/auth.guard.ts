import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PUBLIC_ROUTE_KEY } from 'src/auth/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return null;
    }

    const [type, token] = authHeader.split(' ');

    if (type === 'Bearer' && token) {
      return token;
    }

    return null;
  }
}
