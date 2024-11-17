import 'dotenv/config';

import * as joi from 'joi';

type EnvironmentVariables = {
  PORT: number;
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
  };
}

export const envs = loadEnvironmentVariables();
