import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './nexvion.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  }
};