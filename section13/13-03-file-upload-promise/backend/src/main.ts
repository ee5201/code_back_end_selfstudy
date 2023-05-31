import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // ValidationPipe()는 유효성 검사이다 작성한 코드에 대한 유효성 검사후 resolver나 module로 실행하게 된다.

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: 'http://127.0.0.1:5501',
  });
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
