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
    noteName
  }
}`;

export const CREATE_GROUPED_NOTE_MUTATION = gql`
mutation createGroupedNote(
    $content:String!,
    $groupId:String!,
    $noteName:String!
){
    createGroupedNote(
        content:$content,
        groupId:$groupId
        noteName:$noteName
    ){
        id
    grouped
    groupId
    username
    content
    noteName
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
    noteName
  }
}
`;

export const REFETCH_QUERY_MUTATION = gql`
mutation refetchQuery{
  refetchQuery
}
`;

export const REMOVE_NOTE_SUBSCRIPTION = gql`
subscription removeNote(
  $groupId:ID!
){
  removeNote(
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