import gql from 'graphql-tag';

export const FETCH_NOTES_QUERY = gql`
query getNotes(
    $username:String!
){
  getNotes(username:$username)
  {
    username
    id
    content
    createdAt
  }
}`;

export const LEAVE_GROUP_MUTATION = gql`
mutation leaveGroup(
  $userGroupId:ID!,
  $groupId:ID!
){
  leaveGroup(
  userGroupId:$userGroupId,
  groupId:$groupId)
  {
    id
    username
    groups{
      id
      groupId
      groupName
    }
  }
}
`;


export const FETCH_UPDATABLE_USER_DATA = gql`

query getUser(
    $userId:ID!
)
{
  getUser(
      userId:$userId
  ){
    id
    username
    email
    createdAt
    groups{
      id
      groupId
      groupName
    }
    groupRequests{
      id
      groupId
      username
      groupName
    }
  }
}

`;

export const CREATE_GROUP_MUTATION = gql`
mutation createGroup(
  $groupName:String!
){
  createGroup(
    groupName:$groupName
  ){
    id
    username
    users{
      id
      username
    }
  }

}
`;

export const CREATE_GROUP_REQUEST_MUTATION = gql`
mutation createRequest(
  $username:String!,
  $groupId:ID!,
  $groupName:String!
){
  createRequest(
    username:$username,
    groupId:$groupId,
    groupName:$groupName
  ){
    id
    username
    groupRequests{
      id
      username
      groupId
      groupName
    }
  }

}
`;

export const DELETE_REQUEST_MUTATION = gql`
mutation deleteRequest(
  $requestId:ID!
){
  deleteRequest(requestId:$requestId){
    id
  	username
    groupRequests{
      id
      groupId
      groupName
      username
    }
  }

}
`;

export const GET_GROUP_QUERY = gql`
query getGroup(
  $groupId:ID!
){
  getGroup(
    groupId:$groupId
  ){
    id
    name
    username
    createdAt
    users{
      id
      username
    }
  }
}
`;

export const JOIN_GROUP_MUTATION =gql`
mutation joinGroup(
  $groupId:ID!,
  $groupName:String!
){
  joinGroup(
    groupId:$groupId,
    groupName:$groupName
  ){
    id
    username
    groups{
      id
      groupId
      groupName
    }
  }
}
`;