import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { TokenService } from '../utils/token.service';

export class AuthenticationGuard {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): any {
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      return response.status(401).json({ message: 'Unauthenticated' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return response.status(401).json({ message: 'Unauthenticated' });
    }

    const validateAccessToken = TokenService.verifyAccessToken(token);

    if (!validateAccessToken.valid) {
      if (validateAccessToken.expired) {
        return response
          .status(403)
          .json({ message: 'Forbidden - Token expired' });
      } else {
        return response
          .status(401)
          .json({ message: 'Unauthenticated - Invalid token' });
      }
    }

    const roles: string[] = (
      validateAccessToken.decoded as JwtPayload
    ).roles.map((role: { name: string }) => role.name);

    response.locals.roles = roles;

    next();
  }
}
