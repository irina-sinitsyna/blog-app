import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const token = await this.jwtAuthService.signPayload(payload);

    return { access_token: token };
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.usersService.createUser(body.email, body.password);
  }
}
