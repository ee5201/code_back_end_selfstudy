import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // interface(클래스)= implements(함수 )
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('에외내용', message);
    console.log('에외코드', status);
  }
}
