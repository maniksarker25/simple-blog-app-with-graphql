import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = async (
  payload: { userId: number; email: string },
  secret: Secret
) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = (await jwt.verify(
      token,
      config.jwt_access_secret as string
    )) as { userId: number };
    return userData;
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
