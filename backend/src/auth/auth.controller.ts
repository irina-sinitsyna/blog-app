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
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = await this.jwtAuthService.signPayload(payload);

    return { access_token: token };
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.createUser(body.username, body.password);
  }
}
