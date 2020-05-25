import React, { useContext, useState } from 'react';
import RequestForm from '../components/forms/RequestForm';
import { GET_GROUP_QUERY } from '../util/graphql';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { FETCH_GROUPED_NOTES_QUERY, GROUPED_NOTE_SUBSCRIPTION, REMOVE_NOTE_SUBSCRIPTION } from '../util/graphql2';
import GroupedNoteForm from '../components/forms/GroupedNoteForm';
import { Grid, Dropdown, Menu, Button } from 'semantic-ui-react';
import NoteCard from '../components/cards/NoteCard';
import { AuthContext } from '../context/auth';
import NoteCard2 from '../components/cards/noteCard2';




function GroupPage(props) {
    const groupId = props.match.params.groupId;

    const { user } = useContext(AuthContext);

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

    const noteSub = useSubscription(GROUPED_NOTE_SUBSCRIPTION, {
        variables: {
            groupId: groupId
        },

        onSubscriptionData: ({ client, subscriptionData }) => {

            const data3 = client.readQuery({
                query: FETCH_GROUPED_NOTES_QUERY,
                variables: { groupId }
            });
            client.writeQuery({
                query: FETCH_GROUPED_NOTES_QUERY,
                variables: { groupId },
                data: { getGroupedNotes: [subscriptionData.data.newNote, ...data3.getGroupedNotes] }
            });
            console.log(subscriptionData.data);

        }
    });
    if (noteSub.loading) {
        console.log(noteSub.loading);
    } else if (noteSub.error) {
        console.log(noteSub.error);
    } else {
        console.log("yellow");
    }
    // removeSubscription
    const removeNoteSub = useSubscription(REMOVE_NOTE_SUBSCRIPTION, {
        variables: {
            groupId: groupId
        },

        onSubscriptionData: ({ client, subscriptionData }) => {

            const data4 = client.readQuery({
                query: FETCH_GROUPED_NOTES_QUERY,
                variables: { groupId }
            });
            client.writeQuery({
                query: FETCH_GROUPED_NOTES_QUERY,
                variables: { groupId },
                data: { getGroupedNotes: data4.getGroupedNotes.filter(n => n.id !== subscriptionData.data.removeNote.id) }
            });
            console.log(subscriptionData.data);

        }
    });
    //sub

    //viewState
    const [view, setView] = useState(false);

    function handleNoteView(){
        if (view) {
            setView(false);
          } else {
            setView(true);
          }
    }


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
            <div style={{ display: "flex" }}>
                <div style={{ margin: "auto", width: '80%' }}>
                    <div style={{ display: 'inline' }}>
                        <h1 style={{ display: 'inline' }}>welcome to group {groupId}</h1>

                    </div>
                    <Menu compact>
                        <Dropdown text='group members' options={options} simple item />
                    </Menu>
                    {view ? (
                        <Button onClick={handleNoteView}>
                            Set view to documents
                        </Button>
                    ) : (
                            <Button onClick={handleNoteView}>
                                Set view to messenger
                            </Button>
                        )
                    }
                    <RequestForm groupParams={groupParams} />
                    <GroupedNoteForm id={id} />
                    <Grid columns={1}>
                        <Grid.Row >
                            <h1>group notes</h1>
                        </Grid.Row>
                        {fetchNotes.loading ? (
                            <h1>loading notes..</h1>
                        ) : (
                            
                                (notes.newData && view ?
                                    notes.newData.map(note => (
                    
                                      <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                                        <NoteCard note={note} />
                                      </Grid.Column>
                    
                                    )) : (
                                      (notes.newData && !view ?
                                        notes.newData.map(note => (
                    
                                          <Grid.Column key={note.id} style={{ marginBottom: 20 }}>
                                            <NoteCard2 note={note} />
                                          </Grid.Column>
                    
                                        )) : (
                                          <div />
                                        ))
                                    ))
                            )}
                    </Grid>
                </div>
            </div>
        )
    }
}

export default GroupPage;