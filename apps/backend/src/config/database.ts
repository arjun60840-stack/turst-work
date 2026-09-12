import knex, { Knex } from 'knex';
import { env } from './env';

const config: Knex.Config = env.DB_CLIENT === 'pg'
  ? {
      client: 'pg',
      connection: {
        host: env.DB_HOST, port: env.DB_PORT,
        database: env.DB_NAME, user: env.DB_USER, password: env.DB_PASSWORD,
      },
      pool: { min: 2, max: 10 },
      migrations: { directory: './migrations' },
      seeds: { directory: './seeds' },
    }
  : {
      client: 'sqlite3',
      connection: { filename: (env as any).DB_FILE || (env as any).DB_FILENAME || './nexvion.sqlite' },
      useNullAsDefault: true,
      migrations: { directory: './migrations' },
      seeds: { directory: './seeds' },
    };

const db: Knex = knex(config);
export default db;
export { config };
