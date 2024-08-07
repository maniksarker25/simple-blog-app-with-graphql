export const typeDefs = `#graphql


    type Query {
    me:User
    profile(userId:ID!):Profile
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

    addPost(post:PostInput!): PostResponse

    updatePost(postId:ID!,post:PostInput!):PostResponse

    deletePost(postId:ID!): PostResponse

    publishedPost(postId:ID!): PostResponse
    }

 

    type Post {
    id:ID!
    title:String!
    content:String!
    author:User
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

    input PostInput{
    title:String
    content:String
    }
`;
