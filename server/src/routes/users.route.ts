import { UserController } from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class UserRoute implements Routes {
  public path = '/';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}users/getAllUsers`, this.user.getUsers);
    this.router.get(`${this.path}users/getUserInfo`, this.user.getUserInfo);
  }
}
