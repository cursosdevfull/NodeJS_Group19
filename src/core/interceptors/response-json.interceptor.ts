import { NextFunction, Request, Response } from 'express';

export const ResponseJson = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const originalJson = response.json;

  response.json = function (data) {
    if (response.statusCode === 200 || response.statusCode === 201) {
      return originalJson.call(this, {
        provider: 'CursosDev - https://cursos-dev.com',
        status: 'success',
        statusCode: response.statusCode,
        result: {
          response: data,
        },
      });
    } else if (response.statusCode >= 400 && response.statusCode < 600) {
      return originalJson.call(this, {
        provider: 'CursosDev - https://cursos-dev.com',
        status: 'error',
        statusCode: response.statusCode,
        result: {
          response: data,
        },
      });
    }

    return originalJson.call(this, { data });
  };

  next();
};
