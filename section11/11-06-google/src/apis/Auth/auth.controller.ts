import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthService } from '../Auth/auth.service';

interface IOauthUser {
  user: {
    name: string;
    email: string;
    password: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(
    @Req() req: Request & IOauthUser, //
    @Res() res: Response,
  ) {
    return this.authService.loginOAuth({ req, res });
  }
}
