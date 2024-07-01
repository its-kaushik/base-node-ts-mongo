import {
  logErrorMiddleware,
  returnError,
} from '../middlewares/error.middleware';
import router from '../routes';

const express = require('express');
const logger = require('morgan');

export const init = () => {
  const app = express();

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use('/api/v1', router);

  app.use(logErrorMiddleware);
  app.use(returnError);

  return app;
};
