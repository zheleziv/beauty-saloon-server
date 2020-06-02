import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';

class AuthDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;
}

@Controller()
export class AppController {

  constructor(private authService: AuthService) { }

  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Пользователя не существует' })
  async login(@Body() authData: AuthDto) {
    const user = await this.authService.validateUser(authData.userName, authData.password);

    if (!user) {
      throw new HttpException('Неправильно введён логин или пароль', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }

}
