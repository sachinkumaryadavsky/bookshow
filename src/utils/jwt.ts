import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}
