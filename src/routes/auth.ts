import type { FastifyInstance } from 'fastify';
import { Container } from 'typedi';
import { AuthController } from '../controller/authController.js';

export default async function authRoutes(fastify: FastifyInstance) {
  const authController = Container.get(AuthController);
  fastify.post('/signup', (req, reply) => authController.signup(req, reply));
  fastify.post('/signin', (req, reply) => authController.signin(req, reply));
}
