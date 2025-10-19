import { Service } from "typedi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../persistance/auth.js";
import { SignupData, SigninData } from "../schema/auth.js";

@Service()                                                                                                                                                                                                                                                                                                                                                                              
export class AuthService {
  public async signup(user: SignupData) {
    const existing = await findUserByEmail(user.email);
    if (existing) throw new Error("Email already registered");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    const userId = await createUser(user, hash);

    const token = jwt.sign(
      { id: userId, email: user.email, role: "CUSTOMER" },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {  token };
  }

  public async signin(data: SigninData) {
    const user = await findUserByEmail(data.email);
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {  token };
  }
}
