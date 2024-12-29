import { BaseException, BaseExceptionCode } from './base.exception';

export class DatabaseException extends BaseException {
  constructor(message?: string) {
    super(message);
    this.name = BaseExceptionCode.DATABASE_EXCEPTION;
  }
}
