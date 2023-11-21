import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: Omit<User, 'Password'>[] = await this.user.getAllUsers();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const UserID = req.query.UserID;
    try {
      const userInfoData: Omit<User, 'Password'> = await this.user.getUserInfo(Number(UserID));
      res.status(200).json({ data: userInfoData, message: 'getInfo' });
    } catch (error) {
      next(error);
    }
  };
}
