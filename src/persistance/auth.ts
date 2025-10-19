import { db } from "./db.js";
import { SignupData} from "../schema/auth.js";

export const findUserByEmail = async (email: string) => {
  const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return result.length ? result[0] : undefined;
};

export const createUser = async (user: SignupData, passwordHash: string) => {
  const     result: any = await db.query(
    "INSERT INTO Users (name, email, phone, passwordHash) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.phone || null, passwordHash]
  );
  return result.insertId;
};
