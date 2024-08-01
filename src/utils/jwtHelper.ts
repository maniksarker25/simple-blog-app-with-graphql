import jwt, { Secret } from "jsonwebtoken";

const generateToken = async (
  payload: { userId: number; email: string },
  secret: Secret
) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
};

export const jwtHelper = {
  generateToken,
};
