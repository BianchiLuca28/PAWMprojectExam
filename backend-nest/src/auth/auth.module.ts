import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import keys from './../config/keys';
import constants from './../config/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: false }),
    // Configuring the library to use JWT
    JwtModule.register({
      secret: keys.jwtSecret,
      signOptions: { expiresIn: constants.expiryTimeJwt },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
