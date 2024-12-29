import * as bcrypt from 'bcryptjs';

export class CypherService {
  static async hash(value: string, salt: number): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
