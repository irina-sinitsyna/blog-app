import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthService } from './jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],
})
export class AuthModule {}
