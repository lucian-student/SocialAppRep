import gql from 'graphql-tag';

export const  FETCH_NOTES_QUERY = gql`
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

export const LEAVE_GROUP_MUTATION= gql`
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