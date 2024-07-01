declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: string;
    DB_URI: string;
    REDIS_URI: string;
    OTP_EXPIRATION_TIME_IN_MINS: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    AUTH_TOKEN_EXPIRATION: string;
    OTP_EXPIRATION_TIME: string;
  }
}
