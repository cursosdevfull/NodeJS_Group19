export enum BaseExceptionCode {
  Default = 'DEFAULT_EXCEPTION',
  DATABASE_EXCEPTION = 'DATABASE_EXCEPTION',
}

export abstract class BaseException extends Error {
  status!: number;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, BaseException.prototype);

    this.name = BaseExceptionCode.Default;
  }
}
