const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'backend');
const srcDir = path.join(baseDir, 'src');

const files = {
  '.env': `
PORT=3000
NODE_ENV=development
DB_CLIENT=better-sqlite3
DB_FILE=./nexvion.sqlite
JWT_SECRET=supersecret123
`,
  'src/app.ts': `
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
  });
}

export default app;
`,
  'src/middleware/errorHandler.ts': `
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
};
`,
  'src/routes/index.ts': `
import { Router } from 'express';
// import authRoutes from './auth.routes';

const router = Router();
// router.use('/auth', authRoutes);

export default router;
`,
  'migrations/001_initial_schema.ts': `
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('email').unique().notNullable();
    table.string('password_hash').notNullable();
    table.string('phone');
    table.string('role').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamp('last_login');
    table.timestamps(true, true);
  });
  
  // Create all other tables based on prompt, simplifying for now to get a running scaffold
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}
`,
  'seeds/001_demo_data.ts': `
import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();
  
  const hash = await bcrypt.hash('NexvionDemo@2026', 10);
  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'admin@nexvion.demo',
      password_hash: hash,
      role: 'admin'
    }
  ]);
}
`,
  'knexfile.ts': `
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export default {
  development: {
    client: 'better-sqlite3',
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
`
};

for (const [filepath, content] of Object.entries(files)) {
  const fullPath = path.join(baseDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
}

console.log('Files generated successfully.');
