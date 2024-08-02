export const typeDefs = `#graphql


    type Query {
    me:User
    users:[User]
    posts:[Post]
    }

    type Mutation {
    signup(
    name:String!,
    email:String!,
    password:String!,
    bio:String
    ):AuthPayload,

    signin(email:String!, password:String!):AuthPayload

    addPost(title:String!,content:String!): PostResponse
    }

 

    type Post {
    id:ID!
    title:String!
    content:String!
    author:User!
    published:Boolean!
    createdAT:String!
    }

    type User{
    id:ID!
    name:String!
    email:String!
    createdAt:String!
    posts:[Post]
    }

    type Profile{
    id:ID!
    bio:String!
    createdAt:String!
    user:User!
   }


    type AuthPayload {
    userError:String
    token:String
    }

    type PostResponse{
    postError:String,
    post:Post
    }
`;
