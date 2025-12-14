import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RefreshDto } from 'src/auth/dto/refresh.dto';
import { SignupAuthDto } from 'src/auth/dto/signup.dto';
import { Public } from 'src/auth/public.decorator';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createUserDto: SignupAuthDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: SignupAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }
}
