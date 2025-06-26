import { Body, Controller, HttpCode, HttpStatus, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto:AuthLoginDto){
    return this.authService.login(dto)
  }

  @Post('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Req() request: Request) {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token não fornecido ou inválido');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.verifyToken(token);
  }
}
