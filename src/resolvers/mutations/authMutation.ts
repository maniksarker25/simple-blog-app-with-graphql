import bcrypt from "bcrypt";

import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}
export const authMutations = {
  // sign up
  signup: async (parent: any, args: IUserInfo, { prisma }: any) => {
    const isExists = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (isExists) {
      return {
        userError: "User already exists",
        token: null,
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args?.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      {
        userId: newUser?.id,
        email: newUser?.email,
      },
      config.jwt_access_secret as string
    );
    return { userError: null, token };
  },

  // sign in
  signin: async (parent: any, args: any, { prisma }: any) => {
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
    const token = await jwtHelper.generateToken(
      {
        userId: user?.id,
        email: user?.email,
      },
      config.jwt_access_secret as string
    );

    return {
      userError: null,
      token,
    };
  },
};
