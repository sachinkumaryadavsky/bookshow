import { Service } from "typedi";
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

@Service()
export class AuthMiddleware {
  private secret: string;

  constructor() {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET not set");
    this.secret = process.env.JWT_SECRET;
  }

  public verifyJWT = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return reply.code(401).send({ error: "Missing token" });

      const decoded = jwt.verify(token, this.secret);
      (req as any).user = decoded;
    } catch {
      return reply.code(401).send({ error: "Invalid token" });
    }
  };

  public authorizeRoles = (...roles: string[]) => {
    return async (req: FastifyRequest, reply: FastifyReply) => {
      const user = (req as any).user;
      if (!roles.includes(user.role)) {
        return reply.code(403).send({ error: "Forbidden" });
      }
    };
  };
}
