import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService) {}

  @MessagePattern({ qqq: '이름' })
  login() {
    //로그인 진행
    return 'accessToken!!!';
  }

  logout() {
    //로그아웃
  }

  restoreAccessToken() {
    //토큰 재발급
  }
}
