import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './services/auth/auth.service';

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
  @ApiUnauthorizedResponse({ description: 'Неправильно введён логин или пароль' })
  public async login(@Body() authData: AuthDto) {    
    const user = await this.authService.validateUser(authData.userName, authData.password);

    if (!user) {
      throw new HttpException('Неправильно введён логин или пароль', HttpStatus.UNAUTHORIZED);
    }

    return this.authService.login(user);
  }

}
