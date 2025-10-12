import Fastify from 'fastify';
import routes from './routes/index.js';

const app = Fastify({ logger: true });

// Register routes
app.register(routes);

export default app;
