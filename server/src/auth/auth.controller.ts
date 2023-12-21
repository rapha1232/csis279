import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { RequestWithUser } from 'src/middlewares/token.middleware';
import { CreateUserDto, LoginDto } from '../dtos/users.dto';
import { AuthGuard, SkipAuth } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiInternalServerErrorResponse({
  description:
    'Internal Server Error. An error occurred while processing the request.',
})
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserDto,
    description: 'User signup credentials.',
  })
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Missing Data',
  })
  @ApiUnauthorizedResponse({
    description: 'User (email) already exists',
  })
  @Post('signup')
  async signUp(
    @Body() userData: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const signUpUserData = await this.authService.signup(userData);
    res.status(201).json({ data: signUpUserData, message: 'signup' });
  }

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginDto,
    description: 'User signin credentials.',
  })
  @ApiOkResponse({
    description: 'User logged in successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Missing Data',
  })
  @ApiNotFoundResponse({
    description: 'User does not exist. Sign Up required',
  })
  @ApiUnauthorizedResponse({
    description: 'Wrong Credentials',
  })
  @Post('login')
  async logIn(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { cookie, findUser } = await this.authService.login(
      loginDto.Email,
      loginDto.Password,
    );
    res.setHeader('Set-Cookie', [cookie]);
    res.status(200).json({ data: findUser, message: 'login', cookie });
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Token was not sent in the header.',
  })
  @ApiHeader({
    name: 'autorization',
    description: 'The token needed for auth.',
    required: true,
    schema: {
      type: 'string',
      example: `Bearer {token}`,
    },
  })
  @ApiBody({
    type: LoginDto,
    description: 'User signin credentials to verify authentication.',
  })
  @ApiOkResponse({
    description: 'User logged out successfully.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async logOut(
    @Body() userData: LoginDto,
    @Req() req: RequestWithUser,
    @Res() res: Response,
  ): Promise<void> {
    const logOutUserData = await this.authService.logout(userData);
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    res.status(200).json({ data: logOutUserData, message: 'logout' });
  }
}
