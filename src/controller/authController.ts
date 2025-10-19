import { FastifyRequest, FastifyReply } from "fastify";
import { Service, Inject } from "typedi";
import { AuthService } from "../service/authService.js";
import { SignupData, SigninData } from "../schema/auth.js";
import { sendSuccess, sendError } from "../utils/response.js";

@Service()
export class AuthController {
  constructor(
    @Inject(() => AuthService)
    private authService: AuthService
  ) {}

  // Signup handler
public signup = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log("Signup request body:", req.body);

    const { name, email, password, phone } = req.body as SignupData;

    if (!name || !email || !password) {
      return reply.status(400).send({
        success: false,
        error: "Name, email and password are required",
      });
    }

    const result = await this.authService.signup(req.body as SignupData);

    sendSuccess(reply, result);
  } catch (err: any) {
    console.error("Signup error:", err);
    sendError(reply, err.message);
  }
};

  // Signin handler
  public signin = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const result = await this.authService.signin(req.body as SigninData);
      sendSuccess(reply, result);
    } catch (err: any) {
      sendError(reply, err.message);
    }
  };
}
