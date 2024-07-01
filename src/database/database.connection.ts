import mongoose from 'mongoose';

export const connection = (connectionString: string) => {
  return mongoose.connect(`${connectionString}`);
};

export const disconnect = () => {
  return mongoose.disconnect();
};
