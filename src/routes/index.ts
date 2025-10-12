import type { FastifyInstance } from 'fastify';
import healthRoute from './health.js';


export default async function routes(app: FastifyInstance) {
  await healthRoute(app);
}
