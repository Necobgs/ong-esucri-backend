import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { NoticeModule } from './notice/notice.module';
import { UserModule } from './user/user.module';
import { ActionModule } from './action/action.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:((configService:ConfigService)=>({ 
        type:'postgres',
        host:configService.get<string>('DATABASE_HOST'),
        database:configService.get<string>('DATABASE_NAME'),
        password:configService.get<string>('DATABASE_PASSWORD'),
        username:configService.get<string>('DATABASE_USERNAME'),
        port:+configService.get('DATABASE_PORT'),
        autoLoadEntities:true,
        synchronize:true,
        logging:true
      }))
  }),
    NoticeModule,
    UserModule,
    ActionModule,
    ConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
