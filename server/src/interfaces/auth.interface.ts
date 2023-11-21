import { User } from '@interfaces/users.interface';
import { Request } from 'express';

export interface DataStoredInToken {
  UserID: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}
