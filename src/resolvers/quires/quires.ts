import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const Query = {
  users: async (parent: any, args: any, context: any) => {
    return await prisma.user.findMany();
  },
};
