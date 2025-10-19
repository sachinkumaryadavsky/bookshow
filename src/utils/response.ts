import { FastifyReply } from "fastify";

export function sendSuccess(reply: FastifyReply, data: any, status = 200) {
  reply.code(status).send({ success: true, data });
}

export function sendError(reply: FastifyReply, message: string, status = 400) {
  reply.code(status).send({ success: false, error: message });
}
