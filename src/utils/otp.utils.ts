import { OTP_EXPIRED, INVALID_OTP } from '../constants/error';
import { customError } from './error.utils';
import { RedisClient } from './redis.utils';
import { envs } from '../env';
// Generates a 4 digit OTP
const generateOtp = () => {
  const min = 1000;
  const max = 10000;
  return String(Math.floor(Math.random() * (max - min)) + min).padStart(4, '0');
};

const getOtpKey = (key: string) => {
  return `OTP:${key}`;
};

/**
 * set otp to redis and returns the same
 * @param {string} key any unique identifier of user
 * @returns {string} otp
 */
export const setOtp = async (key: any, testMode = false) => {
  let otp: any = envs.TEST_OTP;
  if (!testMode) {
    otp = generateOtp();
  }
  await RedisClient.setWithExpiry(
    getOtpKey(key),
    otp,
    +(envs.OTP_EXPIRATION_TIME_IN_MINS as number)
  );
  return otp;
};

export const validateOtp = async (
  key: string,
  inputOtp: string
): Promise<boolean> => {
  const storedOtp = await RedisClient.get(getOtpKey(key));
  if (!storedOtp) {
    throw customError(OTP_EXPIRED);
  }
  if (String(inputOtp) !== storedOtp) {
    throw customError(INVALID_OTP);
  }
  await RedisClient.delete(getOtpKey(key));
  return true;
};
