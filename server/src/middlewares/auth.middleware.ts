import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { PrismaClient } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';

const getAuthorization = req => {
  const { body } = req;

  if (body && body.Authorization) {
    const authorizationString = body.Authorization;
    const parts = authorizationString.split('=');
    if (parts.length === 2) {
      return parts[1]; // Return what's after the equal sign
    }
  }

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const { UserID } = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      const users = new PrismaClient().user;
      const findUser = await users.findUnique({ where: { UserID: Number(UserID) } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
