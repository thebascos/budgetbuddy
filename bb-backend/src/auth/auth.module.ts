import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './passport-config';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'imong mama',
      signOptions: { expiresIn: '1h' }, // Optional: Set token expiration
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
