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

const PORT = env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`🚀 Work Trust Backend API running at http://localhost:${PORT}/api`);
    logger.info(`📡 Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;