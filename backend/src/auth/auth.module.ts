import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/users/users.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenBlacklistModule } from './token-blacklist.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwtkey',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    TokenBlacklistModule,
  ],
  controllers: [],
  providers: [AuthService, JwtAuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthService],
})
export class AuthModule {}
