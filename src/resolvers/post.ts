export const Post = {
  author: async (parent: any, args: any, { prisma, userInfo }: any) => {
    //console.log("user: ", parent.authorId)
    return await prisma.user.findUnique({
      where: {
        id: parent?.authorId,
      },
    });
  },
};
