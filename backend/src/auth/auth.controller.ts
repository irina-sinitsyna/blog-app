import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  ConflictException,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt.service';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenBlacklistService } from './token-blacklist.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtAuthService: JwtAuthService,
    private readonly usersService: UsersService,
    private readonly tokenBlacklistService: TokenBlacklistService,
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
    const hashedPassword = await this.authService.hashPassword(body.password);
    const newUser = await this.usersService.createUser(
      body.email,
      hashedPassword,
    );

    const payload = { email: newUser.email, sub: newUser.id };
    const token = await this.jwtAuthService.signPayload(payload);

    return { access_token: token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid JWT token');
    }

    const token = authHeader.split(' ')[1];
    if (token) {
      this.tokenBlacklistService.add(token);
    }
    return { message: 'Logged out successfully' };
  }
}
