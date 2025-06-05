import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NoticeModule } from './notice/notice.module';
import { UserModule } from './user/user.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from './email/email.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:path.resolve(process.cwd(),'uploads'),
      serveRoot:"/uploads"
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        database: configService.get<string>('DATABASE_NAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        username: configService.get<string>('DATABASE_USERNAME'),
        port: +configService.get('DATABASE_PORT'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get("SSL_ENABLED")== 'true' ? true : false,
      }),
    }),
    NoticeModule,
    UserModule,
    ConfigurationModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}