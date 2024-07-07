import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthService } from './jwt.service';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid JWT token');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Missing JWT token');
    }

    if (this.tokenBlacklistService.isBlacklisted(token)) {
      throw new UnauthorizedException('Blacklisted JWT token');
    }

    try {
      const validToken = await this.jwtAuthService.verifyToken(token);
      if (validToken) {
        request.user = validToken;
        return true;
      }
      throw new UnauthorizedException('Invalid JWT token');
    } catch (error) {
      throw new UnauthorizedException('Invalid JWT token', error.message);
    }
  }
}
