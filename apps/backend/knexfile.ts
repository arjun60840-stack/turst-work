import dotenv from 'dotenv';
dotenv.config();

const config = {
  client: process.env.DB_CLIENT || 'sqlite3',
  connection: process.env.DB_CLIENT === 'pg'
    ? {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      }
    : {
        filename: process.env.DB_FILE || './worktrust.sqlite'
      },
  useNullAsDefault: true,
  migrations: {
    directory: './migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './seeds',
    extension: 'ts',
  }
};

export default {
  development: config,
  staging: config,
  production: config,
};

module.exports = {
  development: config,
  staging: config,
  production: config,
};