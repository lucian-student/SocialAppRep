const gql = require('graphql-tag');


module.exports = gql`

type Group{
    id:ID!
    name:String!
    createdAt:String!
    username:String!
    users:[GroupUser]!
}
type GroupUser {
    id: ID!
    username:String!
  }


type User{
    id:ID!
    email:String!
    token:String!
    username:String!
    createdAt:String!
    groups:[UserGroup]!
    groupRequests:[GroupRequest]!
}
type UserGroup{
    id:ID!
    groupId:String!
    groupName:String!
}
type GroupRequest{
    id:ID!
    username:String!
    groupId:String!
    groupName:String!
}


type Note{
    id:ID!
    username:String!
    content:String!
    createdAt:String!
    grouped:Boolean!
    groupId:String!
}
input RegisterInput{
    username:String!
    password:String!
    confirmPassword:String!
    email:String!
}
    type Query{
       getNotes(username:String!):[Note]
       getNote(noteId:ID!):Note

       getUser(userId:ID!):User
       
       getGroup(groupId:ID!):Group
    }

    type Mutation{
        register(registerInput:RegisterInput): User!
        login(username:String!,password:String!):User!

        createNote(content:String!):Note!
        deleteNote(noteId:ID!):String!
        editNote(noteId:ID!,content:String!):Note!
        createGroupedNote(content:String!,groupId:String!):Note!
        deleteGroupNotes(groupId:String!):[Note]!
        
        createRequest(username:String!,groupId:ID!,groupName:String!):User!
        deleteRequest(requestId:ID!):User!

        joinGroup(groupName:String!,groupId:ID!):User!
        leaveGroup(userGroupId:ID!,groupId:ID!):User!

        createGroup(groupName:String!):Group!
        deleteGroup(groupId:ID!):String!

    }

    type Subscription{
        newNote:Note!
    }
    
`;