import { User } from "@prisma/client";
import { prisma } from "..";
import DataLoader from "dataloader";

const batchUser = async (ids: number[]): Promise<User[]> => {
  //   console.log(ids);
  // suppose ids = [2,4,5]
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  //   console.log(users);
  /* 

  our data format is array of object but 

  data loader return type 
 {
  2:{id:2,name:manik}
  4:{id:4,name:sarker}
  4:{id:5,name:hasib} 
 }

  so we need to convert the data to this type
  */
  const userData: { [key: string]: User } = {};
  users.forEach((user) => {
    userData[user.id] = user;
  });
  //   console.log("userData:", userData);
  //   console.log(ids.map((id) => userData[id]));
  return ids.map((id) => userData[id]);
};

//@ts-ignore
export const userLoader = new DataLoader<number, User>(batchUser);
