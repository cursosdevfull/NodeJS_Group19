//import 'dotenv/config';
import * as dotenv from 'dotenv';
import * as joi from 'joi';

dotenv.config({ path: 'variable.env' });

type EnvironmentVariables = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  DB_LOGG: boolean;
  DB_SYNC: boolean;
  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  REDIS_MAX_RETRIES_PER_REQUEST: number;
  REDIS_EXPIRES_IN: number;
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
      ACCESS_TOKEN_SECRET: joi.string().required(),
      ACCESS_TOKEN_EXPIRES_IN: joi.string().required(),
      REDIS_HOST: joi.string().required(),
      REDIS_PORT: joi.number().integer().required(),
      REDIS_PASSWORD: joi.string().required(),
      REDIS_MAX_RETRIES_PER_REQUEST: joi.number().integer().required(),
      REDIS_EXPIRES_IN: joi.number().integer().required(),
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
    redis: {
      host: value.REDIS_HOST,
      port: value.REDIS_PORT,
      password: value.REDIS_PASSWORD,
      maxRetriesPerRequest: value.REDIS_MAX_RETRIES_PER_REQUEST,
    },
    redisExpiresIn: value.REDIS_EXPIRES_IN,
    accessTokenSecret: value.ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: value.ACCESS_TOKEN_EXPIRES_IN,
  };
}

export const envs = loadEnvironmentVariables();
