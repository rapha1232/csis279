import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { verify } from 'jsonwebtoken';
import { CreateUserDto, LoginDto } from '../dtos/users.dto';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly users = new PrismaClient().user;
  constructor(private jwtService: JwtService) {}
  async signup(userData: CreateUserDto): Promise<User> {
    /* check for missing data */
    if (!userData.Email || !userData.Password) {
      /* status code is 400 */
      throw new BadRequestException('Missing Data');
    }

    /* check if the email is in use.
     * Note that this check is not necessary,
     * but this is the only way to know whether the email is taken
     *  */
    const userEmail: User | null = await this.users.findUnique({
      where: { Email: userData.Email },
    });

    /* check if already exists */
    if (userEmail) {
      /* status code is 401 */
      throw new UnauthorizedException('Email exists');
    }

    const hashedPassword = await hash(userData.Password, 10);

    try {
      /* try to create user */
      return this.users.create({
        data: { ...userData, Password: hashedPassword },
      });
    } catch (e) {
      this.logger.fatal(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(
    Email: string,
    Password: string,
  ): Promise<{ cookie: string; findUser: User }> {
    /* check for missing data */
    if (!Email || !Password) {
      /* status code is 400 */
      throw new BadRequestException('Missing Data');
    }

    /* fetch user */
    const user: User | null = await this.users.findUnique({
      where: { Email: Email },
    });

    /* Check if user exists */
    if (!user) {
      /* status code is 404 */
      throw new NotFoundException('User does not exist');
    }

    /* stores pass and hashed pass comparison */
    let correct: boolean;
    try {
      correct = await compare(Password, user.Password);
    } catch (e) {
      this.logger.fatal(e);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    /* Check for mismatch */
    if (!correct) {
      /* status code is 401 */
      throw new UnauthorizedException('Cannot login with these credentials');
    }
    /* payload to be added to the JWT token */
    const payload = { sub: user.UserID, email: user.Email };

    /* status code defined in controller */
    return {
      cookie: await this.jwtService.signAsync(payload, {
        expiresIn: Date.now() + parseInt(process.env.JWT_DURATION),
      }),
      findUser: user,
    };
  }

  async logout(userData: LoginDto): Promise<User> {
    const findUser = await this.users.findUnique({
      where: { Email: userData.Email },
    });

    if (!findUser) {
      throw new Error("User doesn't exist");
    }

    return findUser;
  }

  async verifyToken(token: string): Promise<{ UserID: number }> {
    return new Promise((resolve, reject) => {
      verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded as { UserID: number });
        }
      });
    });
  }

  async findUserById(userID: number): Promise<User | null> {
    return this.users.findUnique({ where: { UserID: userID } });
  }
}
