import { jwtExpiry, secretToken } from "../config";
import jwt from "jsonwebtoken";

interface Credentials {
  email: string;
  userId: number;
}

export const createToken = async (credential: Credentials) => {
  const { email, userId } = credential;

  const token = jwt.sign(
    {
      sub: userId,
      email: email,
      id: userId,
    },
    secretToken,
    { expiresIn: jwtExpiry }
  );

  return token;
};
