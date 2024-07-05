import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './jwt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, UsersService, JwtStrategy],
  exports: [JwtAuthService],
})
export class AuthModule {}
