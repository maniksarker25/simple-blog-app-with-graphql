export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};
