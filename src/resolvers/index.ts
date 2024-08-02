import { Query } from "./quires/quires";
import { Mutation } from "./mutations/mutations";
import { Post } from "./post";
import { User } from "./user";
import { Profile } from "./profile";

export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
