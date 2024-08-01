import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return await prisma.user.findMany();
    },
  },
  Mutation: {
    signup: async (parent: any, args: IUserInfo, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });
      const token = jwt.sign(
        { userId: newUser?.id, email: newUser?.email },
        "blogsecret",
        { expiresIn: "1d" }
      );
      return { userError: null, token };
    },

    // sign in
    signin: async (parent: any, args: any, content: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        return {
          userError: "User does not exist",
          token: null,
        };
      }
      const isPasswordMatched = await bcrypt.compare(
        args.password,
        user?.password
      );

      if (!isPasswordMatched) {
        return {
          userError: "Password does not match",
          token: null,
        };
      }
      const token = jwt.sign(
        { userId: user?.id, email: user?.email },
        "blogsecret",
        { expiresIn: "1d" }
      );

      return {
        userError: null,
        token,
      };
    },
  },
};
