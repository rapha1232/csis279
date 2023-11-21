import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';

@Service()
export class AuthService {
  public users = new PrismaClient().user;

  public async signup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.users.findUnique({ where: { Email: userData.Email } });
    if (findUser) throw new HttpException(409, `This email ${userData.Email} already exists`);

    const hashedPassword = await hash(userData.Password, 10);
    const createUserData: Promise<User> = this.users.create({ data: { ...userData, Password: hashedPassword } });

    return createUserData;
  }

  public async login(Email: string, Password: string): Promise<{ cookie: string; findUser: User }> {
    const findUser: User = await this.users.findUnique({ where: { Email: Email } });
    if (!findUser) throw new HttpException(409, `This email ${Email} was not found`);

    const isPasswordMatching: boolean = await compare(Password, findUser.Password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await this.users.findFirst({ where: { Email: userData.Email, Password: userData.Password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { UserID: user.UserID };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
