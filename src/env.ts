import { cleanEnv, str, num, port, url } from 'envalid';

export const envs = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['DEV', 'PRODUCTION', 'LOCAL'] }),
  PORT: port({ default: 3000 }),

  DB_URI: url({
    default: 'mongodb://username:password@localhost:27018/db?authSource=admin',
  }),
  REDIS_URI: url({ default: 'redis://localhost:6379' }),

  OTP_EXPIRATION_TIME_IN_MINS: num({ default: 5 }),

  JWT_ISSUER: str({ default: 'mayank' }),
  JWT_AUDIENCE: str({ default: 'mayank' }),
  AUTH_TOKEN_EXPIRATION: str({ default: '3d' }),
  SECRET_KEY: str(),

  OTP_EXPIRATION_TIME: num({ default: 180 }),
  TEST_OTP: str({ default: '0000' }),
});
