import jwt, { JwtPayload } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { envs } from '../../config/environment-vars';

export type ResultValidateAccessToken = {
  valid: boolean;
  expired: boolean;
  decoded?: JwtPayload | string;
};

export class TokenService {
  static generateRefreshToken() {
    return uuidv4();
  }

  static generateAccessToken(
    firstname: string,
    lastname: string,
    roles: any[],
  ) {
    return jwt.sign({ firstname, lastname, roles }, envs.accessTokenSecret, {
      expiresIn: envs.accessTokenExpiresIn,
    });
  }

  static verifyAccessToken(token: string): ResultValidateAccessToken {
    try {
      const decoded = jwt.verify(token, envs.accessTokenSecret);
      return { valid: true, expired: false, decoded };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return { valid: false, expired: true };
      } else {
        return { valid: false, expired: false };
      }
    }
  }
}
