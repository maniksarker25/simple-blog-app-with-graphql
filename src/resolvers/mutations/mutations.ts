import { authMutations } from "./authMutation";
import { postMutations } from "./postMutation";

export const Mutation = {
  // auth mutations
  ...authMutations,
  // post mutations
  ...postMutations,
};
