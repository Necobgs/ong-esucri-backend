import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  
  app.use(cookieParser())

  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted:true
  }))

  const config = new DocumentBuilder()
    .setTitle('API ONG Esucri')
    .setDescription('Documentação da API da ong')
    .setVersion('1.0')
    .addTag('ong')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();