import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mongo: {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      dbName: process.env.MONGO_DB,
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      conection: process.env.MONGO_CONNECTION,
    },
    database: {
      name: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
