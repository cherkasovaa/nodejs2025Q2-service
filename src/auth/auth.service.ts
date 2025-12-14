import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { StringValue } from 'ms';
import { SignupAuthDto } from 'src/auth/dto/signup.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: SignupAuthDto) {
    return this.userService.create(createUserDto);
  }

  async login(loginDto: SignupAuthDto) {
    const { login, password } = loginDto;

    const accessExpiresIn = (process.env.TOKEN_EXPIRE_TIME ??
      '1h') as StringValue;
    const refreshExpiresIn = (process.env.TOKEN_REFRESH_EXPIRE_TIME ??
      '24h') as StringValue;

    const user = await this.userService.findByLogin(login);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('Authentication failed');
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: accessExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    const accessExpiresIn = (process.env.TOKEN_EXPIRE_TIME ??
      '1h') as StringValue;
    const refreshExpiresIn = (process.env.TOKEN_REFRESH_EXPIRE_TIME ??
      '24h') as StringValue;

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const user = await this.userService.findOne(payload.userId);

      const newPayload = { userId: user.id, login: user.login };

      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: accessExpiresIn,
      });

      const newRefreshToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: refreshExpiresIn,
      });

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
}
