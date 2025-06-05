import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory: (configService:ConfigService)=>({
      secret:configService.get("JWT_SECRET"),   
      signOptions: { expiresIn: '1d' }
    })
  }),
  UserModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule],
})
export class AuthModule {}
