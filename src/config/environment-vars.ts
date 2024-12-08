import 'dotenv/config';

import * as joi from 'joi';

type EnvironmentVariables = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  DB_LOGG: boolean;
  DB_SYNC: boolean;
};

type ValidationEnvironmentVariables = {
  error: joi.ValidationError | undefined;
  value: EnvironmentVariables;
};

function validateEnvironmentVariables(vars: Record<string, any>) {
  // {[key: string]: any}
  const envSchema = joi
    .object({
      PORT: joi.number().integer().required(),
      DB_HOST: joi.string().required(),
      DB_PORT: joi.number().integer().required(),
      DB_USER: joi.string().required(),
      DB_PASS: joi.string().required(),
      DB_NAME: joi.string().required(),
      DB_LOGG: joi.boolean().required(),
      DB_SYNC: joi.boolean().required(),
    })
    .unknown(true);

  const { error, value } = envSchema.validate(vars);
  return { error, value };
}

function loadEnvironmentVariables() {
  const result: ValidationEnvironmentVariables = validateEnvironmentVariables(
    process.env,
  );

  if (result.error)
    throw new Error(`Config validation error: ${result.error.message}`);

  const value = result.value;

  return {
    port: value.PORT,
    db: {
      host: value.DB_HOST,
      port: value.DB_PORT,
      username: value.DB_USER,
      password: value.DB_PASS,
      database: value.DB_NAME,
      logging: value.DB_LOGG,
      synchronize: value.DB_SYNC,
      entities: ['src/modules/**/entities/*.entity.{ts,js}'],
    },
  };
}

export const envs = loadEnvironmentVariables();
