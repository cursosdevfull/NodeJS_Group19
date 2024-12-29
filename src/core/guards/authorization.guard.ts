import { NextFunction, Request, Response } from 'express';

export class AuthorizationGuard {
  static execute(...rolesAllowed: string[]): any {
    return (request: Request, response: Response, next: NextFunction) => {
      const rolesUser = response.locals.roles as string[];

      if (!rolesAllowed.some((role) => rolesUser.includes(role))) {
        return response.status(403).json({ message: 'Forbidden' });
      }

      next();
    };
  }
}
