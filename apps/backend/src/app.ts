import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import apiRoutes from './routes';
import { env } from './config/env';
import logger from './utils/logger';

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*', // Allow mobile and admin frontends
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorHandler);

import db from './config/database';

const PORT = env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  (async () => {
    try {
      logger.info('Running database migrations...');
      await db.migrate.latest();
      logger.info('Database migrations up to date.');
      
      const workerCount = await db('workers').count('id as count').first();
      if (!workerCount || Number(workerCount.count) === 0) {
        logger.info('Seeding database with demo data...');
        await db.seed.run();
        logger.info('Database seeding completed.');
      }
    } catch (err: any) {
      logger.warn(`Database initialization notice: ${err?.message || err}`);
    }

    app.listen(PORT, () => {
      logger.info(`🚀 Work Trust Backend API running at http://localhost:${PORT}/api`);
      logger.info(`📡 Health check: http://localhost:${PORT}/api/health`);
    });
  })();
}

export default app;