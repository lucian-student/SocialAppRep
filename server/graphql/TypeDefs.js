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
    refreshToken:String!
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
    noteName:String!
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
       getGroupedNotes(groupId:String!):[Note]

       getUser(userId:ID!):User
       
       getGroup(groupId:ID!):Group
    }

    type Mutation{
        register(registerInput:RegisterInput): User
        login(username:String!,password:String!):User

        createNote(content:String!,noteName:String!):Note!
        deleteNote(noteId:ID!):String!
        editNote(noteId:ID!,content:String!):Note!
        createGroupedNote(content:String!,groupId:String!,noteName:String!):Note!
        refetchQuery:String!
        
        createRequest(username:String!,groupId:ID!,groupName:String!):User!
        deleteRequest(requestId:ID!):User!

        joinGroup(groupName:String!,groupId:ID!,requestId:ID!):User!
        leaveGroup(userGroupId:ID!,groupId:ID!):User!

        createGroup(groupName:String!):Group!
        deleteGroup(groupId:ID!):String!

    }

    type Subscription{
        newNote(groupId:ID!):Note
        removeNote(groupId:ID!):Note
    }
    
`;