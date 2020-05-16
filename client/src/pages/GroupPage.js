import React, { useState, useContext } from 'react';
import RequestForm from '../components/RequestForm';
import { GET_GROUP_QUERY } from '../util/graphql';
import { useQuery, useSubscription, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { FETCH_GROUPED_NOTES_QUERY, GROUPED_NOTE_SUBSCRIPTION, REFETCH_QUERY_MUTATION } from '../util/graphql2';
import GroupedNoteForm from '../components/GroupedNoteForm';
import { Grid, Dropdown, Menu,Button } from 'semantic-ui-react';
import NoteCard from '../components/NoteCard';
import {AuthContext} from '../context/auth';




function GroupPage(props) {
    const groupId = props.match.params.groupId;

    const {user} = useContext(AuthContext);

    const { data, loading, error } = useQuery(GET_GROUP_QUERY, {
        variables: {
            groupId
        }
    });

    const fetchNotes = useQuery(FETCH_GROUPED_NOTES_QUERY, {
        variables: {
            groupId: groupId
        }
    });
    // use fetchNotes.subscribeToMore

    let notified = '0';

    let notes = '';
    let newData = '';

    if (fetchNotes.data) {
        newData = fetchNotes.data;
        console.log(newData);
        notes = { newData: newData.getGroupedNotes }
    }
    //subscription place

    const [refetchQuery] = useMutation(REFETCH_QUERY_MUTATION, {
        refetchQueries: [{
            query: FETCH_GROUPED_NOTES_QUERY,
            variables: { groupId },
        }]
    });

   // const [dataSubbed,setDataSubbed] = useState(true);

  

   /* const noteSub = useSubscription(GROUPED_NOTE_SUBSCRIPTION, {
        variables: {
            groupId
        },
        shouldResubscribe:true,

    });

    function refetchQueryMethod(){
        refetchQuery();
    }
   
    {!noteSub.loading&&noteSub.data.newNote.username!==user.username&&(
        <Button onClick={refetchQueryMethod}>
                click to recive new data
        </Button>
    )}*/

    const noteSub = useSubscription(GROUPED_NOTE_SUBSCRIPTION, {
        variables:{
            groupId:groupId
        },

        onSubscriptionData: ({ client, subscriptionData }) => {
          // Client is an instance of Apollo client.
          // It has cache proxy method used in the `update` option in mutations.
        // Please look at: https://www.apollographql.com/docs/react/essentials/mutations#update
        /* const data3 = client.readQuery({
            query: GROUPED_NOTE_SUBSCRIPTION,
            variables: { groupId}
          });
          client.writeQuery({
            query: GROUPED_NOTE_SUBSCRIPTION,
            variables: { groupId},
            data: {getGroupedNotes:data3.getGroupedNotes.unshift(subscriptionData.newNote)}
          });*/
          console.log("data");
          refetchQuery();
        }
      });
if(noteSub.loading){
    console.log(noteSub.loading);
}else if(noteSub.error){
    console.log(noteSub.error);
}else{
    console.log("yellow");
}





    //sub

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error.</p>
    if (!data.getGroup) {
        return <p>Loading group...</p>
    } else {
        const {
            id,
            users
        } = data.getGroup;

        const groupParams = data.getGroup;

        const options = users.map(usr => (
            { key: usr.id, text: usr.username, value: usr.username }
        ));

        return (
            <div>
                <div style={{ display: 'inline' }}>
                    <h1 style={{ display: 'inline' }}>welcome to group {groupId}</h1>
                  
                </div>
                <Menu compact>
                    <Dropdown text='group members' options={options} simple item />
                </Menu>
                <RequestForm groupParams={groupParams} />
                <GroupedNoteForm id={id} />
                <Grid columns={3}>
                    <Grid.Row >
                        <h1>group notes</h1>
                    </Grid.Row>
                    {fetchNotes.loading ? (
                        <h1>loading notes..</h1>
                    ) : (
                            notes.newData &&
                            notes.newData.map(note => (

                                <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                                    <NoteCard note={note} />
                                </Grid.Column>

                            ))
                        )}
                </Grid>
            </div>

        )
    }
}

export default GroupPage;