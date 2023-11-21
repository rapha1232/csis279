import { User } from '@interfaces/users.interface';
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async getAllUsers(): Promise<Omit<User, 'Password'>[]> {
    const allUser: Omit<User, 'Password'>[] = await this.user.findMany({
      select: { UserID: true, FirstName: true, LastName: true, Email: true },
    });
    return allUser;
  }

  public async getUserInfo(UserID: number): Promise<Omit<User, 'Password'>> {
    const userInfo: Omit<User, 'Password'> = await this.user.findUnique({
      where: { UserID: UserID },
      select: { UserID: true, FirstName: true, LastName: true, Email: true },
    });
    return userInfo;
  }
}
