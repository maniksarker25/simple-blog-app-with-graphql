import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";
import { Query } from "./quires/quires";
import { Mutation } from "./mutations/mutations";

export const resolvers = {
  Query,
  Mutation,
};
