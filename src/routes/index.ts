import type { FastifyInstance } from 'fastify';
import healthRoute from './health.js';
import authRoutes from './auth.js';

export default async function routes(fastify: FastifyInstance) {
  await healthRoute(fastify);
 fastify.register(authRoutes, { prefix: 'auth' });
}
