import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          user,
          password,
          port,
          host,
          dbName,
          conection,
        } = configService.mongo;
        return {
          uri: `${conection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const {
          user,
          password,
          port,
          host,
          dbName,
          conection,
        } = configService.mongo;
        const uri = `${conection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        return mongoClient.db(dbName);
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
