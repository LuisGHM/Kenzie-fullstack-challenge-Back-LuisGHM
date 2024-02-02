import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Login")
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("")
  async login(@Body() user: LoginDto) {
    return this.authService.login(user)
  }
}
