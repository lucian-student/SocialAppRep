import gql from 'graphql-tag';

export const FETCH_GROUPED_NOTES_QUERY = gql`
query getGroupedNotes(
    $groupId:String!
){
  getGroupedNotes(groupId:$groupId)
  {
    id
    grouped
    groupId
    username
    content
  }
}`;

export const CREATE_GROUPED_NOTE_MUTATION = gql`
mutation createGroupedNote(
    $content:String!,
    $groupId:String!
){
    createGroupedNote(
        content:$content,
        groupId:$groupId
    ){
        id
    grouped
    groupId
    username
    content
    }
}

`;

export const GROUPED_NOTE_SUBSCRIPTION = gql`
subscription newNote(
  $groupId:ID!
){
  newNote(
    groupId:$groupId
  ){
    id
    grouped
    groupId
    username
    createdAt
    content
  }
}
`;

export const REFETCH_QUERY_MUTATION = gql`
mutation refetchQuery{
  refetchQuery
}
`;