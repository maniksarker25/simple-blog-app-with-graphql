export const postMutations = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        postError: "Unauthorized",
        post: null,
      };
    }
    if (!post?.title || !post?.content) {
      return {
        postError: "Title and content must be provided",
        post: null,
      };
    }
    const newPost = await prisma.post.create({
      data: {
        title: post?.title,
        content: post?.content,
        authorId: userInfo?.userId,
      },
    });
    return {
      postError: null,
      post: newPost,
    };
  },
  updatePost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        postError: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo?.userId,
      },
    });
    if (!user) {
      return {
        postError: "Unauthorized",
        post: null,
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: Number(args?.postId),
      },
    });
    if (!post) {
      return {
        postError: "Post not found",
        post: null,
      };
    }

    if (post?.authorId !== user?.id) {
      return {
        postError: "This is not your post",
        post: null,
      };
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(args?.postId),
      },
      data: args?.post,
    });
    return {
      postError: null,
      post: updatedPost,
    };
  },
};
