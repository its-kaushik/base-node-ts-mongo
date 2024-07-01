import 'dotenv/config';

import { RedisClient, init } from './utils';
import { connection } from './database/database.connection';

const app = init();

const PORT = process.env.PORT || '3000';

connection(`${process.env.DB_URI}`)
  .then(async () => {
    await RedisClient.connect();

    app.listen(PORT, async () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch(console.error);

module.exports = app;
