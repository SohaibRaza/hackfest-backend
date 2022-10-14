import {
  Body,
  Controller,
  Get,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { User } from '~src/db';
import { GetUser } from '~src/decorators';
import { AuthGuard } from '~src/guards';
import { Auth } from '~src/lib/auth';
import { AuthResponse } from './authentication.interface';
import { AuthenticationService } from './authentication.service';
import { AuthenticationDto, LoginDto } from './dto/authentication.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/signup')
  async signUp(
    @Body() authenticationDto: AuthenticationDto,
    @Response() res,
  ): Promise<AuthResponse> {
    const user = await this.authenticationService.signUp(authenticationDto);
    return res.json(await Auth.formatAuthResponse(user));
  }

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Response() res,
  ): Promise<AuthResponse> {
    const user = await this.authenticationService.login(loginDto);
    return res.json(await Auth.formatAuthResponse(user));
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@Response() res, @GetUser() authUser: User): Promise<any> {
    const user = await this.authenticationService.findUserByEmail(
      authUser?.email,
    );
    return res.json(await Auth.formatAuthResponse(user));
  }
}
